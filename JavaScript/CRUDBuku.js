
const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.form');
const judulValue = document.getElementById('judul');
const pengarangValue = document.getElementById('pengarang');
const penerbitValue = document.getElementById('penerbit');
const lokasiValue = document.getElementById('lokasi');
const tahunValue = document.getElementById('tahun');
const bahasaValue = document.getElementById('bahasa');
const isbnValue = document.getElementById('isbn');

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
            <h5 class="card-title">${post.Judul}</h5>
            <p class="card-text">${post.Pengarang}</p>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Penerbit: ${post.Penerbit}</li>
            <li class="list-group-item">Lokasi Terbit: ${post.LokasiTerbit}</li>
            <li class="list-group-item">Tahun Terbit: ${post.TahunTerbit}</li>
            <li class="list-group-item">Bahasa: ${post.Bahasa}</li>
            <li class="list-group-item">ISBN: ${post.ISBN}</li>
            </ul>
            <br>
            <a href="#" class="card-link" id="delete-post">Delete</a>
          </div>
          
        </div>
        `;
    });
    postsList.innerHTML = output;
}

const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetDaftarBukuAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostDaftarBukuAPI'
const url3 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/DeleteDaftarBukuAPI'


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

    console.log(judulValue.value)
    console.log(pengarangValue.value)
    console.log(penerbitValue.value)
    console.log(lokasiValue.value)
    console.log(tahunValue.value)
    console.log(bahasaValue.value)
    console.log(isbnValue.value)

    fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: generateRandomId(),
            Judul: judulValue.value,
            Pengarang: pengarangValue.value,
            Penerbit: penerbitValue.value,
            LokasiTerbit: lokasiValue.value,
            TahunTerbit: tahunValue.value,
            Bahasa: bahasaValue.value,
            ISBN: isbnValue.value

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
      $("#formbuku").hide();
    });
  });

  $(document).ready(function(){
    $("#show").click(function(){
      $("#formbuku").show();
    });
  });

  const url5 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetDaftarBukuAPI';
  const notificationList = document.getElementById('notification-list');


  fetch(url5)
    .then(response => response.json())
    .then(data => {
      
      const notificationsHTML = data.map(item => 
        `<li><a href="#">Buku Baru dengan Judul <b>${item.Judul}</b> Ditambahkan</a></li>`).join('');

      notificationList.innerHTML = notificationsHTML;
    })
    .catch(error => {
      console.error('Error:', error);
    });