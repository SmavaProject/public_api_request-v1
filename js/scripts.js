let baseUrl = 'https://randomuser.me/api/?results=12';
let baseUrl1 = 'https://randomuser.me/api';
const search = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');
const cards = document.querySelectorAll('.card');
const body = document.querySelector('body');

//console.log(profiles);

//profiles.results.forEach(data=> console.log(("name = " + data.name + "; email = " + data.email +"; city = " + data.location.city)));

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

function generateUserProfile(data){

    alert(typeof data);
    console.log(data);
    body.innerHTML = `<div class="modal-container">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data.name.first}</h3>
                        <p class="modal-text">${data.email}</p>
                        <p class="modal-text cap">${data.location.city}</p>
                        <hr>
                        <p class="modal-text">${data.phone}</p>
                        <p class="modal-text">${data.location.street.number}, ${data.location.street.name}</p>
                        <p class="modal-text">${data.registered.date}</p>
                    </div>
                </div>

                // IMPORTANT: Below is only for exceeds tasks 
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`;
};
/*
cards.forEach(card => {
    debugger;
    card.addEventListener('click', e => {
        alert("card is clicked");
        generateUserProfile();
    });
});
*/

function showUserProfile(data) {
    alert(typeof data);
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) =>
            generateUserProfile(data[i]));
    }
}

function onStartup(){
    appendSearch();
    //createGaleryEntry();

// let profiles =
     fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            createGaleryEntry(data.results);
            showUserProfile(data.results);
        });
/*    .then(data => {
        console.log(data.results[0].name.first);
        console.log(data.results[0].picture.medium);
    });
*/

 //profiles.forEach(entry => console.log(entry.gender));
}
onStartup();
/***
 * function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  section.innerHTML = `
    <img src=${data.thumbnail.source}>
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <p>${data.extract}</p>
  `;
}
 *
 *
 *
 *
 *
 */
