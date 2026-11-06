import { describe, it, expect } from 'vitest';
import { getWeatherCodeInfo } from '../weatherCodes';

describe('weatherCodes', () => {
  it('harus memetakan kode 0 menjadi Cerah dan grup clear', () => {
    const info = getWeatherCodeInfo(0);
    expect(info.label).toBe('Cerah');
    expect(info.iconGroup).toBe('clear');
  });

  it('harus memetakan kode 1, 2 menjadi cerah berawan/berawan sebagian (partly-cloudy)', () => {
    expect(getWeatherCodeInfo(1).iconGroup).toBe('partly-cloudy');
    expect(getWeatherCodeInfo(2).iconGroup).toBe('partly-cloudy');
  });

  it('harus memetakan kode 3 menjadi Berawan tebal (cloudy)', () => {
    const info = getWeatherCodeInfo(3);
    expect(info.label).toBe('Berawan tebal');
    expect(info.iconGroup).toBe('cloudy');
  });

  it('harus memetakan kode kabut 45 dan 48', () => {
    expect(getWeatherCodeInfo(45).iconGroup).toBe('fog');
    expect(getWeatherCodeInfo(48).iconGroup).toBe('fog');
  });

  it('harus memetakan kode hujan lebat 65 dan 82 ke rain-heavy', () => {
    expect(getWeatherCodeInfo(65).iconGroup).toBe('rain-heavy');
    expect(getWeatherCodeInfo(82).iconGroup).toBe('rain-heavy');
  });

  it('harus memetakan kode badai petir 95, 96, 99 ke thunderstorm', () => {
    expect(getWeatherCodeInfo(95).iconGroup).toBe('thunderstorm');
    expect(getWeatherCodeInfo(96).iconGroup).toBe('thunderstorm');
    expect(getWeatherCodeInfo(99).iconGroup).toBe('thunderstorm');
  });

  it('harus mengembalikan Tidak diketahui dan grup unknown untuk kode tak dikenal', () => {
    const info = getWeatherCodeInfo(9999);
    expect(info.label).toBe('Tidak diketahui');
    expect(info.iconGroup).toBe('unknown');
  });
});
