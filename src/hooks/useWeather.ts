import { useState, useRef, useCallback } from 'react';
import type { City, ViewState } from '../types/weather';
import { getWeather } from '../api/weather';
import { searchCities } from '../api/geocoding';

export function useWeather() {
  const [viewState, setViewState] = useState<ViewState>({ status: 'idle' });
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchWeatherForCity = useCallback(async (city: City) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setViewState({ status: 'loading', city });

    try {
      const report = await getWeather(city, controller.signal);
      if (!controller.signal.aborted) {
        setViewState({ status: 'success', report });
      }
    } catch (err: unknown) {
      if (controller.signal.aborted) {
        return;
      }
      if (err instanceof DOMException && err.name === 'AbortError') {
        return;
      }
      const message =
        err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data cuaca.';
      setViewState({
        status: 'error',
        message,
        retry: () => {
          fetchWeatherForCity(city);
        },
      });
    }
  }, []);

  const searchAndFetchCity = useCallback(
    async (query: string) => {
      const trimmed = query.trim();
      if (trimmed.length < 2) {
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const cities = await searchCities(trimmed, controller.signal);
        if (controller.signal.aborted) {
          return;
        }

        if (cities.length === 0) {
          setViewState({ status: 'not-found', query: trimmed });
          return;
        }

        // Ambil kota pertama
        await fetchWeatherForCity(cities[0]);
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          return;
        }
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        const message =
          err instanceof Error ? err.message : 'Tidak bisa terhubung. Periksa koneksi internet kamu.';
        setViewState({
          status: 'error',
          message,
          retry: () => {
            searchAndFetchCity(query);
          },
        });
      }
    },
    [fetchWeatherForCity]
  );

  const resetToIdle = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setViewState({ status: 'idle' });
  }, []);

  return {
    viewState,
    fetchWeatherForCity,
    searchAndFetchCity,
    resetToIdle,
  };
}
