import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWeather } from '../useWeather';
import * as weatherApi from '../../api/weather';
import * as geocodingApi from '../../api/geocoding';
import type { City, WeatherReport } from '../../types/weather';

describe('useWeather', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const mockCity: City = {
    id: 1,
    name: 'Jakarta',
    country: 'Indonesia',
    latitude: -6.17,
    longitude: 106.83,
    timezone: 'Asia/Jakarta',
  };

  const mockReport: WeatherReport = {
    city: mockCity,
    current: {
      time: '2026-11-06T14:00',
      temperature: 31,
      feelsLike: 36,
      humidity: 68,
      windSpeed: 11.5,
      weatherCode: 3,
      isDay: true,
    },
    daily: [
      {
        date: '2026-11-06',
        weatherCode: 3,
        tempMax: 33,
        tempMin: 25,
        precipitationProbability: 40,
      },
    ],
  };

  it('memulai dengan status idle', () => {
    const { result } = renderHook(() => useWeather());
    expect(result.current.viewState.status).toBe('idle');
  });

  it('melakukan transisi ke loading lalu success saat fetchWeatherForCity berhasil', async () => {
    vi.spyOn(weatherApi, 'getWeather').mockResolvedValue(mockReport);

    const { result } = renderHook(() => useWeather());

    let promise: Promise<void>;
    act(() => {
      promise = result.current.fetchWeatherForCity(mockCity);
    });

    expect(result.current.viewState.status).toBe('loading');

    await act(async () => {
      await promise;
    });

    expect(result.current.viewState.status).toBe('success');
    if (result.current.viewState.status === 'success') {
      expect(result.current.viewState.report.city.name).toBe('Jakarta');
    }
  });

  it('melakukan transisi ke error saat getWeather gagal dan menyediakan fungsi retry', async () => {
    vi.spyOn(weatherApi, 'getWeather').mockRejectedValue(new Error('Koneksi terputus'));

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.fetchWeatherForCity(mockCity);
    });

    expect(result.current.viewState.status).toBe('error');
    if (result.current.viewState.status === 'error') {
      expect(result.current.viewState.message).toBe('Koneksi terputus');
      expect(typeof result.current.viewState.retry).toBe('function');
    }
  });

  it('melakukan transisi ke not-found jika searchAndFetchCity tidak menemukan kota', async () => {
    vi.spyOn(geocodingApi, 'searchCities').mockResolvedValue([]);

    const { result } = renderHook(() => useWeather());

    await act(async () => {
      await result.current.searchAndFetchCity('KotaAsalAsalan');
    });

    expect(result.current.viewState.status).toBe('not-found');
    if (result.current.viewState.status === 'not-found') {
      expect(result.current.viewState.query).toBe('KotaAsalAsalan');
    }
  });
});
