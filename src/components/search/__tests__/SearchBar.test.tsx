import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchBar } from '../SearchBar';
import * as geocodingApi from '../../../api/geocoding';

describe('SearchBar', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const mockCities = [
    {
      id: 1,
      name: 'Jakarta',
      country: 'Indonesia',
      admin1: 'DKI Jakarta',
      latitude: -6.17,
      longitude: 106.83,
      timezone: 'Asia/Jakarta',
    },
    {
      id: 2,
      name: 'Jakarta Barat',
      country: 'Indonesia',
      admin1: 'DKI Jakarta',
      latitude: -6.16,
      longitude: 106.75,
      timezone: 'Asia/Jakarta',
    },
  ];

  it('merender input pencarian dengan placeholder dan atribut ARIA combobox', () => {
    render(<SearchBar onSelectCity={vi.fn()} />);
    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('placeholder', 'Cari kota, mis. Jakarta');
  });

  it('menampilkan saran saat mengetik minimal 2 karakter', async () => {
    vi.spyOn(geocodingApi, 'searchCities').mockResolvedValue(mockCities);
    render(<SearchBar onSelectCity={vi.fn()} />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Jakarta' } });

    await waitFor(() => {
      expect(screen.getByText('Jakarta Barat')).toBeInTheDocument();
    });

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
  });

  it('memilih saran pertama saat menekan Enter tanpa memilih indeks (FR-04)', async () => {
    vi.spyOn(geocodingApi, 'searchCities').mockResolvedValue(mockCities);
    const onSelect = vi.fn();
    render(<SearchBar onSelectCity={onSelect} />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Jakarta' } });

    await waitFor(() => {
      expect(screen.getByText('Jakarta Barat')).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith(mockCities[0]);
  });

  it('navigasi keyboard dengan ArrowDown lalu Enter memilih item yang disorot (FR-03)', async () => {
    vi.spyOn(geocodingApi, 'searchCities').mockResolvedValue(mockCities);
    const onSelect = vi.fn();
    render(<SearchBar onSelectCity={onSelect} />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Jakarta' } });

    await waitFor(() => {
      expect(screen.getByText('Jakarta Barat')).toBeInTheDocument();
    });

    // Arrow down sekali -> pilih item 0
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    // Arrow down dua kali -> pilih item 1 (Jakarta Barat)
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledWith(mockCities[1]);
  });

  it('menekan tombol Escape menutup daftar saran (FR-03)', async () => {
    vi.spyOn(geocodingApi, 'searchCities').mockResolvedValue(mockCities);
    render(<SearchBar onSelectCity={vi.fn()} />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Jakarta' } });

    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});
