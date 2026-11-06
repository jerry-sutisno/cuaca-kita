import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EmptyState } from '../EmptyState';
import { SkeletonResult } from '../SkeletonResult';
import { NotFoundState } from '../NotFoundState';
import { ErrorState } from '../ErrorState';

describe('Application States', () => {
  it('EmptyState menampilkan judul awal dan tombol kota populer', () => {
    const onSelect = vi.fn();
    render(<EmptyState onSelectCity={onSelect} />);

    expect(screen.getByText('Mau cek cuaca di mana hari ini?')).toBeInTheDocument();
    const jakartaBtn = screen.getByRole('button', { name: /Jakarta/i });
    fireEvent.click(jakartaBtn);
    expect(onSelect).toHaveBeenCalled();
  });

  it('SkeletonResult memiliki status ARIA yang benar', () => {
    render(<SkeletonResult />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('NotFoundState menampilkan pesan query yang dicari', () => {
    render(<NotFoundState query="KotaNgawur" onSelectCity={vi.fn()} />);
    expect(screen.getByText('Kota Tidak Ditemukan')).toBeInTheDocument();
    expect(screen.getByText('KotaNgawur')).toBeInTheDocument();
  });

  it('ErrorState menampilkan pesan error dan memicu tombol coba lagi', () => {
    const onRetry = vi.fn();
    render(<ErrorState message="Koneksi terputus" onRetry={onRetry} />);

    expect(screen.getByText('Koneksi Terputus')).toBeInTheDocument();
    expect(screen.getByText('Koneksi terputus')).toBeInTheDocument();
    const retryBtn = screen.getByRole('button', { name: /Coba lagi/i });
    fireEvent.click(retryBtn);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
