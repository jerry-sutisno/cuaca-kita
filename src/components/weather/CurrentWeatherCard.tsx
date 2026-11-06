import { FC } from 'react';
import type { WeatherReport } from '../../types/weather';
import { getWeatherCodeInfo } from '../../lib/weatherCodes';
import { formatCurrentDateTime, formatTemperature } from '../../lib/format';
import { WeatherIcon } from './WeatherIcon';
import { MapPin, Info, ArrowUp, ArrowDown } from 'lucide-react';

interface CurrentWeatherCardProps {
  report: WeatherReport;
}

export const CurrentWeatherCard: FC<CurrentWeatherCardProps> = ({ report }) => {
  const { city, current, daily } = report;
  const weatherInfo = getWeatherCodeInfo(current.weatherCode);
  const todayForecast = daily[0];

  const locationText = [city.name, city.admin1].filter(Boolean).join(', ');
  const formattedDateTime = formatCurrentDateTime(current.time);

  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md shadow-glass border border-white/70 dark:border-slate-800 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
      {/* Ambient decorative glow spots */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-400/15 dark:bg-amber-400/5 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-blue-500/15 dark:bg-blue-500/5 blur-3xl pointer-events-none"
      />

      {/* Top Row: Location & Live Status */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary shrink-0" aria-hidden="true" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {locationText}
            </h2>
          </div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 pl-8">
            {formattedDateTime}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/85 dark:bg-slate-800/85 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Pembaruan Langsung
          </span>
        </div>
      </div>

      {/* Core Center Display: Large Weather Icon + Big Temp + Condition */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 my-6">
        <div className="flex items-center gap-6 sm:gap-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
            <WeatherIcon
              iconGroup={weatherInfo.iconGroup}
              isDay={current.isDay}
              className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline">
              <span className="text-6xl sm:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                {Math.round(current.temperature)}
              </span>
              <span className="text-3xl sm:text-4xl font-bold text-primary ml-1">
                °C
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-slate-200 mt-1">
              {weatherInfo.label}
            </span>
          </div>
        </div>

        {/* Sub-metrics: Min/Max Pill */}
        {todayForecast && (
          <div className="flex flex-col sm:items-end justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm text-sm font-semibold text-slate-800 dark:text-slate-200 shadow-sm">
              <span className="inline-flex items-center text-amber-600 dark:text-amber-400">
                <ArrowUp className="w-4 h-4 mr-0.5" />
                Maks: {formatTemperature(todayForecast.tempMax)}
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="inline-flex items-center text-sky-600 dark:text-sky-400">
                <ArrowDown className="w-4 h-4 mr-0.5" />
                Min: {formatTemperature(todayForecast.tempMin)}
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Terasa seperti {formatTemperature(current.feelsLike)}
            </span>
          </div>
        )}
      </div>

      {/* Footer Info Strip */}
      <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-primary shrink-0" />
          <span>Data stasiun meteorologi Open-Meteo berbasis waktu lokal {city.name}</span>
        </div>
      </div>
    </div>
  );
};
