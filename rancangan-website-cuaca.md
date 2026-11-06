# Rancangan Lengkap: Website Informasi Cuaca ("Cuaca Kita")

> Dokumen tunggal berisi BRD, PRD, SRS, spesifikasi UI/UX, arsitektur, aturan agent (gaya AGENTS.md), dan rencana tugas.
> Dibuat untuk dibaca oleh AI coding agent. Nama proyek di bawah hanyalah nama kerja, boleh diganti.

---

## 0. Cara Memakai Dokumen Ini (WAJIB DIBACA AGENT PERTAMA)

Urutan kerja yang diharapkan:

1. **Baca seluruh dokumen ini** sebelum menulis kode apa pun.
2. **Ambil desain UI dari Google Stitch lewat koneksi MCP Stitch** (bukan dengan menyalin kode HTML manual). Pakai project Stitch yang disebutkan user. Jika koneksi MCP Stitch tidak tersedia atau project tidak ditemukan, **berhenti dan tanya user**; jangan mengarang desain sendiri.
3. **Scaffold proyek** sesuai Bagian 6 (arsitektur) dan 9 (aturan agent).
4. **Implementasikan per milestone** (Bagian 10). Selesaikan satu milestone, verifikasi, baru lanjut.
5. **Cocokkan UI hasil implementasi dengan desain Stitch**. Jika ada perbedaan antara desain Stitch dan dokumen ini:
   - Untuk **tampilan visual** (warna, spasi, tata letak, ikon): desain Stitch menang.
   - Untuk **perilaku, data, dan alur**: dokumen ini menang.
   - Jika ragu, catat perbedaannya dan laporkan ke user, jangan memutuskan diam-diam.
6. Di akhir, buat **laporan singkat**: apa yang selesai, apa yang berbeda dari desain Stitch, apa yang belum.

---

## 1. BRD (Business Requirements Document)

### 1.1 Latar Belakang
Informasi cuaca penting untuk aktivitas harian (berangkat kuliah/kerja, acara luar ruangan, perjalanan). Banyak situs cuaca penuh iklan dan menampilkan data berlebihan. Dibutuhkan website sederhana, cepat, dan bersih yang langsung menjawab: *"Cuaca di kota X sekarang dan beberapa hari ke depan bagaimana?"*

### 1.2 Tujuan Bisnis / Proyek
- Menyediakan website cuaca yang ringan, responsif, dan mudah dipakai tanpa login.
- Menjadi **proyek portofolio** yang menunjukkan kemampuan: konsumsi REST API, manajemen state asinkron, penanganan error, dan desain UI responsif.

### 1.3 Ruang Lingkup
**Termasuk (In Scope)**
- Pencarian kota berdasarkan nama (dengan saran otomatis).
- Tampilan cuaca saat ini dan prakiraan harian.
- Tampilan responsif (mobile, tablet, desktop).
- Penanganan kondisi loading, kosong, dan error.

**Tidak Termasuk (Out of Scope)**
- Akun pengguna, login, dan database.
- Backend/server sendiri.
- Peringatan cuaca ekstrem (severe weather alert) dan data kualitas udara.
- Peta radar/satelit.
- Notifikasi push.

### 1.4 Pemangku Kepentingan
| Peran | Keterangan |
|---|---|
| Pemilik proyek | Mahasiswa pembuat proyek (portofolio) |
| Pengguna akhir | Masyarakat umum yang ingin cek cuaca cepat |
| Penyedia data | Open-Meteo (API cuaca dan geocoding publik) |

### 1.5 Indikator Keberhasilan
- Pengguna mendapat hasil cuaca dalam **≤ 2 detik** setelah memilih kota (kondisi jaringan normal).
- Semua 6 informasi inti tampil benar untuk kota yang dicari.
- Tampilan tidak rusak di lebar layar 360px sampai 1440px.
- Skor Lighthouse (Performance dan Accessibility) ≥ 90 pada build produksi.

### 1.6 Asumsi dan Batasan
- Memakai API gratis tanpa API key; ketersediaan bergantung pada layanan pihak ketiga.
- Open-Meteo gratis untuk penggunaan non-komersial dengan batas pemakaian wajar dan **mewajibkan atribusi** (lisensi CC BY 4.0). Proyek ini bersifat portofolio/non-komersial, dan atribusi wajib ditampilkan di footer.
- Data prakiraan bersifat estimasi, bukan jaminan.

---

## 2. PRD (Product Requirements Document)

