import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RecentChips } from '../RecentChips';
import type { City } from '../../../types/weather';

describe('RecentChips', () => {
  const cities: City[] = [
    {
      id: 1,
      name: 'Jakarta',
      country: 'Indonesia',
      latitude: -6.17,
      longitude: 106.83,
      timezone: 'Asia/Jakarta',
    },
    {
      id: 2,
      name: 'Surabaya',
      country: 'Indonesia',
      latitude: -7.25,
      longitude: 112.75,
      timezone: 'Asia/Jakarta',
    },
  ];

  it('merender chip riwayat dan memanggil onSelectCity saat diklik', () => {
    const onSelect = vi.fn();
    render(<RecentChips cities={cities} onSelectCity={onSelect} />);

    expect(screen.getByText('Pencarian Terakhir:')).toBeInTheDocument();
    const jakartaChip = screen.getByRole('button', { name: /Jakarta/i });
    fireEvent.click(jakartaChip);
    expect(onSelect).toHaveBeenCalledWith(cities[0]);
  });

  it('tidak merender apapun jika array cities kosong', () => {
    const { container } = render(<RecentChips cities={[]} onSelectCity={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });
});
