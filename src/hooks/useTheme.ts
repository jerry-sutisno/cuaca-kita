import { useState, useEffect, useCallback } from 'react';
import { getStorageItem, setStorageItem } from '../lib/storage';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    getStorageItem<Theme>('cuacakita:theme', 'system')
  );

  const applyTheme = useCallback((currentTheme: Theme) => {
    const isDark =
      currentTheme === 'dark' ||
      (currentTheme === 'system' &&
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    setStorageItem('cuacakita:theme', theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined') {
      return;
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme, applyTheme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'system';
      return 'light';
    });
  }, []);

  return { theme, setTheme, toggleTheme };
}
