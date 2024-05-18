const template = document.querySelector(".pet-card-template");
const wrapper = document.createDocumentFragment();


async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
  const weatherData = await weatherPromise.json();
  console.log(weatherData);
  const weatherTemperature = weatherData.properties.periods[0].temperature;
  document.querySelector(".js-temperature").textContent = weatherTemperature;
}

start();
petFilter();

async function petFilter() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
  const petsData = await petsPromise.json();
  console.log(petsData);
  petsData.forEach((pet, index) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".pet-about").textContent = pet.description;
    if (!pet.photo) {
      pet.photo = "Fallback.jpg"
    };
    clone.querySelector(".pet-img img").src = pet.photo;
    clone.querySelector(".pet-img img").alt = `a ${pet.species} named ${pet.name}`;
    clone.querySelector(".pet-age").textContent = createPetAgeText(pet.bithYear);
    clone.querySelector(".pet-grids").dataset.species = pet.species;

    wrapper.appendChild(clone);
  });



  document.querySelector(".pet-area").appendChild(wrapper);

}

function createPetAgeText(birthYear) {
  const currentYear = new Date().getFullYear();
  const petAge = currentYear - birthYear;
  if (petAge < 1) {
    return "less than a year old";
  } else if (petAge === 1) {
    return "1 year old"
  } else if (petAge > 1) {
    return `${petAge} years old`
  }
}


const btn = document.querySelectorAll(".menu-bar button");
btn.forEach(el => {
  el.addEventListener("click", addingActive);
})

function addingActive(e) {
  btn.forEach(el => {
    el.classList.remove("active");
  })

  e.target.classList.add("active");

  const currentFilter = e.target.dataset.filter;
  document.querySelectorAll(".pet-grids").forEach(pet => {
    if (currentFilter === pet.dataset.species || currentFilter === "all") {
      pet.style.display = "grid";
    } else {
      pet.style.display = "none";
    }
  })

}