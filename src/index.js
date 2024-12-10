function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  let cityNameSearch = searchInputElement.value;
  let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityNameSearch}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCityAndTemp);
}

function updateCityAndTemp(response) {
  let city = response.data.city;
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;
  let temperature = Math.round(response.data.temperature.current);
  let temperaturePlaceholder = document.querySelector(
    "#current-temperature-value"
  );
  temperaturePlaceholder.innerHTML = temperature;
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
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
