import { FC } from 'react';
import type { City } from '../../types/weather';
import { SearchBar } from '../search/SearchBar';
import { RecentChips } from '../search/RecentChips';
import { Calendar, AlertTriangle, Wind, Sun, CloudSun } from 'lucide-react';

interface EmptyStateProps {
  onSelectCity: (city: City) => void;
  recentCities?: City[];
  onClearRecent?: () => void;
}

const POPULAR_CITIES: City[] = [
  {
    id: 1642911,
    name: 'Jakarta',
    admin1: 'DKI Jakarta',
    country: 'Indonesia',
    latitude: -6.1754,
    longitude: 106.8272,
    timezone: 'Asia/Jakarta',
  },
  {
    id: 1650357,
    name: 'Bandung',
    admin1: 'Jawa Barat',
    country: 'Indonesia',
    latitude: -6.9175,
    longitude: 107.6191,
    timezone: 'Asia/Jakarta',
  },
  {
    id: 1625822,
    name: 'Surabaya',
    admin1: 'Jawa Timur',
    country: 'Indonesia',
    latitude: -7.2575,
    longitude: 112.7521,
    timezone: 'Asia/Jakarta',
  },
  {
    id: 1621177,
    name: 'Yogyakarta',
    admin1: 'DI Yogyakarta',
    country: 'Indonesia',
    latitude: -7.7956,
    longitude: 110.3695,
    timezone: 'Asia/Jakarta',
  },
  {
    id: 1645528,
    name: 'Denpasar',
    admin1: 'Bali',
    country: 'Indonesia',
    latitude: -8.6705,
    longitude: 115.2126,
    timezone: 'Asia/Makassar',
  },
];

export const EmptyState: FC<EmptyStateProps> = ({
  onSelectCity,
  recentCities = [],
  onClearRecent,
}) => {
  return (
    <div className="relative w-full overflow-hidden py-8 sm:py-12 px-4 flex flex-col items-center justify-center">
      {/* Ambient Atmospheric Glows */}
      <div
        aria-hidden="true"
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[340px] bg-gradient-to-b from-blue-200 via-sky-100 to-transparent dark:from-blue-900/30 dark:via-sky-900/20 blur-3xl opacity-70 pointer-events-none -z-10 rounded-full"
      />

      <div className="w-full max-w-[840px] mx-auto flex flex-col items-center text-center">
        {/* Floating Meteorological Art / SVG */}
        <div className="relative mb-6 select-none group cursor-default">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 via-amber-200 to-sky-200 dark:from-blue-900/40 dark:via-amber-900/30 dark:to-sky-900/40 rounded-full blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700" />
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-white/80 dark:border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <CloudSun className="w-20 h-20 sm:w-24 sm:h-24 text-amber-500 fill-amber-400/20 drop-shadow-md" />
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-2xl text-balance">
          Mau cek cuaca di mana hari ini?
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl text-balance">
          Cari nama kota atau pilih dari destinasi populer di Indonesia untuk melihat prakiraan cuaca akurat terkini.
        </p>

        {/* Search Bar */}
        <div className="w-full max-w-[680px] mt-8">
          <SearchBar onSelectCity={onSelectCity} autoFocus />
        </div>

        {/* Recent Search Chips (FR-18) */}
        {recentCities.length > 0 && (
          <RecentChips
            cities={recentCities}
            onSelectCity={onSelectCity}
            onClear={onClearRecent}
          />
        )}

        {/* Popular City Suggestions Chips */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <span className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold select-none">
            Pilihan populer:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {POPULAR_CITIES.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => onSelectCity(city)}
                className="h-10 px-4 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-sm hover:shadow-md hover:bg-white dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary text-slate-700 dark:text-slate-300 text-sm font-semibold flex items-center gap-2 transition-all active:scale-95 border border-white/60 dark:border-slate-700 cursor-pointer"
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{city.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Feature Highlight Bento Cards */}
        <div className="w-full max-w-[820px] grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 text-left">
          <div className="rounded-3xl bg-white/65 dark:bg-slate-900/65 backdrop-blur-xl p-5 shadow-sm border border-white/60 dark:border-slate-800 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-primary mb-4 shadow-sm">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-1">
                Prakiraan 7 Hari
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Siklus temperatur harian, peluang hujan, dan tren cuaca akurat terpadu Open-Meteo.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white/65 dark:bg-slate-900/65 backdrop-blur-xl p-5 shadow-sm border border-white/60 dark:border-slate-800 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4 shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-1">
                Kondisi Real-Time
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pemantauan data suhu, feels like, angin, dan kelembapan terkini berbasis stasiun cuaca.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white/65 dark:bg-slate-900/65 backdrop-blur-xl p-5 shadow-sm border border-white/60 dark:border-slate-800 flex flex-col justify-between">
            <div className="w-11 h-11 rounded-2xl bg-sky-100 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4 shadow-sm">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mb-1">
                Ringan &amp; Cepat
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Akses instan tanpa login, bebas iklan, dan ramah kuota untuk kenyamanan aktivitas Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
