
const postsList = document.querySelector('.post-list');
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
const btnSubmit = document.querySelector('.btn')

function generateRandomId() {
  return Math.floor(Math.random() * 1000000); // Change the range as per your requirements
}

let output = ``;

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `

        <div class="card mx-auto" style="width: 400px; margin: 20px">
          <img src="images/logo_perpusnas_2015.png" class="card-img-top" alt="...">
          <div class="card-body" data-id=${post.id}>
            <h5 class="card-title">${post.Nama}</h5>
            <p class="card-text">${post.Email}</p>
            <ul class="list-group list-group-flush">
            <li class="list-group-item pass" id="pass">Password: ${post.Password}</li>
            <li class="list-group-item">No HP: ${post.NoHP}</li>
            <li class="list-group-item">Tanggal Lahir: ${post.TglLhr}</li>
            <li class="list-group-item">Gender: ${post.Gender}</li>
            <li class="list-group-item">Alamat: ${post.Alamat}</li>
            <li class="list-group-item">Provinsi: ${post.Provinsi}</li>
            <li class="list-group-item">Kota: ${post.Kota}</li>
            <li class="list-group-item">Kecamatan: ${post.Kecamatan}</li>
            <li class="list-group-item">Kelurahan: ${post.Kelurahan}</li>
            </ul>
            <br>
            <a href="#" class="card-link" id="delete-post">Delete</a>  
          </div>
          
        </div>
        `;
    });
    postsList.innerHTML = output;
}

const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetAnggotaAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostAnggotaApi'
const url3 =  'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PutAnggotaAPI'
const url4 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/DeleteAnggotaAPI'

//Get - Read the posts
//Method: Get
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))

    postsList.addEventListener('click',(e) => {
      e.preventDefault();

      let delButtonIsPressed = e.target.id == 'delete-post';

      // console.log(e.target.parentElement.dataset.id);

      let id = e.target.parentElement.dataset.id;

      //Delete
      if(delButtonIsPressed) {
        fetch(`${url4}?id=${id}`,{
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(() => location.reload())
      }

    });


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
                  console.log('Berhasil Menambahkan');
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

$(document).ready(function(){
  $("#hide").click(function(){
    $("#formbuku").hide();
  });
});

$(document).ready(function(){
  $("#show").click(function(){
    $("#formbuku").show();
  });
});


const url5 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetAnggotaAPI';
  const notificationList = document.getElementById('notification-list');


  fetch(url5)
    .then(response => response.json())
    .then(data => {
      
      const notificationsHTML = data.map(item => 
        `<li><a href="#">Anggota Baru atas Nama <b>${item.Nama}</b></a></li>`).join('');

      notificationList.innerHTML = notificationsHTML;
    })
    .catch(error => {
      console.error('Error:', error);
    });