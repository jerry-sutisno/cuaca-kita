# Cuaca Kita

Website untuk cek cuaca suatu kota. Ketik nama kota, pilih dari saran yang muncul, lalu lihat kondisi cuaca saat ini dan prakiraan 7 hari ke depan.

Demo: (https://cuaca-kita.vercel.app/)

## Fitur

- Pencarian kota dengan saran otomatis
- Cuaca saat ini: suhu, kondisi cuaca, kelembapan, kecepatan angin, dan suhu terasa seperti
- Prakiraan 7 hari: suhu minimum dan maksimum, kondisi cuaca, dan peluang hujan
- Tampilan khusus saat loading, kota tidak ditemukan, dan koneksi gagal
- Responsif di HP, tablet, dan desktop
- Mode terang dan gelap

## Teknologi

React, Vite, TypeScript, dan Tailwind CSS. Data cuaca diambil dari API Open-Meteo, jadi tidak perlu API key. Desain antarmuka dibuat di Google Stitch.

## Menjalankan di komputer sendiri

Butuh Node.js (versi LTS).

```bash
git clone https://github.com/jerry-sutisno/cuaca-kita.git
cd cuaca-kita
npm install
npm run dev
```

Lalu buka alamat yang muncul di terminal, biasanya `http://localhost:5173`.

Perintah lain:

```bash
npm run build     # build untuk produksi
npm run preview   # lihat hasil build
npm run lint      # cek kode
npm test          # jalankan test
```

## Struktur folder

```
src/
  api/          pemanggilan API (geocoding dan cuaca)
  components/   komponen tampilan
  hooks/        logika state (pencarian, cuaca, tema)
  lib/          fungsi bantu (format, kode cuaca)
  types/        tipe TypeScript
```

## Sumber data

Data cuaca oleh [Open-Meteo.com](https://open-meteo.com). Prakiraan cuaca bersifat perkiraan, jadi hasilnya bisa berbeda dengan kondisi di lapangan.
