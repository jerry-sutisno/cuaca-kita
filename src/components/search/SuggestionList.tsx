import { FC } from 'react';
import type { City } from '../../types/weather';
import { MapPin, ArrowRight } from 'lucide-react';

interface SuggestionListProps {
  suggestions: City[];
  selectedIndex: number;
  onSelect: (city: City) => void;
  onMouseEnterIndex: (index: number) => void;
}

export const SuggestionList: FC<SuggestionListProps> = ({
  suggestions,
  selectedIndex,
  onSelect,
  onMouseEnterIndex,
}) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div
      id="search-suggestions"
      role="listbox"
      aria-label="Daftar saran kota"
      className="mt-2 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl shadow-glass-dropdown border border-white/70 dark:border-slate-800 overflow-hidden transition-all duration-200"
    >
      {/* Top Metadata Strip */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between text-xs border-b border-slate-100 dark:border-slate-800/60">
        <div className="flex items-center gap-2 text-primary font-semibold uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          <span>Hasil Terkait Kota &amp; Wilayah</span>
        </div>
        <span className="text-slate-400 font-medium">{suggestions.length} Rekomendasi</span>
      </div>

      {/* List items */}
      <div className="py-1">
        {suggestions.map((city, index) => {
          const isSelected = index === selectedIndex;
          const locationDetails = [city.admin1, city.country].filter(Boolean).join(', ');

          return (
            <div
              key={`${city.id}-${city.latitude}-${city.longitude}`}
              id={`suggestion-${index}`}
              role="option"
              aria-selected={isSelected}
              onMouseEnter={() => onMouseEnterIndex(index)}
              onClick={() => onSelect(city)}
              className={`group relative px-6 py-3.5 transition-colors flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/80 dark:bg-blue-950/40 text-primary'
                  : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/40'
              }`}
            >
              {/* Active bar indicator */}
              {isSelected && (
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full"
                />
              )}

              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors shadow-sm ${
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 group-hover:text-primary'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0 text-left">
                  <span className="font-semibold text-base text-slate-900 dark:text-slate-100 tracking-tight group-hover:text-primary transition-colors">
                    {city.name}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {locationDetails}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <ArrowRight
                  className={`w-4 h-4 text-slate-400 transition-transform ${
                    isSelected ? 'translate-x-1 text-primary' : 'group-hover:translate-x-1'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Keyboard Shortcut Footer Helper */}
      <div className="px-6 py-3 bg-slate-50/80 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
              ↑
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
              ↓
            </kbd>
            <span className="ml-1">Navigasi</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
              ↵
            </kbd>
            <span className="ml-1">Pilih</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 font-mono text-[10px]">
            Esc
          </kbd>
          <span className="ml-1">Tutup</span>
        </div>
      </div>
    </div>
  );
};
