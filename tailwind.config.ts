import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#DBEAFE',
          fixed: '#dbe1ff',
          deep: '#004ac6',
        },
        warm: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
        },
        rain: {
          DEFAULT: '#0284C7',
          light: '#E0F2FE',
        },
        slate: {
          950: '#0B1220',
        },
      },
      boxShadow: {
        glass: '0 10px 30px -5px rgba(37, 99, 235, 0.04), 0 4px 6px -2px rgba(15, 23, 42, 0.02)',
        'glass-hover': '0 20px 35px -5px rgba(37, 99, 235, 0.08), 0 8px 12px -3px rgba(15, 23, 42, 0.03)',
        'glass-dropdown': '0 25px 50px -12px rgba(15, 23, 42, 0.12)',
      },
      borderRadius: {
        '3xl': '1.5rem', // 24px per design system
      },
    },
  },
  plugins: [],
} satisfies Config;
