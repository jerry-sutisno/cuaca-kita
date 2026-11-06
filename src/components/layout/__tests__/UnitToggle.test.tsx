import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { UnitToggle } from '../UnitToggle';

describe('UnitToggle', () => {
  it('menampilkan tombol pilihan satuan °C dan °F', () => {
    const onChange = vi.fn();
    render(<UnitToggle unit="celsius" onChangeUnit={onChange} />);

    const celsiusBtn = screen.getByRole('button', { name: /°C/i });
    const fahrenheitBtn = screen.getByRole('button', { name: /°F/i });

    expect(celsiusBtn).toHaveAttribute('aria-pressed', 'true');
    expect(fahrenheitBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(fahrenheitBtn);
    expect(onChange).toHaveBeenCalledWith('fahrenheit');
  });
});