### 2.1 Ringkasan Produk
Single-page web app. Pengguna mengetik nama kota, memilih dari saran, lalu melihat cuaca saat ini dan prakiraan 7 hari.

### 2.2 Persona
**Rina, 21 tahun, mahasiswi.** Cek cuaca dari HP sebelum berangkat. Mau jawaban cepat: hujan atau tidak, panas atau tidak. Tidak mau login.

**Dimas, 27 tahun, pekerja lapangan.** Perlu tahu angin dan suhu terasa untuk merencanakan pekerjaan luar ruangan beberapa hari ke depan.

### 2.3 User Stories
| ID | Sebagai | Saya ingin | Agar |
|---|---|---|---|
| US-01 | pengguna | mengetik nama kota di kolom pencarian | bisa mencari cuaca kota tertentu |
| US-02 | pengguna | melihat saran kota saat mengetik | tidak salah memilih kota (banyak nama kota kembar) |
| US-03 | pengguna | melihat suhu saat ini | tahu seberapa panas/dingin sekarang |
| US-04 | pengguna | melihat kondisi cuaca (cerah/berawan/hujan, dst.) dengan ikon | cepat paham situasi |
| US-05 | pengguna | melihat kelembapan udara | tahu seberapa lembap/gerah |
| US-06 | pengguna | melihat kecepatan angin | tahu seberapa berangin |
| US-07 | pengguna | melihat suhu terasa seperti (feels like) | tahu suhu yang benar-benar dirasakan tubuh |
| US-08 | pengguna | melihat prakiraan beberapa hari ke depan | bisa merencanakan aktivitas |
| US-09 | pengguna | diberi pesan jelas jika kota tidak ditemukan atau koneksi gagal | tahu apa yang harus dilakukan |
| US-10 | pengguna | memakai website nyaman di HP | karena kebanyakan cek dari HP |

### 2.4 Prioritas Fitur (MoSCoW)
**Must have (MVP)**
- F-01 Kolom pencarian kota dengan autocomplete
- F-02 Cuaca saat ini: suhu, kondisi + ikon, kelembapan, angin, suhu terasa seperti
- F-03 Prakiraan 7 hari (min/maks, kondisi, peluang hujan)
- F-04 State loading, empty, error
- F-05 Layout responsif
- F-06 Atribusi data di footer

**Should have**
- F-07 Riwayat pencarian terakhir (localStorage, maks 5)
- F-08 Mode gelap/terang (ikuti preferensi sistem, bisa di-toggle)
- F-09 Toggle satuan °C/°F

**Could have**
- F-10 Tombol "Gunakan lokasi saya" (geolocation)
- F-11 Latar belakang halaman berubah mengikuti kondisi cuaca dan siang/malam
- F-12 Parameter kota di URL agar hasil bisa dibagikan (`?q=Jakarta`)

**Won't have (versi ini)**
- Akun, notifikasi, peta radar, kualitas udara.

### 2.5 Alur Pengguna Utama
1. Pengguna membuka halaman → melihat **tampilan awal (empty state)** dengan kolom pencarian dan kota contoh yang bisa diklik (mis. Jakarta, Bandung, Surabaya).
2. Pengguna mengetik minimal 2 karakter → daftar saran muncul (maks 5).
3. Pengguna memilih saran (klik/Enter) → tampil **loading skeleton**.
4. Data berhasil → tampil **hasil cuaca** (hero card, kartu statistik, prakiraan 7 hari).
5. Jika gagal → tampil **state error** dengan tombol "Coba lagi".
6. Pengguna mencari kota lain → hasil lama diganti.

### 2.6 Kriteria Penerimaan Tingkat Produk
- [ ] Mengetik `Jakarta` dan memilih saran pertama menampilkan seluruh 6 informasi inti.
- [ ] Mengetik kata ngawur (mis. `asdfghjk`) menampilkan pesan "kota tidak ditemukan", bukan layar kosong atau crash.
- [ ] Mematikan koneksi lalu mencari menampilkan pesan error jaringan dan tombol coba lagi.
- [ ] Tampilan benar di 375px, 768px, dan 1280px.
- [ ] Dapat dioperasikan penuh dengan keyboard.

---

## 3. SRS (Software Requirements Specification)

