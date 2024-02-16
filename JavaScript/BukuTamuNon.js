
const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.form');
const namaValue = document.getElementById('nama');
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


const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetTamuAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostTamuAPI'
const url3 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/DeleteTamuAPI'


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
    .then(() => location.reload())
    
})



  