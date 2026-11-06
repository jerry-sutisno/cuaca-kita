export interface City {
  id: number;
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  time: string; // ISO lokal kota
  temperature: number; // °C
  feelsLike: number; // °C
  humidity: number; // %
  windSpeed: number; // km/jam
  weatherCode: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string; // YYYY-MM-DD
  weatherCode: number;
  tempMax: number; // °C
  tempMin: number; // °C
  precipitationProbability: number | null; // %
}

export interface WeatherReport {
  city: City;
  current: CurrentWeather;
  daily: DailyForecast[];
}

export type ViewState =
  | { status: 'idle' }
  | { status: 'loading'; city: City }
  | { status: 'success'; report: WeatherReport }
  | { status: 'not-found'; query: string }
  | { status: 'error'; message: string; retry: () => void };
