import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { searchCities } from '../geocoding';

describe('searchCities', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mengembalikan array kosong jika query kurang dari 2 karakter', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const result = await searchCities('a');
    expect(result).toEqual([]);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('memetakan hasil pencarian dengan benar saat API mengembalikan hasil', async () => {
    const mockResponse = {
      results: [
        {
          id: 1642911,
          name: 'Jakarta',
          latitude: -6.17,
          longitude: 106.83,
          country: 'Indonesia',
          admin1: 'DKI Jakarta',
          timezone: 'Asia/Jakarta',
        },
      ],
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    } as unknown as Response);

    const result = await searchCities('Jakarta');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 1642911,
      name: 'Jakarta',
      admin1: 'DKI Jakarta',
      country: 'Indonesia',
      latitude: -6.17,
      longitude: 106.83,
      timezone: 'Asia/Jakarta',
    });
  });

  it('mengembalikan array kosong bila respons API tidak memiliki properti results (bukan array kosong)', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ generationtime_ms: 0.1 }),
    } as unknown as Response);

    const result = await searchCities('KotaTidakAdaXYZ');
    expect(result).toEqual([]);
  });
});
