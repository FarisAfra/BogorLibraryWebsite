
const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.form');
const namaValue = document.getElementById('nama');
const emailValue = document.getElementById('email');
const nohpValue = document.getElementById('nohp');
const ttlValue = document.getElementById('tgldtg');

function generateRandomId() {
  return Math.floor(Math.random() * 1000000); // Change the range as per your requirements
}



const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetTamuAnggotaAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostTamuAnggotaAPI'
const url3 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/DeleteTamuAnggotaAPI'


// Create - Insert new posts
//Method: POST
addPostForm.addEventListener('submit',(e) => {
    e.preventDefault();

    console.log(namaValue.value)
    console.log(emailValue.value)
    console.log(nohpValue.value)
    console.log(ttlValue.value)
    

    fetch(url2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: generateRandomId(),
            Nama: namaValue.value,
            Email: emailValue.value,
            NoHP: nohpValue.value,
            Tanggal: ttlValue.value
        })
    })
    .then(res => res.json())
    .then(() => location.reload())
    
})

  