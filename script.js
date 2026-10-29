/*  =====TOMBOL TEMA=====*/

// Pilih elemen
const tombol = document.querySelector("#tombol-tema");

// A. Fungsi penerap tema, dipakai di dua tempat
function terapkanTema(gelap) {

    if (gelap) {
        document.body.classList.add("dark");
        tombol.textContent = "☀️";
        tombol.setAttribute("aria-pressed", "true");
    } else {
        document.body.classList.remove("dark");
        tombol.textContent = "🌙";
        tombol.setAttribute("aria-pressed", "false");
    }
}

// B. Saat tombol diklik
tombol.addEventListener("click", function () {
  const sekarangGelap = document.body.classList.contains("dark");
  const berikutnya = !sekarangGelap;
  terapkanTema(berikutnya);

  if (berikutnya) {
    localStorage.setItem("tema", "gelap");
  } else {
    localStorage.setItem("tema", "terang");
  }
});

// C. Saat halaman pertama dimuat
const temaTersimpan = localStorage.getItem("tema");
if (temaTersimpan === "gelap") {
    terapkanTema(true);
}

/* ===== TOMBOL FILTER KARTU PROYEK===== */

// 1. PILIH: semua tombol filter dan semua kartu
const tombolFilter = document.querySelectorAll(".filter-btn");
const kartu = document.querySelectorAll(".card");

//2. FUNGSI: tampilkan hanya kartu yang cocok dengan tampilan
function terapkanFilter(pilihan) {
  kartu.forEach(function (k) {
    // k.dataset.teknologi = isi atribut data-teknologi, berupa teks
    const daftar = k.dataset.teknologi.split(" ");

    if (pilihan === "semua" || daftar.includes(pilihan)) {
      k.hidden = false;
    } else {
      k.hidden = true;
    }
  });
}

//3. DENGARKAN: setiap tombol filter diklik
tombolFilter.forEach(function (tombolIni) {
  tombolIni.addEventListener("click", function () {
    //a) Terapkan filter. Pilihannya tersimpan pada di atribut data-filter tombol.
    terapkanFilter(tombolIni.dataset.filter);

    //b) Perbarui tampilan tombol: hanya satu kali "aktif"
    tombolFilter.forEach(function (t) {
      t.classList.remove("aktif");
      t.setAttribute("aria-pressed", "false");
    });
    tombolIni.classList.add("aktif");
    tombolIni.setAttribute("aria-pressed", "true");
  });
});

/* =====FORM KONTAK=====*/

const form = document.querySelector("#form-kontak");
const inputNama = document.querySelector("#nama");
const inputEmail = document.querySelector("#email");
const inputPesan = document.querySelector("#pesan");
const statusForm = document.querySelector("#status-form");

// Fungsi bantu: tampilkan atau hapus pesan error di bawah sebuah kolom
function tampilkanError (input, pesan) {
  const elError =document.querySelector("#error-" + input.id);
  elError.textContent = pesan;
  input.setAttribute("aria-invalid", pesan ? "true" : "false");
}

form.addEventListener ("submit", function (e) {
  e.preventDefault(); //Jangan muat halaman
  statusForm.textContent = "";
  let valid = true; //anggap benar dulu, ubah jadi false jika ada yang salah

  // --Nama--
  const nama = inputNama.value.trim() 
  if (nama.length < 3) {
    tampilkanError(inputNama, "Nama minimal 2 karakter");
    valid = false;
  } else {
    tampilkanError(inputNama, "");
  }

  // Email harus mengandung "@" dan "."----
  const email =  inputEmail.value.trim();
  if (!email.includes("@") || !email.includes(".")) {
    tampilkanError(inputEmail, "Masukkan alamat email yang valid");
    valid = false;
  }
  else {
    tampilkanError(inputEmail, "");
  }

  // Pesan minimal 10 karakter
  const pesan = inputPesan.value.trim();
  if (pesan.length < 10) {
    tampilkanError(inputPesan, "Pesan minimal 10 karakter");
    valid = false;
  } else {
    tampilkanError(inputPesan, "");
  }

  // Hasil akhir
  if (valid) {
    statusForm.textContent = "Terima kasih, pesan Anda lolos verifikasi";
    form.reset();
  }
});