import { FC, ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string;
  description: string;
  icon: ReactNode;
  variant?: 'primary' | 'sky' | 'amber';
}

export const StatCard: FC<StatCardProps> = ({
  label,
  value,
  description,
  icon,
  variant = 'primary',
}) => {
  const variantStyles = {
    primary:
      'bg-blue-100 dark:bg-blue-950/60 text-primary dark:text-blue-400',
    sky: 'bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400',
    amber:
      'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
  }[variant];

  return (
    <div className="rounded-3xl p-5 sm:p-6 bg-white/75 dark:bg-slate-900/75 backdrop-blur-md shadow-glass border border-white/70 dark:border-slate-800 flex items-center gap-4 sm:gap-5 hover:-translate-y-0.5 transition-all">
      <div
        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 ${variantStyles}`}
      >
        {icon}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </span>
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 mt-0.5 leading-tight tabular-nums">
          {value}
        </span>
        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 truncate">
          {description}
        </span>
      </div>
    </div>
  );
};
