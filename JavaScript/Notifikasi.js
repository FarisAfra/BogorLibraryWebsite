// Toggle dropdown saat ikon notifikasi diklik
const notifDropdown = document.querySelector('.navbar1 .dropdown:first-child');
const notifToggle = notifDropdown.querySelector('.dropdown-toggle');
const notifMenu = notifDropdown.querySelector('.dropdown-menu');

notifToggle.addEventListener('click', () => {
    notifMenu.classList.toggle('show');
});

// Toggle dropdown saat gambar profil diklik
const profilDropdown = document.querySelector('.navbar1 .dropdown:last-child');
const profilToggle = profilDropdown.querySelector('.dropdown-toggle');
const profilMenu = profilDropdown.querySelector('.dropdown-menu');

profilToggle.addEventListener('click', () => {
    profilMenu.classList.toggle('show');
});







