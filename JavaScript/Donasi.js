
const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.form');
const pengirimValue = document.getElementById('pengirim');
const jumlahValue = document.getElementById('jumlah');
const kondisiValue = document.getElementById('kondisi');
const tglberiValue = document.getElementById('tglberi');

function generateRandomId() {
  return Math.floor(Math.random() * 1000000); // Change the range as per your requirements
}



const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetDonasiBukuAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostDonasiBukuAPI'
const url3 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/DeleteDonasiBukuAPI'


// Create - Insert new posts
//Method: POST
addPostForm.addEventListener('submit',(e) => {
    e.preventDefault();

    console.log(pengirimValue.value)
    console.log(jumlahValue.value)
    console.log(kondisiValue.value)
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
            Kondisi: kondisiValue.value,
            TglPemberian: tglberiValue.value
        })
    })
    .then(res => res.json())
    .then(() => location.reload())
    
})


  const url5 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetDonasiBukuAPI';
  const notificationList = document.getElementById('notification-list');


  fetch(url5)
    .then(response => response.json())
    .then(data => {
      
      const notificationsHTML = data.map(item => 
        `<li><a href="#"><b>${item.Pengirim}</b> Memberikan <b>${item.Jumlah}</b> Buah Buku</a></li>`).join('');

      notificationList.innerHTML = notificationsHTML;
    })
    .catch(error => {
      console.error('Error:', error);
    });