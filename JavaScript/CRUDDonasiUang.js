
const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.form');
const pengirimValue = document.getElementById('pengirim');
const jumlahValue = document.getElementById('jumlah');
const metodeValue = document.getElementById('metode');
const tglberiValue = document.getElementById('tglberi');

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
            <h5 class="card-title">${post.Pengirim}</h5>
            <p class="card-text">Rp.${post.Jumlah},00-</p>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Metode Pembayaran: ${post.Metode}</li>
            <li class="list-group-item">Tanggal Pemberian: ${post.TglPemberian}</li>
            </ul>
            <br>
            <a href="#" class="card-link" id="delete-post">Delete</a>
          </div>
        </div>
        `;
    });
    postsList.innerHTML = output;
}

const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetDonasiUangAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostDonasiUangAPI'
const url3 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/DeleteDonasiUangAPI'


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

    console.log(pengirimValue.value)
    console.log(jumlahValue.value)
    console.log(metodeValue.value)
    console.log(tglberiValue.value)

    fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: generateRandomId(),
            Pengirim: pengirimValue.value,
            Jumlah: jumlahValue.value,
            Metode: metodeValue.value,
            TglPemberian: tglberiValue.value
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
    $("#show").click(function(){
      $("#donasibuku").show();
    });
  });

  $(document).ready(function(){
    $("#hide").click(function(){
      $("#donasibuku").hide();
    });
  });


  const url5 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetDonasiUangAPI';
  const notificationList = document.getElementById('notification-list');


  fetch(url5)
    .then(response => response.json())
    .then(data => {
      
      const notificationsHTML = data.map(item => 
        `<li><a href="#"><b>${item.Pengirim}</b> Memberikan Donasi <b>Rp.${item.Jumlah},00-</b></a></li>`).join('');

      notificationList.innerHTML = notificationsHTML;
    })
    .catch(error => {
      console.error('Error:', error);
    });