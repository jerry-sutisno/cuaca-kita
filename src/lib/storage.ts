/**
 * Wrapper localStorage yang aman dengan try/catch untuk menghindari crash
 * saat storage dinonaktifkan atau dibatasi oleh browser/mode incognito.
 */
export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Gagal membaca key "${key}" dari localStorage:`, error);
    return fallback;
  }
}

export function setStorageItem<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Gagal menyimpan key "${key}" ke localStorage:`, error);
    return false;
  }
}
