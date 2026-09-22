// ==== TEMPEL SELURUH KODE INI DI GOOGLE APPS SCRIPT ====
// Extensions > Apps Script, hapus kode bawaan, tempel ini, lalu Deploy.
//
// Sheet harus punya kolom persis seperti ini (baris 1 = judul kolom,
// data mulai baris 2):
// A: Kelas | B: Mata Pelajaran | C: Link Google Form | D: Mulai | E: Selesai | F: Aktif
//
// Kolom "Mulai" dan "Selesai" diisi tanggal+jam, misalnya 25/09/2026 07:00
// Kolom "Aktif" berupa checkbox (centang) -- kosongkan centang untuk
// menyembunyikan satu baris tanpa perlu menghapusnya.

var SHEET_NAME = 'Soal'; // ganti jika nama tab sheet Anda berbeda

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  var rows = sheet.getDataRange().getValues();
  var now = new Date();
  var data = [];

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var kelas = row[0];
    var mapel = row[1];
    var link = row[2];
    var mulai = new Date(row[3]);
    var selesai = new Date(row[4]);
    var aktif = row[5];

    if (!kelas || !mapel || !link) continue;
    if (aktif === false) continue;

    var status = 'belum';
    if (now >= mulai && now <= selesai) status = 'berlangsung';
    else if (now > selesai) status = 'selesai';

    data.push({
      kelas: kelas,
      mapel: mapel,
      mulai: mulai.toISOString(),
      selesai: selesai.toISOString(),
      status: status,
      // Ini bagian intinya: link Google Form HANYA disertakan kalau
      // status sedang "berlangsung". Di luar jam itu, link tidak pernah
      // keluar dari server -- jadi tidak bisa diintip dari luar jadwal,
      // apa pun browser atau alat yang dipakai siswa untuk mencoba.
      link: (status === 'berlangsung') ? link : null
    });
  }

  var output = ContentService.createTextOutput(
    JSON.stringify({ data: data, server_time: now.toISOString() })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
