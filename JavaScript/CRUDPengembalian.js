
const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.form');
const peminjamValue = document.getElementById('peminjam');
const judulValue = document.getElementById('judul');
const pengarangValue = document.getElementById('pengarang');
const penerbitValue = document.getElementById('penerbit');
const tanggalValue = document.getElementById('tanggal');
const deadlineValue = document.getElementById('deadline');
const kembaliValue = document.getElementById('kembali');

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
            <h5 class="card-title">${post.Peminjam}</h5>
            <p class="card-text">${post.Judul}</p>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Pengarang: ${post.Pengarang}</li>
            <li class="list-group-item">Penerbit: ${post.Penerbit}</li>
            <li class="list-group-item">Tanggal Pinjam: ${post.TglPinjam}</li>
            <li class="list-group-item">Deadline: ${post.Deadline}</li>
            <li class="list-group-item">Tanggal Kembali: ${post.TglPengembalian}</li>
            </ul>
            <br>
            <a href="#" class="card-link" id="delete-post">Delete</a>
          </div>
          
        </div>
        `;
    });
    postsList.innerHTML = output;
}

const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetBukuMasukAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostBukuMasukAPI'
const url3 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/DeleteBukuMasukAPI'


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
    console.log(peminjamValue.value)
    console.log(tanggalValue.value)
    console.log(deadlineValue.value)
    console.log(kembaliValue.value)

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
            Peminjam: peminjamValue.value,
            TglPinjam: tanggalValue.value,
            Deadline: deadlineValue.value,
            TglPengembalian: kembaliValue.value
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
    $("#dbpeminjaman").click(function(){
      $("#kembalibuku").show();
    });
  });

  $(document).ready(function(){
    $("#dbpengembalian").click(function(){
      $("#kembalibuku").hide();
    });
  });

  const url5 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetBukuMasukAPI';
  const notificationList = document.getElementById('notification-list');


  fetch(url5)
    .then(response => response.json())
    .then(data => {
      
      const notificationsHTML = data.map(item => 
        `<li><a href="#">Buku <b>${item.Judul}</b> Sudah Dikembalikan oleh <b>${item.Peminjam}</b></a></li>`).join('');

      notificationList.innerHTML = notificationsHTML;
    })
    .catch(error => {
      console.error('Error:', error);
    });