import { FC } from 'react';
import { WifiOff, RotateCcw, Wrench, Wifi, Plane, Clock } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="relative w-full max-w-2xl mx-auto py-8 px-4 flex flex-col items-center justify-center text-center"
    >
      <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-glass border border-white/70 dark:border-slate-800 flex flex-col items-center">
        {/* Offline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Gangguan Koneksi • Error</span>
        </div>

        {/* Warning Icon Graphic */}
        <div className="w-24 h-24 rounded-full bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center text-amber-500 mb-6 shadow-sm">
          <WifiOff className="w-12 h-12" />
        </div>

        {/* Headings */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Koneksi Terputus
        </h2>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mb-8">
          {message}
        </p>

        {/* Retry Button */}
        <button
          type="button"
          onClick={onRetry}
          className="px-8 h-12 rounded-full bg-primary hover:bg-primary-hover text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-all cursor-pointer mb-8"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Coba lagi</span>
        </button>

        {/* Troubleshooting Steps */}
        <div className="w-full bg-slate-50/90 dark:bg-slate-800/60 rounded-2xl p-5 sm:p-6 text-left border border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-slate-100 font-semibold text-sm">
            <Wrench className="w-4 h-4 text-primary" />
            <span>Langkah Pemecahan Masalah</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2.5">
              <Wifi className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Periksa koneksi Wi-Fi atau paket data seluler pada perangkat Anda.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Plane className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Pastikan mode pesawat tidak aktif dan jaringan seluler terhubung stabil.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Coba muat ulang halaman atau klik &ldquo;Coba lagi&rdquo; jika server sedang sibuk.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
