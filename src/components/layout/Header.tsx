import { FC, ReactNode } from 'react';
import { Sun, Moon, CloudSun } from 'lucide-react';
import type { Theme } from '../../hooks/useTheme';
import type { TemperatureUnit } from '../../lib/format';
import { UnitToggle } from './UnitToggle';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  onResetToHome?: () => void;
  unit?: TemperatureUnit;
  onChangeUnit?: (unit: TemperatureUnit) => void;
  children?: ReactNode; // Untuk SearchBar di header jika di layar hasil
}

export const Header: FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onResetToHome,
  unit,
  onChangeUnit,
  children,
}) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-white/60 dark:border-slate-800/80 shadow-sm transition-colors">
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          type="button"
          onClick={onResetToHome}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary rounded-2xl p-1"
          aria-label="Kembali ke beranda Cuaca Kita"
        >
          <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shadow-md relative overflow-hidden group-hover:scale-105 transition-transform text-white">
            <CloudSun className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
              Cuaca Kita
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Prakiraan Wilayah Indonesia
            </span>
          </div>
        </button>

        {/* Optional SearchBar in Header */}
        {children && (
          <div className="flex-1 max-w-lg hidden md:block">
            {children}
          </div>
        )}

        {/* Right actions: Unit Switcher & Theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {unit && onChangeUnit && (
            <UnitToggle unit={unit} onChangeUnit={onChangeUnit} />
          )}

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Beralih mode tema"
            title={`Tema saat ini: ${theme}`}
            className="w-11 h-11 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all cursor-pointer border border-slate-200/50 dark:border-slate-700"
          >
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-indigo-400" />
            ) : (
              <Sun className="w-5 h-5 text-amber-500" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
