import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRecentCities } from '../useRecentCities';
import type { City } from '../../types/weather';

describe('useRecentCities', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  const city1: City = {
    id: 1,
    name: 'Jakarta',
    country: 'Indonesia',
    latitude: -6.17,
    longitude: 106.83,
    timezone: 'Asia/Jakarta',
  };

  const city2: City = {
    id: 2,
    name: 'Bandung',
    country: 'Indonesia',
    latitude: -6.91,
    longitude: 107.61,
    timezone: 'Asia/Jakarta',
  };

  it('menyimpan dan menambah kota baru di posisi terdepan', () => {
    const { result } = renderHook(() => useRecentCities());
    expect(result.current.recentCities).toEqual([]);

    act(() => {
      result.current.addRecentCity(city1);
    });
    expect(result.current.recentCities).toHaveLength(1);
    expect(result.current.recentCities[0].name).toBe('Jakarta');

    act(() => {
      result.current.addRecentCity(city2);
    });
    expect(result.current.recentCities).toHaveLength(2);
    expect(result.current.recentCities[0].name).toBe('Bandung');
  });

  it('menghindari duplikasi kota berdasarkan id / nama', () => {
    const { result } = renderHook(() => useRecentCities());

    act(() => {
      result.current.addRecentCity(city1);
      result.current.addRecentCity(city2);
      result.current.addRecentCity(city1); // Tambah lagi Jakarta
    });

    expect(result.current.recentCities).toHaveLength(2);
    expect(result.current.recentCities[0].name).toBe('Jakarta');
    expect(result.current.recentCities[1].name).toBe('Bandung');
  });

  it('membatasi maksimal 5 riwayat kota terakhir', () => {
    const { result } = renderHook(() => useRecentCities());

    act(() => {
      for (let i = 1; i <= 7; i++) {
        result.current.addRecentCity({
          id: i,
          name: `Kota ${i}`,
          country: 'Indonesia',
          latitude: i,
          longitude: i,
          timezone: 'Asia/Jakarta',
        });
      }
    });

    expect(result.current.recentCities).toHaveLength(5);
    expect(result.current.recentCities[0].name).toBe('Kota 7');
  });
});
