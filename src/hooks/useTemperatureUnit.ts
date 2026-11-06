import { useState, useCallback } from 'react';
import type { TemperatureUnit } from '../lib/format';
import { getStorageItem, setStorageItem } from '../lib/storage';

const STORAGE_KEY = 'cuacakita:unit';

export function useTemperatureUnit() {
  const [unit, setUnitState] = useState<TemperatureUnit>(() =>
    getStorageItem<TemperatureUnit>(STORAGE_KEY, 'celsius')
  );

  const setUnit = useCallback((newUnit: TemperatureUnit) => {
    setUnitState(newUnit);
    setStorageItem(STORAGE_KEY, newUnit);
  }, []);

  const toggleUnit = useCallback(() => {
    setUnitState((prev) => {
      const next: TemperatureUnit = prev === 'celsius' ? 'fahrenheit' : 'celsius';
      setStorageItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return { unit, setUnit, toggleUnit };
}
