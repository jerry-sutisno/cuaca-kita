import { httpGet } from './http';
import type { City, WeatherReport, DailyForecast } from '../types/weather';

interface RawWeatherResponse {
  timezone: string;
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max?: (number | null)[];
  };
}

/**
 * Mengambil data cuaca saat ini dan prakiraan 7 hari dari Open-Meteo API.
 */
export async function getWeather(city: City, signal?: AbortSignal): Promise<WeatherReport> {
  const params = new URLSearchParams({
    latitude: city.latitude.toString(),
    longitude: city.longitude.toString(),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '7',
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const data = await httpGet<RawWeatherResponse>(url, { signal });

  const daily: DailyForecast[] = (data.daily.time || []).map((date, index) => ({
    date,
    weatherCode: data.daily.weather_code[index] ?? 0,
    tempMax: data.daily.temperature_2m_max[index] ?? 0,
    tempMin: data.daily.temperature_2m_min[index] ?? 0,
    precipitationProbability: data.daily.precipitation_probability_max?.[index] ?? null,
  }));

  return {
    city: {
      ...city,
      timezone: data.timezone || city.timezone,
    },
    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      feelsLike: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      weatherCode: data.current.weather_code,
      isDay: data.current.is_day === 1,
    },
    daily,
  };
}
