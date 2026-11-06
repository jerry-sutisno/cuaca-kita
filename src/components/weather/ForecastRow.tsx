import { FC } from 'react';
import type { DailyForecast } from '../../types/weather';
import { getWeatherCodeInfo } from '../../lib/weatherCodes';
import { formatForecastDay, formatTemperature } from '../../lib/format';
import { WeatherIcon } from './WeatherIcon';
import { Droplets } from 'lucide-react';

interface ForecastRowProps {
  forecast: DailyForecast;
  index: number;
  globalMin: number;
  globalMax: number;
}

const MONTH_NAMES_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

export const ForecastRow: FC<ForecastRowProps> = ({
  forecast,
  index,
  globalMin,
  globalMax,
}) => {
  const dayName = formatForecastDay(forecast.date, index);
  const weatherInfo = getWeatherCodeInfo(forecast.weatherCode);

  const [, monthStr, dayStr] = forecast.date.split('-');
  const dateFormatted = `${parseInt(dayStr, 10)} ${MONTH_NAMES_SHORT[parseInt(monthStr, 10) - 1]}`;

  // Hitung persentase posisi bar range temperatur
  const totalRange = Math.max(1, globalMax - globalMin);
  const leftPercent = Math.max(
    0,
    Math.min(100, ((forecast.tempMin - globalMin) / totalRange) * 100)
  );
  const rightPercent = Math.max(
    0,
    Math.min(100, ((globalMax - forecast.tempMax) / totalRange) * 100)
  );

  return (
    <div className="py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-2xl px-3 transition-colors">
      {/* Day & Date */}
      <div className="w-28 sm:w-32 shrink-0">
        <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
          {dayName}
        </span>
        <span className="block text-xs text-slate-500 dark:text-slate-400">
          {dateFormatted}
        </span>
      </div>

      {/* Weather Icon & Condition */}
      <div className="flex-1 flex items-center gap-3 min-w-0">
        <WeatherIcon
          iconGroup={weatherInfo.iconGroup}
          className="w-6 h-6 shrink-0"
        />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">
          {weatherInfo.label}
        </span>
      </div>

      {/* Precipitation probability */}
      <div className="w-20 sm:w-24 flex items-center gap-1.5 shrink-0">
        <Droplets className="w-4 h-4 text-sky-500" aria-hidden="true" />
        <span className="text-xs sm:text-sm font-semibold text-sky-600 dark:text-sky-400">
          {forecast.precipitationProbability !== null
            ? `${forecast.precipitationProbability}%`
            : '-'}
        </span>
      </div>

      {/* Temperature Range Bar */}
      <div className="flex items-center gap-3 w-full sm:w-56 shrink-0">
        <span className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500 w-8 text-right tabular-nums">
          {formatTemperature(forecast.tempMin)}
        </span>
        <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
          <div
            className="absolute h-full rounded-full bg-gradient-to-r from-sky-500 via-primary to-amber-500"
            style={{
              left: `${leftPercent}%`,
              right: `${rightPercent}%`,
            }}
          />
        </div>
        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 w-8 text-left tabular-nums">
          {formatTemperature(forecast.tempMax)}
        </span>
      </div>
    </div>
  );
};
