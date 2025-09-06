Brutal Rental — Static Website

Situs statis untuk sewa motor & mobil (Brutal Rental). Dibangun dengan HTML + CSS + JavaScript murni, tanpa framework, siap di‑hosting pada layanan static hosting (cPanel/Domainesia, GitHub Pages, Netlify, Vercel static, dll.).

**Fitur**
- Responsif + burger menu: navigasi otomatis menjadi tombol burger pada layar kecil; panel menu dapat ditutup dengan klik di luar, klik link, atau tombol Esc.
- Katalog interaktif: kartu rapi dan seragam, filter transmisi, opsi gratis antar, dan slider batas harga.
- Booking dinamis: picker rentang tanggal 2 bulan, input jam ambil/kembali, perhitungan durasi berbasis 24 jam per hari.
- WhatsApp integrasi: pesan WA otomatis terisi (unit, tanggal, waktu, opsi antar, total estimasi).
- Fasilitas motor: untuk unit bertipe `motor`, otomatis menampilkan fasilitas “Termasuk 2 helm” dan “Termasuk jas hujan”.
- Diskon dinonaktifkan: mekanisme diskon otomatis disiapkan namun nonaktif secara default (mudah diaktifkan kembali lewat satu baris kode).

**Struktur Proyek**
- `index.html` — Beranda (hero, pencarian cepat, CTA).
- `katalog.html` — Katalog unit + filter.
- `booking.html` — Form booking + kalender rentang tanggal + ringkasan harga.
- `keunggulan.html`, `testimoni.html`, `faq.html` — Halaman konten pendukung.
- `assets/style.css` — Style dasar dan tema (variabel warna, layout umum).
- `assets/overrides.css` — Penyesuaian responsif, ukuran komponen kartu, burger menu, utilitas kecil.
- `assets/app.js` — Seluruh interaksi: render katalog, filter, burger menu, kalender booking, perhitungan harga, kirim WA, carousel testimoni.
- `assets/img/` — Aset gambar (logo, unit, ikon sosial, dsb.).

**Jalankan Secara Lokal**
- Tidak butuh build. Cukup buka `index.html` langsung di browser, atau gunakan server lokal agar path konsisten:
  - Python: `python -m http.server 5500` lalu buka `http://localhost:5500/index.html`
  - VS Code: gunakan ekstensi Live Server (klik “Go Live”).

**Deploy ke Domainesia (cPanel)**
- Buka cPanel → File Manager.
- Upload seluruh isi repo ke folder `public_html/` (atau subdomain root yang dipakai).
- Pastikan struktur: `index.html` berada di root, folder `assets/` ikut ter‑upload.
- Akses domain Anda untuk verifikasi.

**Deploy ke GitHub Pages**
- Buat repository di GitHub dan push seluruh file.
- Settings → Pages → Build and deployment → Source: `Deploy from a branch`.
- Branch: `main`, Folder: `/root` (atau `/docs` bila Anda memindahkan file ke folder `docs`).
- Simpan dan tunggu URL Pages aktif.

**Kustomisasi Penting**
- Ubah nomor WhatsApp: cari `wa.me/6282141642703` di project lalu ganti dengan nomor Anda.
- Tambah/hapus unit: edit array `bikes` pada `assets/app.js`.
  - Setiap entri: `id`, `type` (`'motor'`/`'mobil'`), `name`, `price` (dalam ribuan), `gear`, `cc`, `fuel`, `img`, `rating`, `delivery`.
- Aktifkan diskon otomatis: di `assets/app.js` dalam `updatePrice()` ubah `const discRate = 0;` menjadi `const discRate = days>=7 ? 0.15 : days>=3 ? 0.05 : 0;`.
- Ubah tema/warna: variabel warna ada pada `:root` di `assets/style.css`.
- Jumlah kolom kartu: atur di `.cards` (`grid-template-columns`) dan breakpoint pada CSS.

**Catatan Teknis**
- Enkoding file: semua file UTF‑8. Jika muncul karakter aneh (�), pastikan editor membuka sebagai UTF‑8.
- Perhitungan durasi: 24 jam = 1 hari berbasis selisih tanggal (6 Sep → 7 Sep = 1 hari).
- Aksesibilitas minimum: tombol, link, dan dialog memiliki label; Esc untuk menutup menu/dialog.

**Lisensi**
- Proyek privat untuk kebutuhan Brutal Rental.

**Kontribusi**
- Silakan buat PR untuk perbaikan bug kecil atau ajukan issue disertai screenshot + langkah reproduksi.

