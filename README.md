# Cuaca Kita - Cek Cuaca Kotamu

Aplikasi web prakiraan cuaca modern, bersih, dan cepat untuk kota-kota di seluruh Indonesia. Dibangun dengan React, TypeScript, dan Tailwind CSS menggunakan data cuaca publik dari Open-Meteo.

<!-- Placeholder Screenshot -->
![Cuaca Kita Preview](https://placehold.co/1200x630/2563eb/ffffff?text=Cuaca+Kita+-+Prakiraan+Cuaca+Indonesia)

---

## 🌐 Demo Live

- **Live URL:** [https://cuaca-kita.vercel.app](https://cuaca-kita.vercel.app) *(placeholder setelah deploy ke Vercel)*

---

## ✨ Fitur Utama

- **Pencarian Kota Cepat**: Autocomplete instan dengan debouncing 300ms yang disesuaikan untuk kota-kota di Indonesia.
- **Navigasi Keyboard Aksesibel**: Dukungan penuh tombol Panah Atas/Bawah, Enter, dan Escape dengan atribut ARIA combobox standar.
- **Riwayat Pencarian (FR-18)**: Menyimpan 5 kota pencarian terakhir di `localStorage` dengan penanganan error yang aman (*graceful fallback*).
- **Pilihan Kota Populer**: Tombol pintas untuk kota-kota besar di Indonesia (Jakarta, Surabaya, Bandung, Medan, Denpasar, Yogyakarta, Makassar).
- **Cuaca Terkini Akurat**: Menampilkan suhu aktual, estimasi suhu terasa (*feels like*), deskripsi kondisi cuaca, waktu pembaruan lokal, serta rentang suhu maksimum dan minimum.
- **Metrik Cuaca Rinci**: Kartu informasi kelembapan relatif, kecepatan angin, dan tekanan atmosfer.
- **Prakiraan 7 Hari**: Prospek cuaca mingguan dengan tanggal, ikon WMO, deskripsi cuaca, bar probabilitas presipitasi, dan suhu harian.
- **Pengalih Satuan Suhu (°C / °F) (FR-20)**: Konversi instan di sisi klien tanpa perlu memuat ulang data dari jaringan.
- **Mode Terang & Gelap**: Tema antarmuka yang menyesuaikan preferensi sistem secara otomatis atau melalui tombol toggle.
- **Penanganan State Komprehensif**: State *idle*, *loading* (skeleton shimmer), hasil cuaca lengkap, *not-found* (dilengkapi kartu tips pencarian), dan *error* jaringan dengan tombol *Coba Lagi*.
- **Desain Responsif**: Tampilan Bento Grid yang optimal di perangkat bergerak (375px), tablet (768px), maupun layar desktop (1280px+).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
- **Linter**: [ESLint](https://eslint.org/) (Flat Config)
- **Sumber Data Cuaca**: [Open-Meteo API](https://open-meteo.com/) (Geocoding API & Weather Forecast API)

---

## 🚀 Menjalankan Secara Lokal

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18 atau lebih baru).

### 1. Kloning Repositori & Masuk ke Direktori
```bash
git clone https://github.com/username/cuaca-kita.git
cd cuaca-kita
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka peramban pada alamat `http://localhost:5173`.

### 4. Menjalankan Pengujian (Testing)
```bash
npm test
```

### 5. Memeriksa Kualitas Kode (Linting)
```bash
npm run lint
```

### 6. Membangun untuk Produksi (Build)
```bash
npm run build
```
Hasil build produksi siap didistribusikan di folder `dist/`. Anda dapat menguji hasilnya dengan:
```bash
npm run preview
```

---

## 📁 Struktur Folder

```text
cuaca-kita/
├── public/                 # Aset publik statis (favicon.svg)
├── src/
│   ├── api/                # Pemanggilan Open-Meteo Geocoding & Forecast API
│   ├── components/         # Komponen UI modular
│   │   ├── layout/         # Header, Footer, UnitToggle
│   │   ├── search/         # SearchBar, SuggestionList, RecentChips
│   │   ├── states/         # EmptyState, SkeletonResult, NotFoundState, ErrorState
│   │   └── weather/        # CurrentWeatherCard, StatCard, ForecastList, WeatherIcon
│   ├── hooks/              # Custom hooks (useWeather, useCitySearch, useRecentCities, dll.)
│   ├── lib/                # Fungsi utilitas murni (format, weatherCodes, storage)
│   ├── test/               # Konfigurasi pengujian Vitest & setup DOM
│   ├── types/              # Definisi interface TypeScript (weather.ts)
│   ├── App.tsx             # Komponen utama aplikasi
│   ├── index.css           # Konfigurasi Tailwind CSS & utility font
│   └── main.tsx            # Titik masuk aplikasi
├── .gitignore              # Pengecualian berkas git
├── index.html              # HTML entrypoint dengan metadata mobile ramah pengguna
├── package.json            # Daftar dependensi & script proyek
├── tailwind.config.ts      # Konfigurasi tema warna & desain token
├── tsconfig.json           # Konfigurasi TypeScript compiler
└── vite.config.ts          # Konfigurasi Vite & Vitest
```

---

## 📄 Atribusi Sumber Data

Data cuaca oleh [Open-Meteo.com](https://open-meteo.com/) di bawah lisensi [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Tidak memerlukan kunci API (API key).

---

## 📜 Lisensi

Proyek ini dibuat untuk keperluan demonstrasi dan pembelajaran.
