function updateCityAndTemp(response) {
  console.log(response);
  let city = response.data.city;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
  let country = response.data.country;
  let countryElement = document.querySelector("#current-country");
  countryElement.innerHTML = country;
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#current-temperature-value");
  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  let userInput = searchInputElement.value;
  let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${userInput}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCityAndTemp);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} <span class=highlighted-text>${hours}:${minutes}</span>`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDate = new Date();
let currentDateELement = document.querySelector("#current-date");
currentDateELement.innerHTML = formatDate(currentDate);
