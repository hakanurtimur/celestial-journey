import { planets } from "./objects.js";
import { iconSvg } from "./objects.js";

const planetList = document.getElementById("planet-list");
const modal = document.getElementById("info-modal");
const backdrop = document.querySelector(".backdrop");
const loadingSpinner = document.getElementById("loading-spinner");

loadingSpinner.innerHTML = `
<div>
${iconSvg}
</div>
`



const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const hideModal = () => {
  modal.style.display = "none";
};

const fetchPlanetData = async(name) => {
    loadingSpinner.style.display = 'block';
    const response = await fetch(`https://dom-planets-default-rtdb.firebaseio.com/planets/${name}.json`)
    const data = await response.json();
    loadingSpinner.style.display = 'none';
    return data;
}


backdrop.addEventListener("click", () => {
  toggleBackdrop();
  hideModal();
});

planets.map((e) => {
  const newLi = document.createElement("li");
  newLi.id = e.id;
  newLi.innerHTML = `<div id= ${e.name.toLowerCase()} class= planet-item >
        <h3>${e.name}</h3>
        <div class=image-container>
        <img alt = ${e.name} src = ${e.photoURL} />
        </div>
    </div>`;
  planetList.appendChild(newLi);
  const fixedName = e.name.toLowerCase()  

    if(fixedName !== 'mercury') {
        return;
    }
  newLi.addEventListener("click", async() => {
    toggleBackdrop();
    const data = await fetchPlanetData(fixedName);
    modal.style.display = "block";
    modal.innerHTML = `
    <div class = modal-container>
        <h2>${e.name}</h2>
        <p class=close-button> X <p>
        <p>${data.abstract}</p>
        <div class=see-info>See more information</div>
        <div class=info-table>
            <div class= t-item>
                <span class= t-head>Namesake:</span> ${data.namesake}
            </div>
            <div class= t-item>
                <span class= t-head>One ${e.name} Day:</span> ${data.planetDay} Earth Days
            </div>
            <div class= t-item>
                <span class= t-head>One ${e.name} year:</span> ${data.planetYear} Earth Days
            </div>
            <div class= t-item>
                <span class= t-head>Max Temperature at ${e.name}:</span> ${data.temperatureMax} degree C
            </div>
            <div class= t-item>
                <span class= t-head>Min Temperature at ${e.name}:</span> ${data.temperatureMin} degree C
            </div>
            <div class= t-item>
                <span class= t-head>Gravity:</span> ${data.gravity} * Earth Gravity
            </div>
            <div class= t-item>
                <span class= t-head>Mass:</span> ${data.mass} * Earth Mass
            </div>
            <div class= t-item>
                <span class= t-head>Distance To Sun:</span> ${data.distanceToSun} million km 
            </div>
            <div class= t-item>
                <span class= t-head>Moons:</span> ${data.moons}
            </div>
            <div class=close-info>See less information</div>
        </div>
        <button> Go to live in Mercury </button> 
    </div>`;
    const closeButtton = document.querySelector(".close-button");
    closeButtton.addEventListener("click", () => {
        toggleBackdrop();
        hideModal();
    })
    const seeInfoButton = document.querySelector(".see-info");
    const closeInfoButton = document.querySelector(".close-info");
    closeInfoButton.addEventListener("click", () => {
        const infoTable = document.querySelector('.info-table');
        infoTable.style.display = 'none';
        seeInfoButton.style.display ="block";
    })
    seeInfoButton.addEventListener("click", () => {
        seeInfoButton.style.display ="none";
        const infoTable = document.querySelector('.info-table');
        infoTable.style.display = 'flex';
        infoTable.style.flexDirection = 'column'
        infoTable.style.gap = '1rem'
    })
  });
});

const planetListItems = planetList.children;


