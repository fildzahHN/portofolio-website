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