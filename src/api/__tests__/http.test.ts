import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { httpGet } from '../http';

describe('httpGet', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('mengembalikan data json jika status 200 ok', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ hello: 'world' }),
    } as unknown as Response);

    const result = await httpGet<{ hello: string }>('https://example.com/api');
    expect(result).toEqual({ hello: 'world' });
  });

  it('melempar ApiError dengan pesan khusus saat HTTP 429', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 429,
    } as unknown as Response);

    await expect(httpGet('https://example.com/api')).rejects.toThrow(
      'Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi.'
    );
  });

  it('melempar ApiError saat HTTP 500', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as unknown as Response);

    await expect(httpGet('https://example.com/api')).rejects.toThrow(
      'Layanan cuaca sedang bermasalah. Coba lagi nanti.'
    );
  });

  it('meneruskan AbortError ketika caller signal dibatalkan', async () => {
    const controller = new AbortController();
    controller.abort();

    await expect(
      httpGet('https://example.com/api', { signal: controller.signal })
    ).rejects.toThrow();
  });

  it('mengubah network error biasa menjadi ApiError ramah pengguna', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(httpGet('https://example.com/api')).rejects.toThrow(
      'Tidak bisa terhubung. Periksa koneksi internet kamu.'
    );
  });
});
