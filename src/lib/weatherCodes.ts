export type WeatherIconGroup =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'rain-heavy'
  | 'snow'
  | 'thunderstorm'
  | 'unknown';

export interface WeatherCodeInfo {
  label: string;
  iconGroup: WeatherIconGroup;
}

const WEATHER_CODE_MAP: Record<number, WeatherCodeInfo> = {
  0: { label: 'Cerah', iconGroup: 'clear' },
  1: { label: 'Cerah berawan', iconGroup: 'partly-cloudy' },
  2: { label: 'Berawan sebagian', iconGroup: 'partly-cloudy' },
  3: { label: 'Berawan tebal', iconGroup: 'cloudy' },
  45: { label: 'Berkabut', iconGroup: 'fog' },
  48: { label: 'Berkabut', iconGroup: 'fog' },
  51: { label: 'Gerimis', iconGroup: 'drizzle' },
  53: { label: 'Gerimis', iconGroup: 'drizzle' },
  55: { label: 'Gerimis', iconGroup: 'drizzle' },
  56: { label: 'Gerimis beku', iconGroup: 'drizzle' },
  57: { label: 'Gerimis beku', iconGroup: 'drizzle' },
  61: { label: 'Hujan ringan', iconGroup: 'rain' },
  63: { label: 'Hujan sedang', iconGroup: 'rain' },
  65: { label: 'Hujan lebat', iconGroup: 'rain-heavy' },
  66: { label: 'Hujan beku', iconGroup: 'rain' },
  67: { label: 'Hujan beku', iconGroup: 'rain' },
  71: { label: 'Salju', iconGroup: 'snow' },
  73: { label: 'Salju', iconGroup: 'snow' },
  75: { label: 'Salju', iconGroup: 'snow' },
  77: { label: 'Salju', iconGroup: 'snow' },
  80: { label: 'Hujan lokal ringan', iconGroup: 'rain' },
  81: { label: 'Hujan lokal sedang', iconGroup: 'rain' },
  82: { label: 'Hujan lokal deras', iconGroup: 'rain-heavy' },
  85: { label: 'Hujan salju lokal', iconGroup: 'snow' },
  86: { label: 'Hujan salju lokal', iconGroup: 'snow' },
  95: { label: 'Badai petir', iconGroup: 'thunderstorm' },
  96: { label: 'Badai petir disertai hujan es', iconGroup: 'thunderstorm' },
  99: { label: 'Badai petir disertai hujan es', iconGroup: 'thunderstorm' },
};

export function getWeatherCodeInfo(code: number): WeatherCodeInfo {
  return WEATHER_CODE_MAP[code] ?? { label: 'Tidak diketahui', iconGroup: 'unknown' };
}
