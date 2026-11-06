import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CurrentWeatherCard } from '../CurrentWeatherCard';
import type { WeatherReport } from '../../../types/weather';

describe('CurrentWeatherCard', () => {
  const mockReport: WeatherReport = {
    city: {
      id: 1,
      name: 'Jakarta',
      admin1: 'DKI Jakarta',
      country: 'Indonesia',
      latitude: -6.17,
      longitude: 106.83,
      timezone: 'Asia/Jakarta',
    },
    current: {
      time: '2026-11-06T14:00',
      temperature: 31.4,
      feelsLike: 36,
      humidity: 68,
      windSpeed: 11.5,
      weatherCode: 3,
      isDay: true,
    },
    daily: [
      {
        date: '2026-11-06',
        weatherCode: 3,
        tempMax: 33.1,
        tempMin: 25.0,
        precipitationProbability: 40,
      },
    ],
  };

  it('merender nama kota, tanggal/waktu, dan suhu utama', () => {
    render(<CurrentWeatherCard report={mockReport} />);
    expect(screen.getByText('Jakarta, DKI Jakarta')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
    expect(screen.getByText('Berawan tebal')).toBeInTheDocument();
    expect(screen.getByText('Pembaruan Langsung')).toBeInTheDocument();
  });

  it('merender pill suhu maksimum dan minimum dari data prakiraan', () => {
    render(<CurrentWeatherCard report={mockReport} />);
    expect(screen.getByText(/Maks: 33°/)).toBeInTheDocument();
    expect(screen.getByText(/Min: 25°/)).toBeInTheDocument();
  });
});
