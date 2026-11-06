import { FC } from 'react';
import type { City } from '../../types/weather';
import { SearchBar } from '../search/SearchBar';
import { SearchX, Lightbulb, CheckCircle2, SpellCheck, Compass } from 'lucide-react';

interface NotFoundStateProps {
  query: string;
  onSelectCity: (city: City) => void;
}

const RECOVERY_CITIES: City[] = [
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

export const NotFoundState: FC<NotFoundStateProps> = ({
  query,
  onSelectCity,
}) => {
  return (
    <div
      role="region"
      aria-label="Pemberitahuan kota tidak ditemukan"
      className="relative w-full max-w-3xl mx-auto py-8 px-4 flex flex-col items-center justify-center text-center"
    >
      {/* Primary Card Container */}
      <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-glass border border-white/70 dark:border-slate-800 p-8 sm:p-12 flex flex-col items-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Status Pencarian • 404
          </span>
        </div>

        {/* Friendly Search Icon Graphic */}
        <div className="w-24 h-24 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-500 mb-6 shadow-sm">
          <SearchX className="w-12 h-12" />
        </div>

        {/* Headings */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Kota Tidak Ditemukan
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-lg mb-8 leading-relaxed">
          Kota &ldquo;<strong className="text-slate-800 dark:text-slate-200">{query}</strong>&rdquo; tidak ditemukan. Coba periksa ejaan atau cari nama kota lain.
        </p>

        {/* Search Bar Input */}
        <div className="w-full max-w-xl mb-6">
          <SearchBar onSelectCity={onSelectCity} autoFocus />
        </div>

        {/* Popular Recovery Cities */}
        <div className="w-full max-w-xl flex flex-col items-center pt-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Pilih Kota Populer di Indonesia
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {RECOVERY_CITIES.map((city) => (
              <button
                key={city.id}
                type="button"
                onClick={() => onSelectCity(city)}
                className="px-4 py-2 rounded-full bg-slate-100/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 hover:text-primary text-slate-700 dark:text-slate-300 text-sm font-semibold shadow-sm transition-all active:scale-95 border border-slate-200/50 dark:border-slate-700 cursor-pointer"
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Helpful Search Tips Card */}
      <div className="w-full mt-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-6 border border-white/60 dark:border-slate-800 text-left shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-primary shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Tips Pencarian Cuaca
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gunakan nama resmi, pastikan tidak ada salah ketik, atau cari wilayah administratif terdekat.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50/80 dark:bg-slate-800/40 rounded-xl p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold block text-slate-800 dark:text-slate-200">
                Nama Resmi
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Gunakan nama baku kota atau kabupaten.
              </span>
            </div>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-800/40 rounded-xl p-3 flex items-start gap-2.5">
            <SpellCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold block text-slate-800 dark:text-slate-200">
                Cek Ejaan
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Hindari singkatan atau karakter khusus acak.
              </span>
            </div>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-800/40 rounded-xl p-3 flex items-start gap-2.5">
            <Compass className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-semibold block text-slate-800 dark:text-slate-200">
                Ibu Kota Wilayah
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                Cari ibu kota provinsi jika lokasi kecil belum ada.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
