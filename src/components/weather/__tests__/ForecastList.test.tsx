import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ForecastList } from '../ForecastList';
import type { DailyForecast } from '../../../types/weather';

describe('ForecastList', () => {
  const mockDaily: DailyForecast[] = [
    {
      date: '2026-11-06',
      weatherCode: 3,
      tempMax: 33,
      tempMin: 25,
      precipitationProbability: 40,
    },
    {
      date: '2026-11-07',
      weatherCode: 61,
      tempMax: 31,
      tempMin: 24,
      precipitationProbability: 70,
    },
  ];

  it('merender judul prakiraan dan baris harian', () => {
    render(<ForecastList daily={mockDaily} />);
    expect(screen.getByText('Prakiraan 7 Hari')).toBeInTheDocument();
    expect(screen.getByText('Hari ini')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
  });

  it('tidak merender apapun jika array daily kosong', () => {
    const { container } = render(<ForecastList daily={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
