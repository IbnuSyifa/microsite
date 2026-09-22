// Satu-satunya file yang biasanya perlu diubah untuk operasional sehari-hari.
const CONFIG = {
  // Tempel URL Web App dari Apps Script di sini (lihat SETUP.md langkah 4)
  API_URL: "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnQsdjy0WnKiIPuQvGsdJHmNAY-_2hz2sdFhkYl7AukOrPuSpbTxNGRh-fjlDW3BNFFrH2wFjGUTFhhyqHjVrEj-l9XCtLpzEExncoAT5IoCLWpjGD9Ko0LFQsjvkPuLkea_r3PniDrgWFfmjLgEV0enKLqUDTn28Od00OdG_6tBcS_f0VMjO0Ab9fkssMH7cZOLg70H_SwVeI3ltKwS351x2B99iM8IwKNV7rJ4p-F1hlXiOf9e3sVKBMIPzxr2vcB67yKWaeEDBY4ulDR0X3OHXzKTeQ&lib=MmleGX1rvo7Lol8hZM-BYbpgUCQBCoQxv",

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
  REQUIRE_SEB: true
};
