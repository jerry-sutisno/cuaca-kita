import { FC } from 'react';
import type { City } from '../../types/weather';
import { History, X } from 'lucide-react';

interface RecentChipsProps {
  cities: City[];
  onSelectCity: (city: City) => void;
  onClear?: () => void;
}

export const RecentChips: FC<RecentChipsProps> = ({
  cities,
  onSelectCity,
  onClear,
}) => {
  if (cities.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mt-4">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 select-none">
        <History className="w-3.5 h-3.5" aria-hidden="true" />
        <span>Pencarian Terakhir:</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {cities.map((city) => (
          <button
            key={`recent-${city.id}-${city.name}`}
            type="button"
            onClick={() => onSelectCity(city)}
            className="h-8 px-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary text-slate-700 dark:text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-all active:scale-95 border border-white/70 dark:border-slate-700 cursor-pointer"
          >
            <span>{city.name}</span>
            {city.admin1 && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                ({city.admin1})
              </span>
            )}
          </button>
        ))}

        {onClear && (
          <button
            type="button"
            onClick={onClear}
            title="Hapus semua riwayat"
            aria-label="Hapus semua riwayat pencarian"
            className="h-8 w-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
