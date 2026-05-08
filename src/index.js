// Global timer (prevents multiple intervals running)
let timer = null;

// Format and update time
function displayTime() {
  function updateTime() {
    let now = new Date();

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[now.getDay()];
    let hours = now.getHours();
    let minutes = String(now.getMinutes()).padStart(2, "0");

    let formattedTime = `${day} ${hours}:${minutes}`;

    let timeElement = document.querySelector("#time");
    timeElement.innerHTML = formattedTime;
  }

  if (timer) {
    clearInterval(timer);
  }

  updateTime();
  timer = setInterval(updateTime, 60000);
}

// Update weather data on screen
function displayWeather(response) {
  let data = response.data;

  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  let temperature = data.temperature.current;
  let description = data.condition.description;

  description = description.charAt(0).toUpperCase() + description.slice(1);

  cityElement.innerHTML = data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${data.wind.speed} mph`;
  getForecast(response.data.city);

  // Update time
  displayTime();

  // Update icon
  let iconElement = document.querySelector("#icon");
  if (data.temperature.current > 30) {
    iconElement.src =
      "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png";
  } else {
    iconElement.src = data.condition.icon_url;
  }
}

// Fetch weather data
function searchCity(city) {
  let apiKey = "534da33b5ce367f43atb4e240d7d01o0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

// Handle form submit
function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "534da33b5ce367f43atb4e240d7d01o0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(function (response) {
    console.log(response.data);
  });
}

function displayForecast(response) {
  console.log(response.data);
}

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSearchSubmit);

  // Default city
  searchCity("London");
});
