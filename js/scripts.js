let baseUrl = 'https://randomuser.me/api/?results=12&nat=US';
const search = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');

function appendSearch(){
    search.innerHTML=`<form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
    let searchBtn = document.getElementById('search-submit');
    searchBtn.addEventListener('click', e =>{
        e.preventDefault();
        const cards = document.querySelectorAll('.card');
        const cardNames = document.querySelectorAll('.card-name');
        let searchInput = document.getElementById('search-input').value;
        let notDisplayedCards = 0;

        //display all cards on empty search
        if(searchInput==''){
            deleteMessage();
            for(let i = 0; i< cardNames.length; i++) {
                cards[i].style.display = 'flex';
            }
        }
        for(let i = 0; i< cardNames.length; i++){
            //alert(searchInput);
            //debugger;
            let cardName = cardNames[i].textContent;
            if (cardName.toLowerCase().includes(searchInput.toLowerCase())) {
                cards[i].style.display = 'flex';
                //notDisplayedCards--;
                //alert(searchInput);
            }else{
                cards[i].style.display = 'none';
                notDisplayedCards++;
            }
        }
        if (notDisplayedCards==cardNames.length){
            displayMessage();
        }
    });
}

function createGaleryEntry(data) {
    //debugger;
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        gallery.innerHTML += `
                    <div class="card">
                    <div class="card-img-container">
                        <img class="card-img" src="${data[i].picture.medium}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${data[i].name.first}</h3>
                        <p class="card-text">${data[i].email}</p>
                        <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
                    </div>
                    </div>`;

    }
    appendSearch();
}

function generateUserProfile(data, i){
    console.log(data);
    //debugger;
    let l = data[i].dob.date.length;
    console.log(l);
    let bdate = data[i].dob.date.substr(8,2) + "/" + data[i].dob.date.substr(5,2) + "/" + data[i].dob.date.substr(2,2) ;
    console.log(bdate);
    //let phone = "(" + data[i].phone.substr(0,2) + ")" + data[i].phone.substr(4,6) + "-" + data[i].phone.substr(8,11);
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
                        <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.state} ${data[i].location.postcode}</p>
                        <p class="modal-text">Birthday: ${bdate}</p>
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
        //debugger;
        document.querySelector('.modal-container').remove();
        showUserProfile(data);
    });

    let len = data.length;
    prevBtn.addEventListener('click', e => {
        //debugger;
        document.querySelector('.modal-container').remove();
        if (i===0){
            generateUserProfile(data, len-1);
        }else {
            generateUserProfile(data, i - 1);
        }
    });
    nextBtn.addEventListener('click', e => {
        //debugger;
        document.querySelector('.modal-container').remove();
        if (i ===len -1){
            generateUserProfile(data, 0);
        }else {
            generateUserProfile(data, i + 1);
        }
    });
};


function showUserProfile(data) {
    //debugger;
    const cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) =>
            generateUserProfile(data, i));
    }
}


function onStartup() {
    //debugger;
    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            createGaleryEntry(data.results);
            showUserProfile(data.results);
        })
        .catch(error => console.log('something went wrong', error));
}

function displayMessage(){
    //debugger;
    let header = document.querySelector('.header-text-container');
    let h2 = document.createElement('h2');
    h2.className = 'search-failed';
    h2.textContent = "Nothing has been found...";
    header.appendChild(h2);
}
function deleteMessage(){
    let header = document.querySelector('.header-text-container');
    let h2 = document.querySelector('.search-failed');
    if ( h2 !== null){
        header.removeChild(h2);
    }
}
onStartup();




