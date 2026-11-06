import { describe, it, expect } from 'vitest';
import {
  celsiusToFahrenheit,
  formatTemperature,
  formatWindSpeed,
  formatHumidity,
  formatCurrentDateTime,
  formatForecastDay,
} from '../format';

describe('format', () => {
  it('celsiusToFahrenheit harus menghitung dengan rumus F = C * 9/5 + 32', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(celsiusToFahrenheit(25)).toBe(77);
  });

  it('formatTemperature harus membulatkan nilai dan menambahkan simbol derajat', () => {
    expect(formatTemperature(31.4)).toBe('31°');
    expect(formatTemperature(31.6)).toBe('32°');
    expect(formatTemperature(25, 'fahrenheit')).toBe('77°');
  });

  it('formatWindSpeed harus memformat kecepatan dengan unit km/jam dalam format lokal id-ID', () => {
    expect(formatWindSpeed(11.5)).toContain('11,5 km/jam');
    expect(formatWindSpeed(10)).toContain('10 km/jam');
  });

  it('formatHumidity harus memformat kelembapan dengan persen', () => {
    expect(formatHumidity(68.2)).toBe('68%');
  });

  it('formatCurrentDateTime harus menghasilkan nama hari, tanggal, bulan, dan jam lokal', () => {
    // 2026-11-06 adalah hari Jumat
    const formatted = formatCurrentDateTime('2026-11-06T14:00');
    expect(formatted).toBe('Jumat, 6 Nov · 14.00');
  });

  it('formatForecastDay harus mengembalikan "Hari ini" untuk indeks 0, dan nama hari untuk indeks > 0', () => {
    expect(formatForecastDay('2026-11-06', 0)).toBe('Hari ini');
    // 2026-11-07 adalah hari Sabtu
    expect(formatForecastDay('2026-11-07', 1)).toBe('Sabtu');
  });
});
