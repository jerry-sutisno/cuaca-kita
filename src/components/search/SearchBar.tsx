import { FC, useRef, useEffect, KeyboardEvent } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import type { City } from '../../types/weather';
import { useCitySearch } from '../../hooks/useCitySearch';
import { SuggestionList } from './SuggestionList';

interface SearchBarProps {
  onSelectCity: (city: City) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export const SearchBar: FC<SearchBarProps> = ({
  onSelectCity,
  placeholder = 'Cari kota, mis. Jakarta',
  autoFocus = false,
}) => {
  const {
    query,
    setQuery,
    suggestions,
    isLoading,
    isOpen,
    setIsOpen,
    selectedIndex,
    setSelectedIndex,
    clearSearch,
  } = useCitySearch(300);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Klik di luar menutup dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsOpen]);

  const handleSelect = (city: City) => {
    setQuery(city.name);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSelectCity(city);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter' && query.trim().length >= 2) {
        // Jika belum ada saran terbuka tetapi user menekan enter, biarkan hook memuat atau tunggu
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // FR-04: Jika pengguna menekan Enter tanpa memilih saran, sistem memakai saran pertama
      const targetIndex = selectedIndex >= 0 ? selectedIndex : 0;
      const chosenCity = suggestions[targetIndex];
      if (chosenCity) {
        handleSelect(chosenCity);
      }
    } else if (e.key === 'Escape') {
      // FR-03: Tombol Escape menutup daftar saran
      e.preventDefault();
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-40">
      <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-full shadow-glass hover:shadow-glass-hover focus-within:shadow-glass-dropdown transition-all duration-200 border border-white/70 dark:border-slate-800">
        <div className="flex items-center px-5 h-14">
          <label htmlFor="city-search-input" className="sr-only">
            Cari nama kota
          </label>
          <Search className="w-5 h-5 text-primary mr-3 shrink-0" aria-hidden="true" />

          <input
            ref={inputRef}
            id="city-search-input"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen && suggestions.length > 0}
            aria-controls="search-suggestions"
            aria-activedescendant={
              selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isOpen && e.target.value.trim().length >= 2) {
                setIsOpen(true);
              }
            }}
            onFocus={() => {
              if (suggestions.length > 0) {
                setIsOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="flex-1 bg-transparent border-none outline-none font-medium text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />

          {isLoading && (
            <Loader2
              className="w-5 h-5 text-primary animate-spin mr-2 shrink-0"
              aria-label="Sedang memuat saran kota"
            />
          )}

          {query.length > 0 && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Hapus pencarian"
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mr-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:flex items-center pl-1 border-l border-slate-200 dark:border-slate-700 ml-1">
            <span className="text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              Esc
            </span>
          </div>
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <SuggestionList
          suggestions={suggestions}
          selectedIndex={selectedIndex}
          onSelect={handleSelect}
          onMouseEnterIndex={setSelectedIndex}
        />
      )}
    </div>
  );
};
