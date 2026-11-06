import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCitySearch } from '../useCitySearch';
import * as geocodingApi from '../../api/geocoding';

describe('useCitySearch', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('tidak memanggil API jika query kurang dari 2 karakter', async () => {
    const searchSpy = vi.spyOn(geocodingApi, 'searchCities');
    const { result } = renderHook(() => useCitySearch(300));

    act(() => {
      result.current.setQuery('J');
      vi.advanceTimersByTime(350);
    });

    expect(searchSpy).not.toHaveBeenCalled();
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it('memanggil searchCities setelah debounce dan memperbarui suggestions', async () => {
    const mockCities = [
      {
        id: 1,
        name: 'Jakarta',
        country: 'Indonesia',
        admin1: 'DKI Jakarta',
        latitude: -6.17,
        longitude: 106.83,
        timezone: 'Asia/Jakarta',
      },
    ];

    vi.spyOn(geocodingApi, 'searchCities').mockResolvedValue(mockCities);

    const { result } = renderHook(() => useCitySearch(300));

    act(() => {
      result.current.setQuery('Jakarta');
    });

    // Sebelum 300ms masih loading false
    expect(result.current.isLoading).toBe(false);

    // Majukan timer debounce
    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.suggestions).toEqual(mockCities);
    expect(result.current.isOpen).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it('clearSearch harus mereset semua state pencarian', async () => {
    const mockCities = [
      {
        id: 1,
        name: 'Bandung',
        country: 'Indonesia',
        latitude: -6.91,
        longitude: 107.61,
        timezone: 'Asia/Jakarta',
      },
    ];
    vi.spyOn(geocodingApi, 'searchCities').mockResolvedValue(mockCities);

    const { result } = renderHook(() => useCitySearch(300));

    act(() => {
      result.current.setQuery('Bandung');
    });

    await act(async () => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.suggestions.length).toBe(1);

    act(() => {
      result.current.clearSearch();
    });

    expect(result.current.query).toBe('');
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.isOpen).toBe(false);
  });
});
