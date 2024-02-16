const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.add-post-form');
const nameValue = document.getElementById('username');
const emailValue = document.getElementById('email');
const passValue = document.getElementById('password');
let output = ``;

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <div class="card mt-4 col-md-6 bg-ligt">
            <div class="card-body">
                <h5 class="card-title">${post.Nama}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${post.Email}</h6>
                <p class="card-text">${post.Password}</p>
                <a href="#" class="card-link">Edit</a>
                <a href="#" class="card-link">Delete</a>
            </div>
        </div>
        `;
    });
    postsList.innerHTML = output;
}

const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetAnggotaAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostAnggotaApi'

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

    fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Nama: nameValue.value,
            Email: emailValue.value,
            Password: passValue.value
        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderPosts(dataArr)
    })
})