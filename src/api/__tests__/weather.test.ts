import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getWeather } from '../weather';
import type { City } from '../../types/weather';

describe('getWeather', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockCity: City = {
    id: 1642911,
    name: 'Jakarta',
    admin1: 'DKI Jakarta',
    country: 'Indonesia',
    latitude: -6.17,
    longitude: 106.83,
    timezone: 'Asia/Jakarta',
  };

  it('memetakan respons cuaca dengan benar menjadi WeatherReport', async () => {
    const mockApiResponse = {
      timezone: 'Asia/Jakarta',
      current: {
        time: '2026-11-06T14:00',
        temperature_2m: 31.4,
        relative_humidity_2m: 68,
        apparent_temperature: 36.2,
        weather_code: 3,
        wind_speed_10m: 11.5,
        is_day: 1,
      },
      current_units: {
        temperature_2m: '°C',
        wind_speed_10m: 'km/h',
      },
      daily: {
        time: ['2026-11-06', '2026-11-07'],
        weather_code: [3, 61],
        temperature_2m_max: [33.1, 30.5],
        temperature_2m_min: [25.0, 24.2],
        precipitation_probability_max: [40, 70],
      },
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockApiResponse,
    } as unknown as Response);

    const report = await getWeather(mockCity);

    expect(report.city.name).toBe('Jakarta');
    expect(report.current.temperature).toBe(31.4);
    expect(report.current.feelsLike).toBe(36.2);
    expect(report.current.humidity).toBe(68);
    expect(report.current.windSpeed).toBe(11.5);
    expect(report.current.weatherCode).toBe(3);
    expect(report.current.isDay).toBe(true);
    expect(report.daily).toHaveLength(2);
    expect(report.daily[0]).toEqual({
      date: '2026-11-06',
      weatherCode: 3,
      tempMax: 33.1,
      tempMin: 25.0,
      precipitationProbability: 40,
    });
  });
});