### 3.1 Persyaratan Fungsional
| ID | Persyaratan |
|---|---|
| FR-01 | Sistem menyediakan input teks pencarian kota. Pencarian dipicu setelah pengguna berhenti mengetik 300 ms (debounce) dan panjang input ≥ 2 karakter. |
| FR-02 | Sistem memanggil API geocoding dan menampilkan maksimal 5 saran. Tiap saran menampilkan: nama kota, wilayah/provinsi (`admin1`), dan negara. |
| FR-03 | Pengguna dapat memilih saran dengan klik, atau dengan keyboard (panah atas/bawah + Enter). Tombol Escape menutup daftar saran. |
| FR-04 | Jika pengguna menekan Enter tanpa memilih saran, sistem memakai saran pertama. |
| FR-05 | Setelah kota dipilih, sistem mengambil data cuaca berdasarkan koordinat kota. |
| FR-06 | Sistem menampilkan: nama kota, wilayah, negara, tanggal dan jam lokal kota tersebut. |
| FR-07 | Sistem menampilkan suhu saat ini (dibulatkan ke bilangan bulat, satuan °C). |
| FR-08 | Sistem menampilkan kondisi cuaca dalam teks Bahasa Indonesia dan ikon, berdasarkan weather code (Bagian 3.4) dan status siang/malam. |
| FR-09 | Sistem menampilkan kelembapan udara dalam persen. |
| FR-10 | Sistem menampilkan kecepatan angin dalam km/jam. |
| FR-11 | Sistem menampilkan suhu terasa seperti (°C). |
| FR-12 | Sistem menampilkan prakiraan 7 hari: nama hari (Bahasa Indonesia, "Hari ini" untuk hari pertama), ikon kondisi, suhu maks dan min, peluang hujan (%). |
| FR-13 | Sistem menampilkan state loading (skeleton) selama permintaan berjalan. |
| FR-14 | Jika geocoding mengembalikan nol hasil, sistem menampilkan pesan "Kota tidak ditemukan" beserta saran memeriksa ejaan. |
| FR-15 | Jika permintaan gagal (jaringan/timeout/HTTP error), sistem menampilkan pesan error dan tombol "Coba lagi" yang mengulang permintaan terakhir. |
| FR-16 | Permintaan yang sudah tidak relevan (pengguna mengetik/memilih kota lain) harus dibatalkan (`AbortController`) agar tidak terjadi *race condition*. |
| FR-17 | Footer menampilkan atribusi: "Data cuaca oleh Open-Meteo.com" dengan tautan ke https://open-meteo.com. |
| FR-18 *(Should)* | Riwayat 5 kota terakhir disimpan di `localStorage` dan tampil sebagai chip yang bisa diklik. Kegagalan akses `localStorage` tidak boleh merusak aplikasi (bungkus `try/catch`). |
| FR-19 *(Should)* | Tema gelap/terang mengikuti `prefers-color-scheme` dan dapat di-toggle manual; pilihan disimpan. |
| FR-20 *(Should)* | Toggle °C/°F melakukan konversi di sisi klien (tanpa memanggil ulang API). Rumus: `F = C × 9/5 + 32`. |

### 3.2 Persyaratan Non-Fungsional
| ID | Kategori | Persyaratan |
|---|---|---|
| NFR-01 | Performa | Initial JS bundle (gzip) ≤ 150 KB. Tidak ada library besar yang tidak perlu. |
| NFR-02 | Performa | Hasil cuaca tampil ≤ 2 detik pada jaringan normal. |
| NFR-03 | Responsif | Mobile-first. Didukung lebar 360px s.d. 1440px+. |
| NFR-04 | Aksesibilitas | Target WCAG 2.1 AA: kontras warna memadai, label pada input, `aria-live` untuk perubahan hasil/error, fokus terlihat, navigasi keyboard penuh, `alt`/`aria-label` pada ikon bermakna. |
| NFR-05 | Kompatibilitas | Versi terbaru Chrome, Edge, Firefox, Safari. |
| NFR-06 | Keamanan | Tidak ada API key atau rahasia di repo. Semua teks dari API dirender sebagai teks (hindari `dangerouslySetInnerHTML`). Semua URL API di-encode dengan benar. |
| NFR-07 | Bahasa | Seluruh antarmuka dalam Bahasa Indonesia. Format angka dan tanggal memakai locale `id-ID`. |
| NFR-08 | Keandalan | Tidak ada *unhandled promise rejection*. Semua jalur error punya tampilan. |
| NFR-09 | Maintainability | TypeScript strict mode. Logika API dan logika UI dipisah (Bagian 6). |

### 3.3 Kontrak API Eksternal (Open-Meteo, tanpa API key)

