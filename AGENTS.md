# Aturan untuk AI Agent - Cuaca Kita

Dokumen ini adalah ringkasan aturan kerja dan panduan pengembangan untuk proyek "Cuaca Kita", disarikan dari Bagian 9 `rancangan-website-cuaca.md`.

## Peran
Agent bertindak sebagai pengembang untuk proyek "Cuaca Kita". Mengutamakan kode yang sederhana, bersih, mudah dibaca, dan sesuai dengan desain visual dari Stitch.

## Yang HARUS Dilakukan
1. **TypeScript Strict Mode**: Hindari penggunaan `any`. Selalu manfaatkan tipe data yang didefinisikan di `src/types/weather.ts`.
2. **Pemisahan Lapisan yang Jelas**:
   - `api/` (jaringan dan pemetaan data eksternal)
   - `hooks/` (state, efek samping, dan orkestrasi logika)
   - `components/` (tampilan UI murni)
   - `lib/` (utilitas dan fungsi murni yang mudah diuji)
3. **Pembatalan Permintaan (AbortController)**: Selalu sediakan dan hubungkan `AbortSignal` pada pemanggilan API yang berpotensi tumpang tindih untuk mencegah *race condition*.
4. **Bahasa Antarmuka**: Seluruh teks antarmuka pengguna (UI) wajib menggunakan Bahasa Indonesia baku dan ramah. Kode, identifier, nama fungsi, dan komentar teknis diperbolehkan dalam Bahasa Inggris.
5. **Penanganan Lengkap Semua State**:
   - `idle` (tampilan awal saat belum ada pencarian)
   - `loading` (skeleton loading)
   - `success` (data cuaca tampil lengkap)
   - `not-found` (kota tidak ditemukan)
   - `error` (koneksi terputus/HTTP error dengan tombol retry)
6. **Atribusi Sumber Data**: Wajib menyertakan atribusi lisensi Open-Meteo pada footer: "Data cuaca oleh Open-Meteo.com" dengan tautan aktif.
7. **Kesesuaian Visual**: Rujuk desain visual dari Google Stitch via MCP Stitch.
8. **Verifikasi Kualitas**: Jalankan `npm run build`, `npm run lint`, dan `npm test` sebelum menyatakan milestone selesai.
9. **Git Commit**: Commit kecil dan terstruktur per milestone.

## Yang DILARANG
1. Dilarang menambah backend, server database, atau library bundle berukuran besar tanpa persetujuan pengguna.
2. Dilarang menyimpan API key / rahasia di kode (Open-Meteo tidak memerlukan API key).
3. Dilarang menggunakan `dangerouslySetInnerHTML` untuk teks dari API guna mencegah celah XSS.
4. Dilarang menyalin mentah-mentah kode HTML dari Stitch ke dalam proyek tanpa diadaptasi menjadi komponen React yang modular dan terstruktur.
5. Dilarang mengubah ruang lingkup atau perilaku yang sudah ditetapkan di `rancangan-website-cuaca.md` tanpa konfirmasi pengguna.
6. Dilarang memalsukan data cuaca (mocking tanpa izin) saat pemanggilan nyata. Bila API gagal, harus menampilkan state error dengan semestinya.

## Gaya Kode
- Menggunakan komponen fungsional React + Hooks.
- Satu komponen utama per file dengan penamaan `PascalCase`.
- Komponen kecil dan fokus (idealnya < 120 baris).
- Styling menggunakan Tailwind CSS.
- Menggunakan *named export* untuk modul dan komponen, kecuali `App` sebagai default export jika diperlukan.

## Skrip Utama
- `npm run dev`: Menjalankan development server Vite.
- `npm run build`: Memeriksa tipe dan mem-build bundle produksi.
- `npm run preview`: Memeriksa hasil build produksi.
- `npm run lint`: Menjalankan linter ESLint.
- `npm run test`: Menjalankan unit test dengan Vitest.
