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