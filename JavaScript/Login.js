
const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetAnggotaAPI'
const errorMessage = document.getElementById('errorMessage');

let isAuthenticated = false; // Inisialisasi flag verifikasi

fetch(url)
.then(response => response.json())
.then(data => {
    // Data berhasil diterima dari API
// console.log(data);
// Lakukan tindakan lain dengan data yang diterima
})


fetch(url)
    .then(response => response.json())
    .then(data => {
        // Data berhasil diterima dari API
        // console.log(data);

        // Mengambil data email dari setiap objek data
        data.forEach(item => {
            // console.log(item.Email);
            // console.log(item.Password);
            document.getElementById("login-form").addEventListener("submit", function(event) {
            event.preventDefault();

            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;

            // Melakukan verifikasi login
            if (email === (item.Email) && password === (item.Password)) {
                isAuthenticated = true;
                window.location.href = 'HomeAnggota.html'
                
                // Lakukan tindakan lain setelah login berhasil
            }else {
                console.log("Tidak ada data email pada objek ini");
                
            }

            // Periksa flag untuk menentukan apakah menampilkan pesan error atau tidak
            if (!isAuthenticated) {
                errorMessage.style.display = 'block';
            }
        });
        
        });
    })
    .catch(error => {
        // Terjadi kesalahan saat mengambil data dari API
        console.log(error);
        // Lakukan penanganan kesalahan yang sesuai
    });

// Login Admin
document.getElementById("login-form2").addEventListener("submit", function(event) {
  event.preventDefault();

  var username = document.getElementById("username").value;
  var password = document.getElementById("password2").value;

  // Melakukan verifikasi login
  if (username === "admin" && password === "admin123") {
      // Lakukan tindakan lain setelah login berhasil
      window.location.href = 'HomeAdmin.html'
  } else {
    errorMessage.style.display = 'block';
  }
});

