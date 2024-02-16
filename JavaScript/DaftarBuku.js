
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
          <div class="card-body">
            <h5 class="card-title">${post.Judul}</h5>
            <p class="card-text">${post.Pengarang}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Penerbit: ${post.Penerbit}</li>
            <li class="list-group-item">Lokasi Terbit: ${post.LokasiTerbit}</li>
            <li class="list-group-item">Tahun Terbit: ${post.TahunTerbit}</li>
            <li class="list-group-item">Bahasa: ${post.Bahasa}</li>
            <li class="list-group-item">ISBN: ${post.ISBN}</li>
          </ul>
          <div class="card-body">
            
          </div>
        </div>
        `;
    });
    postsList.innerHTML = output;
}

const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetDaftarBukuAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostDaftarBukuAPI'


//Get - Read the posts
//Method: Get
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))

// Create - Insert new posts
//Method: POST
addPostForm.addEventListener('submit',(e) => {
    e.preventDefault();

    console.log(nameValue.value)
    console.log(emailValue.value)
    console.log(passValue.value)
    console.log(nohpValue.value)
    console.log(ttlValue.value)
    console.log(kerjaValue.value)
    console.log(genderValue.value)
    console.log(alamatValue.value)
    console.log(provValue.value)
    console.log(kotaValue.value)
    console.log(kecValue.value)
    console.log(kelValue.value)
    console.log(url.total());
    console.log(url.data.length)

    fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: generateRandomId(),
            Judul: nameValue.value,
            Pengarang: emailValue.value,
            Password: passValue.value,
            Penerbit: nohpValue.value,
            LokasiTerbit: ttlValue.value,
            TahunTerbit: genderValue.value,
            Bahasa: alamatValue.value,
            ISBN: provValue.value

        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr)
    })
})
