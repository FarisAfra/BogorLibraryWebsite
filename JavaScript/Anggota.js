
// const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.form');
const nameValue = document.getElementById('nama');
const emailValue = document.getElementById('email');
const passValue = document.getElementById('password');
const nohpValue = document.getElementById('nohp');
const ttlValue = document.getElementById('ttl');
const kerjaValue = document.getElementById('kerja');
const genderValue = document.getElementById('gender');
const alamatValue = document.getElementById('alamat1');
const provValue = document.getElementById('prov');
const kotaValue = document.getElementById('kota');
const kecValue = document.getElementById('kec');
const kelValue = document.getElementById('kel');

function generateRandomId() {
    return Math.floor(Math.random() * 1000000); // Change the range as per your requirements
  }



const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetAnggotaAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostAnggotaApi'

//Get - Read the posts
//Method: Get
fetch(url)
    .then(res => res.json())
    // .then(data => renderPosts(data))

// Create - Insert new posts
//Method: POST
addPostForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Ambil nilai input dari form
  const name = nameValue.value;
  const email = emailValue.value;
  const password = passValue.value;
  const noHp = nohpValue.value;
  const tglLahir = ttlValue.value;
  const pekerjaan = kerjaValue.value;
  const gender = genderValue.value;
  const alamat = alamatValue.value;
  const provinsi = provValue.value;
  const kota = kotaValue.value;
  const kecamatan = kecValue.value;
  const kelurahan = kelValue.value;

  const errorMessage = document.getElementById('errorMessage');

  // Cek apakah data dengan email atau password yang sama sudah ada di database
  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Filter data dengan email atau password yang sama
          const existingData = data.filter(item => item.Email === email);

          if (existingData.length > 0) {
              // Data dengan email atau password yang sama sudah ada di database
              console.log('Data already exists');
              errorMessage.style.display = 'block';
              // Tampilkan pesan error atau lakukan tindakan lainnya
          } else {
              // Data belum ada di database, lakukan permintaan POST
              fetch(url2, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      id: generateRandomId(),
                      Nama: name,
                      Email: email,
                      Password: password,
                      NoHP: noHp,
                      TglLhr: tglLahir,
                      Pekerjaan: pekerjaan,
                      Gender: gender,
                      Alamat: alamat,
                      Provinsi: provinsi,
                      Kota: kota,
                      Kecamatan: kecamatan,
                      Kelurahan: kelurahan
                  })
              })
              .then(res => res.json())
              .then(data => {
                  // Data berhasil ditambahkan
                  console.log('Data added successfully');
                  // Lakukan tindakan lain dengan data yang diterima
                  console.log(data);
                  // renderPosts(data) atau tindakan lainnya
              })
              .then(() => location.reload())
              .catch(error => {
                  // Error ketika melakukan permintaan POST
                  console.error('Error:', error);
              });
          }
      })
      .catch(error => {
          // Error ketika mengambil data dari API
          console.error('Error:', error);
      });

})