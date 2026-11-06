import { useState } from 'react';
import { SearchBar } from './components/search/SearchBar';
import type { City } from './types/weather';
import { CloudSun } from 'lucide-react';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-white/60 dark:border-slate-800">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                Cuaca Kita
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Prakiraan Wilayah Indonesia
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 max-w-[1440px] mx-auto px-6 lg:px-12 w-full py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Mau cek cuaca di mana hari ini?
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Ketik nama kota di bawah untuk melihat suhu dan prakiraan cuaca 7 hari.
          </p>
        </div>

        {/* Search Bar Component */}
        <SearchBar
          onSelectCity={(city) => {
            setSelectedCity(city);
          }}
          autoFocus
        />

        {/* Status seleksi kota (akan dikembangkan penuh di M3) */}
        {selectedCity && (
          <div className="mt-8 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/60 dark:border-slate-800 text-center shadow-glass animate-fade-in">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              Kota Terpilih
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {selectedCity.name}
              {selectedCity.admin1 ? `, ${selectedCity.admin1}` : ''}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {selectedCity.country} ({selectedCity.latitude.toFixed(2)}, {selectedCity.longitude.toFixed(2)})
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-6 border-t border-white/60 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-sm text-slate-600 dark:text-slate-400">
          <span>Data cuaca oleh</span>
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary hover:underline underline-offset-4"
          >
            Open-Meteo.com
          </a>
        </div>
      </footer>
    </div>
  );
}
