import { FC } from 'react';

export const SkeletonResult: FC = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Sedang memuat data cuaca..."
      className="w-full max-w-6xl mx-auto py-4 animate-pulse"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Hero Card Skeleton (8 Cols) */}
        <div className="col-span-12 lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md shadow-glass border border-white/60 dark:border-slate-800 flex flex-col justify-between min-h-[380px]">
          {/* Top row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-8 w-48 sm:w-64 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-36 rounded-full bg-slate-100 dark:bg-slate-800/60" />
            </div>
            <div className="h-8 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Center row: Icon + Big Temp */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 my-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-slate-200 dark:bg-slate-800" />
              <div className="flex flex-col gap-2">
                <div className="h-16 w-36 sm:w-44 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-6 w-32 rounded-full bg-slate-100 dark:bg-slate-800/80" />
              </div>
            </div>
            <div className="h-10 w-40 rounded-full bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Bottom row */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center">
            <div className="h-4 w-60 rounded-full bg-slate-100 dark:bg-slate-800/60" />
          </div>
        </div>

        {/* Right Column: 3 Stat Cards Skeleton (4 Cols) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-between gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-3xl p-6 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md shadow-glass border border-white/60 dark:border-slate-800 flex items-center gap-5 flex-1 min-h-[105px]"
            >
              <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="h-3 w-20 rounded-full bg-slate-100 dark:bg-slate-800/80" />
                <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-32 rounded-full bg-slate-100 dark:bg-slate-800/50" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forecast Card Skeleton */}
      <div className="mt-6 rounded-3xl p-6 sm:p-8 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md shadow-glass border border-white/60 dark:border-slate-800">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800" />
            <div className="flex flex-col gap-2">
              <div className="h-5 w-36 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-3 w-48 rounded-full bg-slate-100 dark:bg-slate-800/60" />
            </div>
          </div>
          <div className="h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 pt-2">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="h-5 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-5 w-36 rounded-full bg-slate-100 dark:bg-slate-800" />
              <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
              <div className="h-4 w-48 rounded-full bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
