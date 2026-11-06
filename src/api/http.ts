export class ApiError extends Error {
  public status?: number;
  public isNetworkError: boolean;

  constructor(message: string, status?: number, isNetworkError = false) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isNetworkError = isNetworkError;
  }
}

interface FetchOptions extends RequestInit {
  timeoutMs?: number;
}

/**
 * Mengirim permintaan HTTP dengan timeout dan penanganan error terstandar.
 */
export async function httpGet<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { timeoutMs = 10000, signal: callerSignal, ...rest } = options;

  const timeoutController = new AbortController();
  const timeoutId = setTimeout(() => {
    timeoutController.abort(new Error('TIMEOUT'));
  }, timeoutMs);

  // Gabungkan callerSignal dengan timeoutController jika ada
  let activeSignal = timeoutController.signal;
  if (callerSignal) {
    if (callerSignal.aborted) {
      clearTimeout(timeoutId);
      throw callerSignal.reason ?? new DOMException('Aborted', 'AbortError');
    }
    const combinedController = new AbortController();
    const onCallerAbort = () => {
      combinedController.abort(callerSignal.reason ?? new DOMException('Aborted', 'AbortError'));
    };
    const onTimeoutAbort = () => {
      combinedController.abort(timeoutController.signal.reason);
    };

    callerSignal.addEventListener('abort', onCallerAbort, { once: true });
    timeoutController.signal.addEventListener('abort', onTimeoutAbort, { once: true });

    activeSignal = combinedController.signal;
  }

  try {
    const response = await fetch(url, {
      ...rest,
      method: 'GET',
      signal: activeSignal,
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new ApiError('Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi.', 429);
      }
      if (response.status >= 500) {
        throw new ApiError('Layanan cuaca sedang bermasalah. Coba lagi nanti.', response.status);
      }
      throw new ApiError(`Permintaan gagal dengan kode HTTP ${response.status}`, response.status);
    }

    const data = await response.json();
    return data as T;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }

    // Jika dibatalkan karena timeout
    if (
      (err instanceof Error && err.message === 'TIMEOUT') ||
      (activeSignal.aborted && activeSignal.reason instanceof Error && activeSignal.reason.message === 'TIMEOUT')
    ) {
      throw new ApiError('Tidak bisa terhubung. Periksa koneksi internet kamu.', undefined, true);
    }

    // Jika dibatalkan oleh caller (AbortError)
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw err;
    }

    if (callerSignal?.aborted) {
      throw new DOMException('Aborted', 'AbortError');
    }

    // Network error umum (offline, DNS failure, dll.)
    throw new ApiError('Tidak bisa terhubung. Periksa koneksi internet kamu.', undefined, true);
  } finally {
    clearTimeout(timeoutId);
  }
}
