export type TemperatureUnit = 'celsius' | 'fahrenheit';

/**
 * Konversi suhu Celcius ke Fahrenheit.
 * Rumus: F = C * 9/5 + 32
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Format suhu menjadi string terbulat dengan tanda derajat.
 */
export function formatTemperature(
  tempInCelsius: number,
  unit: TemperatureUnit = 'celsius'
): string {
  const value = unit === 'fahrenheit' ? celsiusToFahrenheit(tempInCelsius) : tempInCelsius;
  return `${Math.round(value)}°`;
}

/**
 * Format kecepatan angin dalam km/jam dengan locale id-ID (mis. "11,5 km/jam" atau "12 km/jam").
 */
export function formatWindSpeed(speedKmh: number): string {
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 1,
  }).format(speedKmh);
  return `${formatted} km/jam`;
}

/**
 * Format kelembapan udara (%).
 */
export function formatHumidity(humidity: number): string {
  return `${Math.round(humidity)}%`;
}

/**
 * Parse string ISO waktu lokal (mis. "2026-11-06T14:00") menjadi komponen tanggal dan waktu lokal.
 */
function parseLocalIso(isoString: string): { year: number; month: number; day: number; hour: number; minute: number } {
  const [datePart, timePart = '00:00'] = isoString.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);
  return { year, month, day, hour, minute };
}

const NAMA_HARI = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

const NAMA_BULAN_PENDEK = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

/**
 * Format jam dan menit waktu lokal kota dari ISO (mis. "2026-11-06T14:00" -> "14.00")
 */
export function formatLocalTime(isoTime: string): string {
  const { hour, minute } = parseLocalIso(isoTime);
  const formattedHour = String(hour).padStart(2, '0');
  const formattedMinute = String(minute).padStart(2, '0');
  return `${formattedHour}.${formattedMinute}`;
}

/**
 * Format waktu lokal kota dari ISO (mis. "2026-11-06T14:00" -> "Jumat, 6 Nov · 14.00")
 */
export function formatCurrentDateTime(isoTime: string): string {
  const { year, month, day, hour, minute } = parseLocalIso(isoTime);
  // Gunakan Date UTC untuk menentukan hari dalam seminggu tanpa terpengaruh timezone browser
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  const dayName = NAMA_HARI[utcDate.getUTCDay()];
  const monthName = NAMA_BULAN_PENDEK[month - 1];
  const formattedHour = String(hour).padStart(2, '0');
  const formattedMinute = String(minute).padStart(2, '0');

  return `${dayName}, ${day} ${monthName} · ${formattedHour}.${formattedMinute}`;
}

/**
 * Format nama hari untuk prakiraan harian.
 * Hari pertama (indeks 0) adalah "Hari ini", selanjutnya nama hari dalam bahasa Indonesia.
 */
export function formatForecastDay(dateString: string, index: number): string {
  if (index === 0) {
    return 'Hari ini';
  }
  const [year, month, day] = dateString.split('-').map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  return NAMA_HARI[utcDate.getUTCDay()];
}
