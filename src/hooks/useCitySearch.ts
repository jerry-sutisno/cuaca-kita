import { useState, useEffect, useRef, useCallback } from 'react';
import type { City } from '../types/weather';
import { searchCities } from '../api/geocoding';
import { useDebouncedValue } from './useDebouncedValue';

export interface UseCitySearchReturn {
  query: string;
  setQuery: (val: string) => void;
  debouncedQuery: string;
  suggestions: City[];
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  clearSearch: () => void;
}

export function useCitySearch(debounceMs = 300): UseCitySearchReturn {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, debounceMs);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const trimmed = debouncedQuery.trim();

    if (trimmed.length < 2) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setSuggestions([]);
      setIsLoading(false);
      setError(null);
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    searchCities(trimmed, controller.signal)
      .then((cities) => {
        if (!controller.signal.aborted) {
          setSuggestions(cities);
          setIsOpen(cities.length > 0);
          setSelectedIndex(-1);
          setIsLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) {
          return;
        }
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'Gagal mencari kota');
        setSuggestions([]);
        setIsOpen(false);
        setSelectedIndex(-1);
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery]);

  const clearSearch = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setQuery('');
    setSuggestions([]);
    setIsLoading(false);
    setError(null);
    setIsOpen(false);
    setSelectedIndex(-1);
  }, []);

  return {
    query,
    setQuery,
    debouncedQuery,
    suggestions,
    isLoading,
    error,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    clearSearch,
  };
}
