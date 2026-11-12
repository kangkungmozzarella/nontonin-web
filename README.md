# Nontonin Web

Situs pemesanan tiket bioskop untuk desktop dengan **pratinjau kursi 3D**. Arahkan kursor ke kursi mana pun di denah, kamera langsung terbang ke kursi itu, dan kamu melihat layar dari sudut pandang tersebut sebelum membayar.

Ini versi web dari aplikasi mobile [Nontonin](https://github.com/kangkungmozzarella/nontonin). Logika bioskop, jadwal, harga, dan scene 3D-nya sama, tapi tampilannya dibuat khusus untuk layar lebar.

Dibuat dengan Next.js 16 (pages router), React 18, Mantine 7, vanilla-extract, react-query, i18next, dan Three.js (`@react-three/fiber`). Struktur folder dan pola kodenya mengikuti kurosim-webapp.

## Menjalankan

```bash
cp .env.local.example .env.local   # lalu isi TMDB_TOKEN
bun install
bun dev                    # http://localhost:3100
bun run build && bun start # build produksi
bun ts-check
bun lint
bun check-missing-locale   # pastikan kunci teks id dan en sama
```

### Data film dari TMDB

Film sedang tayang dan segera tayang diambil dari [TMDB](https://www.themoviedb.org) untuk wilayah Indonesia.

- Buat **API Read Access Token** di https://www.themoviedb.org/settings/api, lalu simpan di `.env.local` sebagai `TMDB_TOKEN`.
- Token hanya dipakai di server, lewat proxy `src/pages/api/tmdb/[...path].ts`, jadi tidak pernah sampai ke browser. Proxy itu hanya meneruskan endpoint yang dipakai katalog.
- Tanpa token, situs otomatis memakai film demo fiktif bawaan.
- Bioskop, jadwal tayang, dan pembayaran tetap tiruan karena TMDB tidak menyediakan jadwal bioskop. Tiket tersimpan di localStorage browser.

## Halaman

| Rute | Isi |
|---|---|
| `/` | Hero film, sedang tayang, penjelasan pratinjau 3D, segera tayang, bioskop di kotamu |
| `/films` | Semua film, tab sedang tayang dan segera tayang |
| `/films/[id]` | Detail film dan jadwal per bioskop untuk 7 hari |
| `/cinemas`, `/cinemas/[id]` | Bioskop di kota terpilih (urut jarak kalau lokasi diizinkan) dan jadwalnya |
| `/seat/[showtimeId]` | Denah kursi di kiri, pratinjau 3D di kanan. `?view=1` menampilkan pandangan dari kursi yang sudah dibeli |
| `/checkout/[showtimeId]` | Metode pembayaran dan ringkasan pesanan |
| `/tickets`, `/tickets/[id]` | Daftar tiket dan tiket dengan QR (bisa dicetak) |
| `/profile` | Profil tamu: ringkasan tiket, kota, bahasa, metode pembayaran favorit, hapus data demo |
| `/about` | Kredit desain dan atribusi TMDB |

## Struktur

```
locales/{id,en}/*.json   teks per namespace (common, home, booking, account, layout)
src/
  pages/                 rute Next.js, tiap file hanya membungkus modul
  modules/<fitur>/       layar per fitur (index.tsx) beserta components/ dan styles.css.ts
  modules/components/    potongan UI yang dipakai beberapa fitur (kartu poster, strip tanggal, jam tayang)
  modules/seat/theater/  scene Three.js, kamera, dan canvas 3D
  api-hooks/<domain>/    model + query/mutation react-query
  common/
    api/                 katalog film (TMDB atau demo), klien fetch, mock server
    theater/             geometri studio dan analisis kualitas kursi
    routes/              enum rute dan parameter bertipe
    styles/              token warna, ukuran, breakpoint
    config.ts            satu-satunya tempat membaca env
  components/            layout aplikasi, header, footer, pemilih kota, state view
  hooks/                 kota, lokasi, bahasa, tiket, navigasi
  styles/                tema vanilla-extract dan Mantine
```

## Lisensi

Kode memakai lisensi [MIT](LICENSE). Lisensi itu tidak mencakup data dan gambar film dari TMDB, yang tetap tunduk pada ketentuan TMDB. Konsep UI/UX terinspirasi dari "Meridian" karya Ramin Nasibov.
