// 1. Pilih elemen
const tombol = document.querySelector("#tombol-tema");

// 2. Dengarkan klik
tombol.addEventListener("click", function () {
    // 3. Ubah: tambahkan/hapus class "dark" pada <body>
    document.body.classList.toggle("dark");
});