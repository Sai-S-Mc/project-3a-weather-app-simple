function updateCityAndTemp(response) {
  console.log(response.data);

  if (response.data.message) {
    let mainSection = document.querySelector("main");
    mainSection.innerHTML = `<h4>Are you sure that's a real place? Even the weather is confused🌀<br/>Please check the spelling and try again.</h4>`;
    setTimeout(() => {
      location.reload();
    }, 3500);
    return;
  }

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

  let userInput = searchInputElement.value.trim();

  if (userInput === "" && userInput.length < 1) {
    alert("Spacebar is not a city. Yet.🚀");
    return;
  }

  let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${userInput}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateCityAndTemp);
}

function calculate12HourFormat(hour, mins) {
  if (hour > 12) {
    let amOrPm;
    if (hour === 24) {
      amOrPm = "AM";
    } else {
      amOrPm = "PM";
    }
    hour = hour - 12;
    return `(${hour}:${mins} ${amOrPm})`;
  } else {
    return "";
  }
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
  let time24HourFormat = `${hours}:${minutes}`;
  let time12HourFormat = calculate12HourFormat(hours, minutes);
  return `${formattedDay} <span class=highlighted-text>${time24HourFormat}</span> ${time12HourFormat}`;
}

let apiKey = "tbfob32e017e01391b34fe15b81ad2a6";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Madrid&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateCityAndTemp);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDate = new Date();
let currentDateELement = document.querySelector("#current-date");
currentDateELement.innerHTML = `Your time : ${formatDate(currentDate)}`;