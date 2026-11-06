import { FC } from 'react';
import type { TemperatureUnit } from '../../lib/format';

interface UnitToggleProps {
  unit: TemperatureUnit;
  onChangeUnit: (unit: TemperatureUnit) => void;
}

export const UnitToggle: FC<UnitToggleProps> = ({ unit, onChangeUnit }) => {
  return (
    <div
      role="group"
      aria-label="Pilihan satuan temperatur"
      className="relative flex items-center p-1 rounded-full bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700 shadow-sm"
    >
      <button
        type="button"
        onClick={() => onChangeUnit('celsius')}
        aria-pressed={unit === 'celsius'}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          unit === 'celsius'
            ? 'bg-primary text-white shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        °C
      </button>
      <button
        type="button"
        onClick={() => onChangeUnit('fahrenheit')}
        aria-pressed={unit === 'fahrenheit'}
        className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          unit === 'fahrenheit'
            ? 'bg-primary text-white shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        °F
      </button>
    </div>
  );
};
