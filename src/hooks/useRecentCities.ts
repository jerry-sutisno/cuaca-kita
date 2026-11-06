import { useState, useCallback } from 'react';
import type { City } from '../types/weather';
import { getStorageItem, setStorageItem } from '../lib/storage';

const STORAGE_KEY = 'cuacakita:recent';
const MAX_RECENT = 5;

export function useRecentCities() {
  const [recentCities, setRecentCities] = useState<City[]>(() =>
    getStorageItem<City[]>(STORAGE_KEY, [])
  );

  const addRecentCity = useCallback((city: City) => {
    setRecentCities((prev) => {
      // Hilangkan duplikasi berdasarkan id atau nama & koordinat
      const filtered = prev.filter(
        (c) => c.id !== city.id && c.name.toLowerCase() !== city.name.toLowerCase()
      );
      const updated = [city, ...filtered].slice(0, MAX_RECENT);
      setStorageItem(STORAGE_KEY, updated);
      return updated;
    });
  }, []);

  const clearRecentCities = useCallback(() => {
    setRecentCities([]);
    setStorageItem(STORAGE_KEY, []);
  }, []);

  return { recentCities, addRecentCity, clearRecentCities };
}
