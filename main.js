async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
  const weatherData = await weatherPromise.json();
  console.log(weatherData);
  const weatherTemperature = weatherData.properties.periods[0].temperature;
  document.querySelector(".js-temperature").textContent = weatherTemperature;
}

start();


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
  console.log(currentFilter);

}