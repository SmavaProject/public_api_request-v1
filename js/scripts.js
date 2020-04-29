let baseUrl = 'https://randomuser.me/api/?results=12';
let baseUrl1 = 'https://randomuser.me/api';
const search = document.querySelector('.search-container');
const gallery = document.querySelector('.gallery');

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
        employee.innerHTML = `<div class="card">
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
}

function onStartup(){
    appendSearch();
    //createGaleryEntry();

// let profiles =
     fetch(baseUrl)
        .then(response => response.json())
        .then(data => createGaleryEntry(data.results));
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
