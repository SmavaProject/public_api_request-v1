let baseUrl = 'https://randomuser.me/api/?results=12&nat=AU,BR,CA,CH,DE,DK,ES,FI,FR,GB,IE,NO,NL,NZ,US';
let baseUrl1 = 'https://randomuser.me/api';
const search = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');
const cards = document.querySelectorAll('.card');
const body = document.querySelector('body');

function appendSearch(){
    search.innerHTML=`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
}

function createGaleryEntry(data){
    console.log(data);
    for (let i = 0; i< data.length;i++)
    {
        let employee = document.createElement('div');
        employee.className='card';
        gallery.appendChild(employee);
        employee.innerHTML = `
                    <div class="card-img-container">
                        <img class="card-img" src="${data[i].picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${data[i].name.first}</h3>
                        <p class="card-text">${data[i].email}</p>
                        <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                    </div>`;

    }
}

function generateUserProfile(data, i){
    console.log(data);
    body.innerHTML += `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[i].name.first}</h3>
                        <p class="modal-text">${data[i].email}</p>
                        <p class="modal-text cap">${data[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${data[i].phone}</p>
                        <p class="modal-text">${data[i].location.street.number}, ${data[i].location.street.name}</p>
                        <p class="modal-text">${data[i].registered.date}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;

    const closeBtn = document.getElementById('modal-close-btn');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    closeBtn.addEventListener('click', e=>{
        document.querySelector('.modal-container').remove();
        showUserProfile(data);
    });

    let len = data.length;
    prevBtn.addEventListener('click', e => {
        document.querySelector('.modal-container').remove();
        if (i===0){
            generateUserProfile(data, len-1);
        }else {
            generateUserProfile(data, i - 1);
        }
    });
    nextBtn.addEventListener('click', e => {
        document.querySelector('.modal-container').remove();
        if (i ===len -1){
            generateUserProfile(data, 0);
        }else {
            generateUserProfile(data, i + 1);
        }
    });
};


function showUserProfile(data) {
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) =>
            generateUserProfile(data, i));
    }
}

function onStartup() {
    appendSearch();
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            createGaleryEntry(data.results);
            showUserProfile(data.results);
        })
        .catch(error => console.log('something went wrong', error));
    /*    .then(data => {
            console.log(data.results[0].name.first);
            console.log(data.results[0].picture.medium);
        });
    */

    //profiles.forEach(entry => console.log(entry.gender));
}
onStartup();

