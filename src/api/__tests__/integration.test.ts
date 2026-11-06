// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { getWeather } from '../weather';
import { searchCities } from '../geocoding';

describe('Live API Integration (Open-Meteo)', { timeout: 15000 }, () => {
  it('pemanggilan getWeather untuk Jakarta mengembalikan WeatherReport valid', async () => {
    const report = await getWeather({
      id: 1642911,
      name: 'Jakarta',
      admin1: 'DKI Jakarta',
      country: 'Indonesia',
      latitude: -6.1754,
      longitude: 106.8272,
      timezone: 'Asia/Jakarta',
    });

    expect(report.city.name).toBe('Jakarta');
    expect(typeof report.current.temperature).toBe('number');
    expect(typeof report.current.feelsLike).toBe('number');
    expect(typeof report.current.humidity).toBe('number');
    expect(typeof report.current.windSpeed).toBe('number');
    expect(typeof report.current.isDay).toBe('boolean');
    expect(report.daily.length).toBeGreaterThanOrEqual(7);
  });

  it('pemanggilan searchCities untuk Jakarta mengembalikan hasil valid', async () => {
    const cities = await searchCities('Jakarta');
    expect(cities.length).toBeGreaterThan(0);
    const first = cities[0];
    expect(first.name.toLowerCase()).toContain('jakarta');
    expect(typeof first.latitude).toBe('number');
    expect(typeof first.longitude).toBe('number');
  });
});
