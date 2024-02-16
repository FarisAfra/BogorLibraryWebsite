
const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.form');
const namaValue = document.getElementById('nama');
const nohpValue = document.getElementById('nohp');
const ttlValue = document.getElementById('tgldtg');
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

let output = ``;

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `

        <div class="card mx-auto" style="width: 400px; margin: 20px">
          <img src="images/logo_perpusnas_2015.png" class="card-img-top" alt="...">
          <div class="card-body" data-id=${post.id}>
            <h5 class="card-title">${post.Nama}</h5>
            <p class="card-text">${post.NoHP}</p>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Tanggal Kedatangan: ${post.Tanggal}</li>
            <li class="list-group-item">Pekerjaan: ${post.Pekerjaan}</li>
            <li class="list-group-item">Gender: ${post.Gender}</li>
            <li class="list-group-item">Alamat: ${post.Alamat}</li>
            <li class="list-group-item">Kota: ${post.Kota}</li>
            </ul>
            <br>
            <a href="#" class="card-link" id="delete-post">Delete</a>
          </div>
          
        </div>
        `;
    });
    postsList.innerHTML = output;
}

const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetTamuAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostTamuAPI'
const url3 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/DeleteTamuAPI'

//Get - Read the posts
//Method: Get
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))

    postsList.addEventListener('click',(e) => {
      e.preventDefault();

      let delButtonIsPressed = e.target.id == 'delete-post';

      console.log(e.target.parentElement.dataset.id);

      let id = e.target.parentElement.dataset.id;

      //Delete
      if(delButtonIsPressed) {
        fetch(`${url3}?id=${id}`,{
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(() => location.reload())
      }

    });

// Create - Insert new posts
//Method: POST
addPostForm.addEventListener('submit',(e) => {
    e.preventDefault();

    console.log(namaValue.value)
    console.log(nohpValue.value)
    console.log(ttlValue.value)
    console.log(kerjaValue.value)
    console.log(genderValue.value)
    console.log(alamatValue.value)
    console.log(provValue.value)
    console.log(kotaValue.value)
    console.log(kecValue.value)
    console.log(kelValue.value)

    fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: generateRandomId(),
            Nama: namaValue.value,
            NoHP: nohpValue.value,
            Tanggal: ttlValue.value,
            Pekerjaan: kerjaValue.value,
            Gender: genderValue.value,
            Alamat: alamatValue.value,
            Provinsi: provValue.value,
            Kota: kotaValue.value,
            Kecamatan: kecValue.value,
            Kelurahan: kelValue.value

        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr)
    })
    .then(() => location.reload())
})



$(document).ready(function(){
    $("#hide").click(function(){
      $("#formtamu").hide();
    });
  });

  $(document).ready(function(){
    $("#show").click(function(){
      $("#formtamu").show();
    });
  });

  const url5 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetTamuAPI';
  const notificationList = document.getElementById('notification-list');


  fetch(url5)
    .then(response => response.json())
    .then(data => {
      
      const notificationsHTML = data.map(item => 
        `<li><a href="#">Pengunjung Baru atas Nama <b>${item.Nama}</b></a></li>`).join('');

      notificationList.innerHTML = notificationsHTML;
    })
    .catch(error => {
      console.error('Error:', error);
    });