> Agent: sebelum menulis kode pemanggilan, **verifikasi** nama parameter terhadap dokumentasi resmi (https://open-meteo.com/en/docs dan https://open-meteo.com/en/docs/geocoding-api). Jika ada perbedaan dengan contoh di bawah, ikuti dokumentasi resmi.

**A. Geocoding (nama kota → koordinat)**
```
GET https://geocoding-api.open-meteo.com/v1/search
    ?name={query}&count=5&language=id&format=json
```
Respons (disederhanakan):
```json
{
  "results": [
    {
      "id": 1642911,
      "name": "Jakarta",
      "latitude": -6.17,
      "longitude": 106.83,
      "country": "Indonesia",
      "country_code": "ID",
      "admin1": "Jakarta",
      "timezone": "Asia/Jakarta"
    }
  ]
}
```
Catatan: jika tidak ada hasil, properti `results` **tidak ada** dalam respons (bukan array kosong). Tangani kasus ini.

**B. Prakiraan cuaca**
```
GET https://api.open-meteo.com/v1/forecast
    ?latitude={lat}&longitude={lon}
    &current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day
    &daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max
    &timezone=auto
    &forecast_days=7
```
Respons (disederhanakan):
```json
{
  "timezone": "Asia/Jakarta",
  "current": {
    "time": "2026-11-06T14:00",
    "temperature_2m": 31.4,
    "relative_humidity_2m": 68,
    "apparent_temperature": 36.2,
    "weather_code": 3,
    "wind_speed_10m": 11.5,
    "is_day": 1
  },
  "current_units": { "temperature_2m": "°C", "wind_speed_10m": "km/h" },
  "daily": {
    "time": ["2026-11-06", "..."],
    "weather_code": [3, "..."],
    "temperature_2m_max": [33.1, "..."],
    "temperature_2m_min": [25.0, "..."],
    "precipitation_probability_max": [40, "..."]
  }
}
```
Catatan: karena `timezone=auto`, `current.time` sudah dalam waktu lokal kota. Tampilkan jam lokal kota dari nilai ini, **bukan** dari jam perangkat pengguna. Satuan default: °C dan km/jam.

### 3.4 Pemetaan Weather Code (WMO) → Teks dan Ikon

Simpan sebagai satu sumber kebenaran di `src/lib/weatherCodes.ts`.

| Kode | Teks Bahasa Indonesia | Kelompok ikon |
|---|---|---|
| 0 | Cerah | `clear` (siang: matahari, malam: bulan) |
| 1 | Cerah berawan | `partly-cloudy` |
| 2 | Berawan sebagian | `partly-cloudy` |
| 3 | Berawan tebal | `cloudy` |
| 45, 48 | Berkabut | `fog` |
| 51, 53, 55 | Gerimis | `drizzle` |
| 56, 57 | Gerimis beku | `drizzle` |
| 61 | Hujan ringan | `rain` |
| 63 | Hujan sedang | `rain` |
| 65 | Hujan lebat | `rain-heavy` |
| 66, 67 | Hujan beku | `rain` |
| 71, 73, 75, 77 | Salju | `snow` |
| 80 | Hujan lokal ringan | `rain` |
| 81 | Hujan lokal sedang | `rain` |
| 82 | Hujan lokal deras | `rain-heavy` |
| 85, 86 | Hujan salju lokal | `snow` |
| 95 | Badai petir | `thunderstorm` |
| 96, 99 | Badai petir disertai hujan es | `thunderstorm` |
| lainnya | Tidak diketahui | `unknown` |

### 3.5 Model Data (TypeScript)
```ts
export interface City {
  id: number;
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  time: string;              // ISO lokal kota
  temperature: number;       // °C
  feelsLike: number;         // °C
  humidity: number;          // %
  windSpeed: number;         // km/jam
  weatherCode: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;              // YYYY-MM-DD
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitationProbability: number | null; // %
}

export interface WeatherReport {
  city: City;
  current: CurrentWeather;
  daily: DailyForecast[];
}
```

### 3.6 State Aplikasi
Status utama tampilan hasil memakai *discriminated union*:
```ts
type ViewState =
  | { status: 'idle' }                                  // tampilan awal
  | { status: 'loading'; city: City }
  | { status: 'success'; report: WeatherReport }
  | { status: 'not-found'; query: string }              // geocoding kosong
  | { status: 'error'; message: string; retry: () => void };
```
Transisi: `idle → loading → success | error`, dan `idle/success/error → not-found` saat pencarian tanpa hasil.

### 3.7 Penanganan Error
| Situasi | Perilaku |
|---|---|
| Geocoding tanpa hasil | `not-found` dengan teks: "Kota "{query}" tidak ditemukan. Coba periksa ejaan atau cari nama kota lain." |
| Tidak ada koneksi / `fetch` gagal | `error`: "Tidak bisa terhubung. Periksa koneksi internet kamu." + tombol "Coba lagi" |
| HTTP 429 (terlalu banyak permintaan) | `error`: "Terlalu banyak permintaan. Tunggu sebentar lalu coba lagi." |
| HTTP 5xx | `error`: "Layanan cuaca sedang bermasalah. Coba lagi nanti." |
| Respons tidak sesuai bentuk yang diharapkan | `error` umum; jangan crash. Log detail ke `console.error` saat mode development. |
| Permintaan dibatalkan (`AbortError`) | Abaikan, bukan error. |
| Timeout (> 10 detik) | Batalkan dan tampil error jaringan. |

---

## 4. Spesifikasi UI/UX

> Sumber kebenaran visual adalah **desain di Google Stitch**. Bagian ini mendefinisikan maksud dan struktur agar agent paham alur, dan sebagai cadangan bila detail desain kurang jelas.

### 4.1 Arah Visual
Modern, bersih, ringan. Kartu bersudut membulat dengan efek kaca halus (glassmorphism ringan) di atas latar gradien yang menyesuaikan kondisi cuaca. Fokus pada satu angka besar (suhu). Nuansa ramah, tidak ramai.

### 4.2 Design Tokens (acuan, boleh disesuaikan dengan Stitch)
| Token | Terang | Gelap |
|---|---|---|
| Latar halaman | gradien `#DBEAFE` → `#F8FAFC` | gradien `#0B1220` → `#1E293B` |
| Permukaan kartu | `rgba(255,255,255,0.7)` + blur | `rgba(30,41,59,0.6)` + blur |
| Teks utama | `#0F172A` | `#F1F5F9` |
| Teks sekunder | `#475569` | `#94A3B8` |
| Aksen utama | `#2563EB` | `#60A5FA` |
| Aksen hangat (matahari) | `#F59E0B` | `#FBBF24` |
| Error | `#DC2626` | `#F87171` |
| Radius kartu | 24px | 24px |
| Radius input/chip | 9999px (pill) | 9999px |
| Font | Plus Jakarta Sans (fallback: Inter, system-ui, sans-serif) | sama |

Skala tipografi: suhu utama 72px/800 (mobile 64px), judul kota 28px/700, label kecil 12px/600 huruf kapital, teks isi 16px/400.

Latar dinamis (F-11, opsional): `clear-day` biru cerah→kuning lembut; `cloudy` abu kebiruan; `rain` biru keabuan gelap; `thunderstorm` ungu gelap; `night` navy→hitam kebiruan.

### 4.3 Daftar Layar / State
| Kode | Layar | Isi utama |
|---|---|---|
| S-01 | Tampilan awal (idle) | Judul, kolom pencarian besar di tengah, chip kota contoh, ilustrasi cuaca ringan |
| S-02 | Saran pencarian | Dropdown di bawah input: ≤ 5 item (nama kota tebal, wilayah + negara abu) |
| S-03 | Loading | Skeleton untuk hero card, 3 kartu statistik, dan 7 baris prakiraan |
| S-04 | Hasil cuaca | Lihat 4.4 |
| S-05 | Kota tidak ditemukan | Ilustrasi + pesan + saran + input tetap aktif |
| S-06 | Error | Ikon peringatan + pesan + tombol "Coba lagi" |
| S-07 | Varian mobile (375px) dari S-01, S-04, S-06 | Satu kolom |
| S-08 | Varian gelap dari S-04 | Token mode gelap |

### 4.4 Tata Letak Layar Hasil (S-04)
**Desktop (≥ 1024px)**: lebar konten maks 1100px, tengah.
```
┌──────────────────────────────────────────────────────────┐
│ Logo/Nama app            [ 🔍 Cari kota...        ]  [🌙] │  ← Header
├──────────────────────────────────────────────────────────┤
│ ┌───────────────────────────┐ ┌────────────────────────┐ │
│ │ HERO CARD                 │ │ Kelembapan      68%    │ │
│ │ Jakarta, DKI Jakarta      │ ├────────────────────────┤ │
│ │ Jumat, 6 Nov · 14.00      │ │ Angin       11,5 km/j  │ │
│ │ [ikon]  31°               │ ├────────────────────────┤ │
│ │ Berawan tebal             │ │ Terasa seperti   36°   │ │
│ └───────────────────────────┘ └────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │ Prakiraan 7 Hari                                     │ │
│ │ Hari ini  [ikon]  Berawan tebal   40%   25° ━━ 33°   │ │
│ │ Sabtu     [ikon]  Hujan ringan    70%   24° ━━ 30°   │ │
│ │ ...                                                  │ │
│ └──────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────┤
│ Data cuaca oleh Open-Meteo.com                           │  ← Footer
└──────────────────────────────────────────────────────────┘
```
**Mobile (< 768px)**: satu kolom berurutan: header + pencarian → hero card → 3 kartu statistik (grid 3 kolom kecil atau tumpuk) → prakiraan 7 hari (daftar vertikal) → footer.

### 4.5 Komponen
| Komponen | Tanggung jawab |
|---|---|
| `Header` | Nama app, `SearchBar`, toggle tema |
| `SearchBar` | Input, dropdown saran, navigasi keyboard, ARIA combobox |
| `RecentChips` *(Should)* | Chip riwayat/kota contoh |
| `CurrentWeatherCard` | Nama kota, tanggal/jam, suhu besar, ikon, kondisi |
| `StatCard` | Satu statistik (ikon, label, nilai). Dipakai untuk kelembapan, angin, terasa seperti |
| `ForecastList` / `ForecastRow` | 7 hari prakiraan |
| `WeatherIcon` | Memilih ikon dari kelompok ikon + `isDay` |
| `SkeletonResult` | State loading |
| `EmptyState`, `NotFoundState`, `ErrorState` | State S-01, S-05, S-06 |
| `Footer` | Atribusi |

### 4.6 Teks UI (Bahasa Indonesia)
- Judul: "Cuaca Kita"
- Placeholder pencarian: "Cari kota, mis. Jakarta"
- Label: "Kelembapan", "Angin", "Terasa seperti", "Prakiraan 7 Hari", "Peluang hujan"
- Tombol: "Coba lagi"
- Empty: "Mau cek cuaca di mana hari ini?"

### 4.7 Interaksi dan Aksesibilitas
- Input memakai pola ARIA combobox (`role="combobox"`, `aria-expanded`, `aria-controls`, `aria-activedescendant`), daftar `role="listbox"`.
- Area hasil dibungkus `aria-live="polite"`; error memakai `role="alert"`.
- Fokus otomatis kembali ke area hasil/judul kota setelah data tampil.
- Hormati `prefers-reduced-motion`: matikan animasi non-esensial.
- Target sentuh minimal 44×44px.

---

## 5. Rangkuman Keputusan Teknis
| Aspek | Keputusan |
|---|---|
| Framework | React 18+ dengan Vite |
| Bahasa | TypeScript (strict) |
| Styling | Tailwind CSS |
| Ikon | `lucide-react` untuk ikon UI. Ikon cuaca: SVG sendiri atau dari Lucide (Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudSun) |
| Data fetching | `fetch` bawaan + `AbortController` (tanpa library tambahan) |
| State | Hook React bawaan (`useState`, `useReducer`, custom hooks) |
| Pengujian | Vitest + React Testing Library (untuk logika murni dan komponen kunci) |
| Deploy (rekomendasi) | Vercel atau Netlify (static hosting) |

---

## 6. Arsitektur dan Struktur Folder
```
cuaca-kita/
├─ AGENTS.md                  # salin ringkas Bagian 9 dokumen ini
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ tailwind.config.ts
└─ src/
   ├─ main.tsx
   ├─ App.tsx
   ├─ index.css
   ├─ types/
   │  └─ weather.ts           # City, CurrentWeather, DailyForecast, WeatherReport
   ├─ api/
   │  ├─ http.ts              # wrapper fetch: timeout, AbortSignal, pemetaan error
   │  ├─ geocoding.ts         # searchCities(query, signal)
   │  └─ weather.ts           # getWeather(city, signal) → WeatherReport
   ├─ lib/
   │  ├─ weatherCodes.ts      # tabel WMO → {label, iconGroup}
   │  ├─ format.ts            # format suhu, tanggal, hari (id-ID), konversi °C/°F
   │  └─ storage.ts           # akses localStorage yang aman (try/catch)
   ├─ hooks/
   │  ├─ useDebouncedValue.ts
   │  ├─ useCitySearch.ts     # debounce + abort + hasil saran
   │  ├─ useWeather.ts        # mengelola ViewState
   │  └─ useTheme.ts
   └─ components/
      ├─ layout/ (Header, Footer)
      ├─ search/ (SearchBar, SuggestionList, RecentChips)
      ├─ weather/ (CurrentWeatherCard, StatCard, ForecastList, ForecastRow, WeatherIcon)
      └─ states/ (EmptyState, NotFoundState, ErrorState, SkeletonResult)
```
Prinsip: komponen UI **tidak memanggil `fetch` langsung**. Semua pemanggilan API lewat `src/api/*`, dipanggil dari hooks. Fungsi di `src/lib/*` harus murni (mudah diuji).

---

## 7. Fitur Tambahan: Catatan Implementasi Singkat
- **Riwayat (F-07)**: simpan array `City` (maks 5, tanpa duplikat berdasarkan `id`, terbaru di depan) di kunci `cuacakita:recent`.
- **Tema (F-08)**: simpan di kunci `cuacakita:theme` (`light` | `dark` | `system`). Terapkan lewat class `dark` pada elemen `<html>`.
- **Satuan (F-09)**: simpan di kunci `cuacakita:unit`. Nilai dari API selalu disimpan dalam °C; konversi hanya saat render.
- **Lokasi saya (F-10)**: pakai `navigator.geolocation`. API tidak menyediakan reverse geocoding, jadi tampilkan label "Lokasi Saya" dengan koordinat. Tangani penolakan izin dengan pesan ramah.
- **URL (F-12)**: sinkronkan `?q=` dengan kota terpilih; saat halaman dibuka dengan `?q=`, jalankan pencarian otomatis dan pilih hasil pertama.

---

## 8. Strategi Pengujian
**Uji unit (Vitest)**
- `weatherCodes`: setiap kode di tabel 3.4 memetakan ke teks dan ikon yang benar; kode tak dikenal → `unknown`.
- `format`: pembulatan suhu, konversi °C→°F, nama hari "Hari ini"/"Sabtu"/dst., format tanggal `id-ID`.
- `api/weather` dan `api/geocoding`: pemetaan respons API → model internal, termasuk kasus `results` tidak ada.
- `useWeather`/`useCitySearch`: transisi state, pembatalan permintaan lama.

**Uji manual (checklist)**
- [ ] Cari `Jakarta`, `Bandung`, `New York`, `Tokyo`: data tampil benar.
- [ ] Cari kota kembar (mis. `Springfield`): saran membedakan wilayah dengan jelas.
- [ ] Cari `asdfghjk`: state not-found.
- [ ] Mode pesawat/offline: state error + "Coba lagi" berfungsi.
- [ ] Throttle jaringan "Slow 3G": skeleton tampil, tidak ada layar kosong.
- [ ] Ketik cepat lalu ganti kota: tidak ada hasil kota lama yang menimpa kota baru.
- [ ] Navigasi keyboard penuh dan pembaca layar membacakan hasil.
- [ ] Viewport 360, 375, 768, 1024, 1440 tanpa scroll horizontal.
- [ ] Mode gelap dan terang sama-sama terbaca (kontras).

---

## 9. AGENTS.md: Aturan untuk AI Agent

### Peran
Kamu adalah agent pengembang untuk proyek "Cuaca Kita". Ikuti dokumen ini. Utamakan kode yang sederhana, terbaca, dan sesuai desain.

### Yang HARUS dilakukan
- Gunakan TypeScript strict. Hindari `any`; pakai tipe di `src/types/weather.ts`.
- Pisahkan lapisan: `api` (jaringan) → `hooks` (state) → `components` (tampilan).
- Selalu gunakan `AbortController` untuk permintaan yang bisa tumpang tindih.
- Seluruh teks antarmuka berbahasa Indonesia; kode, nama variabel, dan komentar teknis boleh berbahasa Inggris.
- Tangani **semua** state: idle, loading, success, not-found, error.
- Tambahkan atribusi Open-Meteo di footer.
- Ikuti desain Stitch untuk aspek visual. Ambil lewat MCP Stitch.
- Jalankan `npm run build`, `npm run lint`, dan `npm test` sebelum menyatakan milestone selesai.
- Commit kecil dan bermakna per milestone (mis. `feat: add city search with debounce`).

### Yang DILARANG
- Menambah backend, database, atau library besar tanpa izin user.
- Menaruh API key/rahasia di kode (API ini memang tidak membutuhkannya).
- Memakai `dangerouslySetInnerHTML` untuk data dari API.
- Menyalin kode HTML mentah dari Stitch ke proyek tanpa diadaptasi menjadi komponen React yang terstruktur.
- Mengubah perilaku/ruang lingkup yang ada di dokumen ini tanpa memberi tahu user.
- Mengarang data cuaca. Jika API gagal, tampilkan error, bukan data palsu.

### Gaya Kode
- Komponen fungsional + hooks. Satu komponen satu file, nama `PascalCase`.
- Komponen kecil dan fokus (idealnya < 120 baris).
- Tailwind untuk styling; hindari CSS inline kecuali nilai dinamis.
- Gunakan *named export* untuk komponen/fungsi, kecuali `App`.

### Skrip `package.json` yang diharapkan
`dev`, `build`, `preview`, `lint`, `test`.

### Jika Ragu
Berhenti dan tanya user. Lebih baik satu pertanyaan singkat daripada asumsi yang salah.

---

## 10. Rencana Tugas (Milestone)

### M0: Setup
- Buat proyek Vite + React + TS, pasang Tailwind, ESLint, Vitest.
- Atur struktur folder (Bagian 6) dan font.
- **Selesai bila**: `npm run dev` menampilkan halaman kosong tanpa error; `build` dan `test` jalan.

### M1: Fondasi Data
- Tulis `types`, `api/http.ts`, `api/geocoding.ts`, `api/weather.ts`, `lib/weatherCodes.ts`, `lib/format.ts` beserta uji unitnya.
- **Selesai bila**: uji unit lulus; pemanggilan manual `getWeather` untuk Jakarta mengembalikan `WeatherReport` valid.

### M2: Pencarian
- `useDebouncedValue`, `useCitySearch`, `SearchBar`, `SuggestionList` (termasuk keyboard + ARIA).
- **Selesai bila**: mengetik 2+ karakter memunculkan ≤ 5 saran; Enter/klik memilih kota; tidak ada *race condition*.

### M3: Tampilan Cuaca (sesuai Stitch)
- Ambil desain Stitch via MCP. Bangun `CurrentWeatherCard`, `StatCard`, `ForecastList`, `WeatherIcon`, `Header`, `Footer`.
- Hubungkan dengan `useWeather` (ViewState).
- **Selesai bila**: 6 informasi inti tampil benar dan layout cocok desain di desktop.

### M4: State, Responsif, Aksesibilitas
- `SkeletonResult`, `EmptyState`, `NotFoundState`, `ErrorState`.
- Penyesuaian mobile (375px) dan tablet (768px).
- Audit aksesibilitas (Bagian 4.7).
- **Selesai bila**: semua checklist Bagian 2.6 dan 8 lulus.

### M5: Fitur Tambahan (opsional, sesuai prioritas Should/Could)
- Riwayat, tema gelap/terang, toggle °C/°F, URL `?q=`, geolocation, latar dinamis.

### M6: Rilis
- Optimasi (cek ukuran bundle dan Lighthouse), tulis `README.md` (deskripsi, cara menjalankan, tangkapan layar, kredit data), deploy ke Vercel/Netlify.
- **Selesai bila**: URL publik berfungsi dan README lengkap.

---

## 11. Checklist Pencocokan UI dengan Desain Stitch
Setelah M3 dan M4, agent mencocokkan hasil dengan Stitch:
- [ ] Palet warna, gradien latar, dan efek kartu sesuai.
- [ ] Font, ukuran, dan bobot teks sesuai (terutama angka suhu besar).
- [ ] Jarak antar elemen, radius sudut, dan bayangan sesuai.
- [ ] Susunan elemen (hero card, kartu statistik, prakiraan) sesuai di desktop dan mobile.
- [ ] Ikon cuaca konsisten gayanya.
- [ ] Semua state (S-01 s.d. S-08) ada dan mirip desain.
- [ ] Mode gelap sesuai desain.
- [ ] Daftar perbedaan yang sengaja dibuat (jika ada) dicatat beserta alasannya.

---

## 12. Glosarium
| Istilah | Arti |
|---|---|
| Feels like / Suhu terasa seperti | Suhu yang dirasakan tubuh (menggabungkan suhu, kelembapan, angin) |
| WMO weather code | Kode standar angka yang mewakili kondisi cuaca |
| Geocoding | Mengubah nama tempat menjadi koordinat lintang/bujur |
| Debounce | Menunda eksekusi sampai pengguna berhenti mengetik beberapa saat |
| Skeleton | Kerangka abu-abu sementara saat data dimuat |
| MCP | Model Context Protocol; cara agent terhubung ke alat/layanan eksternal (di sini: Google Stitch) |
