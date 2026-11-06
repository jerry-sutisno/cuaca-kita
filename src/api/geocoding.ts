import { httpGet } from './http';
import type { City } from '../types/weather';

interface RawGeocodingItem {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
}

interface RawGeocodingResponse {
  results?: RawGeocodingItem[];
  generationtime_ms?: number;
}

/**
 * Mencari daftar kota berdasarkan nama query menggunakan Open-Meteo Geocoding API.
 */
export async function searchCities(query: string, signal?: AbortSignal): Promise<City[]> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return [];
  }

  const encodedQuery = encodeURIComponent(trimmed);
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodedQuery}&count=5&language=id&format=json`;

  const data = await httpGet<RawGeocodingResponse>(url, { signal });

  // Catatan SRS: jika tidak ada hasil, properti `results` tidak ada dalam respons (bukan array kosong)
  if (!data.results || !Array.isArray(data.results)) {
    return [];
  }

  return data.results.map((item) => ({
    id: item.id,
    name: item.name,
    admin1: item.admin1,
    country: item.country,
    latitude: item.latitude,
    longitude: item.longitude,
    timezone: item.timezone || 'auto',
  }));
}
