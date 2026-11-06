import { FC } from 'react';
import type { DailyForecast } from '../../types/weather';
import { ForecastRow } from './ForecastRow';
import { Calendar } from 'lucide-react';

interface ForecastListProps {
  daily: DailyForecast[];
}

export const ForecastList: FC<ForecastListProps> = ({ daily }) => {
  if (daily.length === 0) {
    return null;
  }

  // Cari suhu global min dan max untuk proporsionalitas bar visual
  const globalMin = Math.min(...daily.map((d) => d.tempMin));
  const globalMax = Math.max(...daily.map((d) => d.tempMax));

  return (
    <div className="mt-6 rounded-3xl p-6 sm:p-8 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md shadow-glass border border-white/70 dark:border-slate-800 relative">
      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-primary">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Prakiraan 7 Hari
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gambaran komparatif temperatur &amp; peluang hujan
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>Suhu Minimum</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Suhu Maksimum</span>
          </div>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800/60 pt-2">
        {daily.map((forecast, index) => (
          <ForecastRow
            key={forecast.date}
            forecast={forecast}
            index={index}
            globalMin={globalMin}
            globalMax={globalMax}
          />
        ))}
      </div>
    </div>
  );
};
