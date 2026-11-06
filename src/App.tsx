import { useCallback } from 'react';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './hooks/useTheme';
import { useRecentCities } from './hooks/useRecentCities';
import { useTemperatureUnit } from './hooks/useTemperatureUnit';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SearchBar } from './components/search/SearchBar';
import { CurrentWeatherCard } from './components/weather/CurrentWeatherCard';
import { StatCard } from './components/weather/StatCard';
import { ForecastList } from './components/weather/ForecastList';
import { EmptyState } from './components/states/EmptyState';
import { SkeletonResult } from './components/states/SkeletonResult';
import { NotFoundState } from './components/states/NotFoundState';
import { ErrorState } from './components/states/ErrorState';
import { formatHumidity, formatWindSpeed, formatTemperature } from './lib/format';
import type { City } from './types/weather';
import { Droplets, Wind, Thermometer } from 'lucide-react';

export default function App() {
  const { viewState, fetchWeatherForCity, resetToIdle } = useWeather();
  const { theme, toggleTheme } = useTheme();
  const { recentCities, addRecentCity, clearRecentCities } = useRecentCities();
  const { unit, setUnit } = useTemperatureUnit();

  const handleSelectCity = useCallback(
    (city: City) => {
      addRecentCity(city);
      fetchWeatherForCity(city);
    },
    [addRecentCity, fetchWeatherForCity]
  );

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-blue-100 selection:text-primary">
      {/* Header dengan tombol tema, pilihan satuan temperatur, dan pencarian */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onResetToHome={resetToIdle}
        unit={unit}
        onChangeUnit={setUnit}
      >
        {viewState.status !== 'idle' && (
          <SearchBar onSelectCity={handleSelectCity} />
        )}
      </Header>

      {/* Main Container Stage */}
      <main className="flex-1 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 w-full py-6 sm:py-8">
        {/* State: IDLE */}
        {viewState.status === 'idle' && (
          <EmptyState
            onSelectCity={handleSelectCity}
            recentCities={recentCities}
            onClearRecent={clearRecentCities}
          />
        )}

        {/* State: LOADING */}
        {viewState.status === 'loading' && <SkeletonResult />}

        {/* State: SUCCESS */}
        {viewState.status === 'success' && (
          <div
            aria-live="polite"
            className="w-full max-w-6xl mx-auto flex flex-col animate-fade-in"
          >
            {/* Mobile-only Search Bar for convenient quick access */}
            <div className="md:hidden w-full mb-6">
              <SearchBar onSelectCity={handleSelectCity} />
            </div>

            {/* 12-Column Responsive Bento Layout */}
            <div className="grid grid-cols-12 gap-6 items-stretch">
              {/* Left Column: Hero Current Weather Card (8 Cols desktop) */}
              <div className="col-span-12 lg:col-span-8">
                <CurrentWeatherCard
                  report={viewState.report}
                  unit={unit}
                />
              </div>

              {/* Right Column: 3 Stat Cards (4 Cols desktop, 3-col on tablet) */}
              <div className="col-span-12 lg:col-span-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                <StatCard
                  label="Kelembapan"
                  value={formatHumidity(viewState.report.current.humidity)}
                  description={`Titik embun ${Math.round(
                    viewState.report.current.temperature -
                      (100 - viewState.report.current.humidity) / 5
                  )}°C`}
                  variant="primary"
                  icon={<Droplets className="w-6 h-6" />}
                />
                <StatCard
                  label="Angin"
                  value={formatWindSpeed(viewState.report.current.windSpeed)}
                  description="Kecepatan angin 10m"
                  variant="sky"
                  icon={<Wind className="w-6 h-6" />}
                />
                <StatCard
                  label="Terasa Seperti"
                  value={formatTemperature(viewState.report.current.feelsLike, unit)}
                  description={
                    viewState.report.current.feelsLike >
                    viewState.report.current.temperature
                      ? 'Udara terasa lebih gerah'
                      : 'Udara terasa sejuk'
                  }
                  variant="amber"
                  icon={<Thermometer className="w-6 h-6" />}
                />
              </div>
            </div>

            {/* Bottom: 7-Day Forecast */}
            <ForecastList daily={viewState.report.daily} unit={unit} />
          </div>
        )}

        {/* State: NOT FOUND */}
        {viewState.status === 'not-found' && (
          <NotFoundState
            query={viewState.query}
            onSelectCity={handleSelectCity}
          />
        )}

        {/* State: ERROR */}
        {viewState.status === 'error' && (
          <ErrorState
            message={viewState.message}
            onRetry={viewState.retry}
          />
        )}
      </main>

      {/* Footer dengan atribusi data Open-Meteo */}
      <Footer />
    </div>
  );
}
