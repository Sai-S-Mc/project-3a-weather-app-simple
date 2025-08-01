function handleApiResponse(response) {
  let apiResponse = response.data;

  if (apiResponse.message) {
    let formElement = document.querySelector("#search-form");
    formElement.classList.add("hidden");
    let mainSection = document.querySelector("#main-section");
    mainSection.innerHTML = `<h4>Are you sure that's a real place? Even the weather is confused🌀<br/>Please check the spelling and try again.</h4><button id ="error-button">Continue</button>`;
    let errorButton = document.querySelector("#error-button");
    errorButton.addEventListener("click", () => {
      location.reload();
    });
    return;
  }

  let city = apiResponse.city;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;

  let country = apiResponse.country;
  let countryElement = document.querySelector("#current-country");
  countryElement.innerHTML = country;

  let weatherDescription = apiResponse.condition.description;
  weatherDescription =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = `${weatherDescription}`;

  let humidity = Math.round(apiResponse.temperature.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}%`;

  let windSpeed = Math.round(apiResponse.wind.speed * 3.6);
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${windSpeed} km/h`;

  let weatherIcon = apiResponse.condition.icon;
  let weatherIconUrl = apiResponse.condition.icon_url;
  let weatherIconElement = document.querySelector("#current-temperature-icon");
  weatherIconElement.innerHTML = `<img src=${weatherIconUrl} alt=${weatherIcon} title = ${weatherIcon} />`;

  let temperature = Math.round(apiResponse.temperature.current);
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
  axios.get(apiUrl).then(handleApiResponse);
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
axios
  .get(apiUrl)
  .then(handleApiResponse)
  .catch((error) => {
    document.querySelector("#search-form").classList.add("hidden");
    document.querySelector(
      "#current-weather"
    ).innerHTML = `<h4>Oops! Something went wrong.<br/> We apologize for the inconvenience.<br/> Please try again later!</h4><button id ="error-button">Continue</button>`;
    document.querySelector("#error-button").addEventListener("click", () => {
      location.reload();
    });
  });

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDate = new Date();
let currentDateELement = document.querySelector("#current-date");
currentDateELement.innerHTML = `Your Local Time : ${formatDate(currentDate)}`;
