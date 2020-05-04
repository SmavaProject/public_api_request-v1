let baseUrl = 'https://randomuser.me/api/?results=12&nat=US';
const search = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');
let header = document.querySelector('.header-text-container');

/***
 * Appends search button to the page
 */
search.innerHTML = `<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;

header.innerHTML += `<h2 class="search-failed">Nothing has been found...</h2>`;

let searchBtn = document.getElementById('search-submit');
let searchInputField = document.getElementById('search-input');

searchBtn.addEventListener('click', e => {
    e.preventDefault();
    searchForEmployee();
});

searchInputField.addEventListener('input', () => {
    searchForEmployee();
});

/***
 *Triggers search to find matched employee cards
 */
function searchForEmployee() {
    const cards = document.querySelectorAll('.card');
    const cardNames = document.querySelectorAll('.card-name');
    let searchInput = document.getElementById('search-input').value;

    let displayedCards = cardNames.length;
    for (let i = 0; i < cardNames.length; i++) {
        let cardName = cardNames[i].textContent;
        if (cardName.toLowerCase().includes(searchInput.toLowerCase())) {
            cards[i].style.display = 'flex';
        } else {
            cards[i].style.display = 'none';
            displayedCards--;
        }
    }
    console.log("displayedCards " + displayedCards);
    if (displayedCards >0) {
        //displayMessage();
        document.querySelector('.search-failed').style.display = 'none';
    }else{
        document.querySelector('.search-failed').style.display = 'block';
    }
};
/***
 *Generates HTML layout for every employee card
 * @param data
 */
function createGaleryEntries(data) {
    //debugger;
    console.log('createGaleryEntries ');
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        gallery.innerHTML += `
                    <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${data[i].picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                        <p class="card-text">${data[i].email}</p>
                        <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                    </div>
                    </div>`;

    }
}

/***
 *Generate HTML modal for a clicked employee
 * @param data
 * @param i
 */
function generateUserProfile(data, i){
    console.log(data);
    let l = data[i].dob.date.length;
    let bdate =  data[i].dob.date.substr(5,2) + "/" + data[i].dob.date.substr(8,2) + "/" + data[i].dob.date.substr(2,2) ;
    let phone = data[i].phone.substr(0,5) + " " + data[i].phone.substr(6,8);
    //create "modal-container"
    let modalContainer = document.createElement('div');
    modalContainer.className = "modal-container";
    modalContainer.innerHTML =
                `<div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                        <p class="modal-text">${data[i].email}</p>
                        <p class="modal-text cap">${data[i].location.city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.state} ${data[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${bdate}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>`;
    body.insertBefore(modalContainer, document.querySelector('script'));
    //select buttons on modal-container and add event listeners to them
    const closeBtn = document.getElementById('modal-close-btn');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    closeBtn.addEventListener('click', e=>{
        document.querySelector('.modal-container').remove();
    });

    let len = data.length;
    prevBtn.addEventListener('click', e => {
        console.log(e.target);
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

/***
 *Add event listener for every employee card
 * @param data
 */
function showUserProfile(data) {
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) =>
            generateUserProfile(data, i));
    }
}

/***
 *Fetch data from IPI and call functions to build the page layout
 */
function onStartup() {
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            createGaleryEntries(data.results);
            showUserProfile(data.results);
        })
        .catch(error => console.log('something went wrong', error));
}

onStartup();
