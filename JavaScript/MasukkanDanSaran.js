
const postsList = document.querySelector('.post-list');
const addPostForm = document.querySelector('.form');
const pengirimValue = document.getElementById('pengirim');
const topikValue = document.getElementById('topik');
const saranValue = document.getElementById('saran');

function generateRandomId() {
  return Math.floor(Math.random() * 1000000); // Change the range as per your requirements
}

const url = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetMasukkanSaranAPI'
const url2 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/PostMasukkanSaranAPI'
const url3 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/DeleteMasukkanSaranAPI'



// Create - Insert new posts
//Method: POST
addPostForm.addEventListener('submit',(e) => {
    e.preventDefault();

    console.log(pengirimValue.value)
    console.log(topikValue.value)
    console.log(saranValue.value)

    fetch(url2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      id: generateRandomId(),
      Pengirim: pengirimValue.value,
      Topik: topikValue.value,
      Saran: saranValue.value

      })
  })
  .then(res => res.json())
  .then(() => location.reload())
})


$(document).ready(function(){
    $("#show").click(function(){
      $("#formsaran").show();
    });
  });

  $(document).ready(function(){
    $("#hide").click(function(){
      $("#formsaran").hide();
    });
  });


  const url5 = 'https://us-east-1.aws.data.mongodb-api.com/app/serviceveedbook-ltudl/endpoint/GetMasukkanSaranAPI';
  const notificationList = document.getElementById('notification-list');


  fetch(url5)
    .then(response => response.json())
    .then(data => {
      
      const notificationsHTML = data.map(item => 
        `<li><a href="#"><b>${item.Pengirim}</b> Memberikan Saran Tentang <b>${item.Topik}</b></a></li>`).join('');

      notificationList.innerHTML = notificationsHTML;
    })
    .catch(error => {
      console.error('Error:', error);
    });