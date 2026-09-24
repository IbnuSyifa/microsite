// Satu-satunya file yang biasanya perlu diubah untuk operasional sehari-hari.
const CONFIG = {
  // Tempel URL Web App dari Apps Script di sini (lihat SETUP.md langkah 4)
  API_URL: "https://script.google.com/macros/s/AKfycbwloQLM0TRSn3hqeQvcvZv1wcZiq7e6dBdyNZnwo1ZkswYTaHeGijaQEUxI0yeM6bgF/exec",

  // Nama sekolah, tampil di judul halaman
  SCHOOL_NAME: "SMAIT Al Haraki",

  // Seberapa sering halaman mengambil data terbaru (dalam milidetik)
  REFRESH_INTERVAL_MS: 30000,

  // Jika true, halaman menolak tampil di luar Safe Exam Browser.
  // PENTING: ini bukan sistem keamanan yang tidak bisa ditembus -- ini
  // pengecekan di sisi browser (bisa dilewati siswa yang mengubah
  // pengaturan browser). Ini hanya mencegah kesalahan biasa (siswa lupa
  // pakai SEB). Perlindungan yang sesungguhnya ada pada dua hal lain:
  // (1) link soal tidak pernah dikirim oleh server di luar jadwal, apa pun
  //     browser yang dipakai, dan (2) pengawas ruangan + pengaturan SEB itu
  //     sendiri yang mengunci perangkat siswa selama ujian berlangsung.
  REQUIRE_SEB: false
};
