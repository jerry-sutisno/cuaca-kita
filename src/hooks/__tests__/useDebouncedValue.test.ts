import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebouncedValue } from '../useDebouncedValue';

describe('useDebouncedValue', () => {
  it('harus mengembalikan nilai awal secara instan', () => {
    const { result } = renderHook(() => useDebouncedValue('Jakarta', 300));
    expect(result.current).toBe('Jakarta');
  });

  it('harus menunda pembaruan nilai sampai delay terlewati', () => {
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebouncedValue(val, delay),
      { initialProps: { val: 'Jak', delay: 300 } }
    );

    expect(result.current).toBe('Jak');

    rerender({ val: 'Jakarta', delay: 300 });
    // Belum berubah sebelum 300ms
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('Jak');

    // Berubah setelah 300ms
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('Jakarta');

    vi.useRealTimers();
  });
});
