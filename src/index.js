//const axios = require("axios").default;

// SET TIME
let now = new Date();
let min = now.getMinutes();

let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayName = dayNames[now.getDay()];

let span = document.querySelector("#showTime");

if (min < 10) {
  min = `0${min}`;
  let hr = now.getHours();
  let timeNow = `${hr}:${min}`;
  span.innerHTML = `${dayName} ${timeNow}`;
} else {
  let hr = now.getHours();
  let timeNow = `${hr}:${min}`;
  span.innerHTML = `${dayName} ${timeNow}`;
}

// CITY NAME

// add event listeners to form
let form = document.querySelector("form");
form.addEventListener("submit", setCityNameAction);

// add event listeners to location button
location_button = document.querySelector("#location_button");
location_button.addEventListener("click", getCityNameAction);

// SET CITY NAME
function setCityNameAction(event) {
  event.preventDefault();
  // get the input city name
  let input = document.querySelector("#searchbar");
  let cityUpper = input.value.toLocaleUpperCase();
  // set the input city name
  document.getElementById("cityName").innerHTML = `${cityUpper}`;
  // make the URL
    let apiKey = "af299e40c9c7667df5a6bc3d09004719";
    let units = "imperial";
    let cityLower = input.value.toLocaleLowerCase();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityLower}&appid=${apiKey}&units=${units}`;
    // get the temperature
    axios.get(`${apiUrl}`).then(setTemp);
}

// GET CITY NAME
function getCityNameAction(event) {
  // get the POSITION info
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  // make the URL
  let apiKey = "af299e40c9c7667df5a6bc3d09004719";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(changeCityName);
  axios.get(`${apiUrl}`).then(setTemp);
}

function changeCityName(response) {
  // get the input city name
  console.log(response.data.name);
    console.log(response);
  let myCity = document.querySelector("#cityName");
  myCity.innerHTML = response.data[0].name;
}

// SET TEMP
function setTemp(response) {
  console.log(response);
  let tempF = document.querySelector("#fTemp");
  let someF = Math.round(response.data.main.temp);
  tempF.innerHTML = `${someF}˚f`;
  let someC = Math.round((someF - 32) / 1.8);
  let tempC = document.querySelector("#cTemp");
  tempC.innerHTML = `${someC}˚c`;
  let weather = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let wind = document.querySelector("#wind");
  let windspeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windspeed}mph`;
}
