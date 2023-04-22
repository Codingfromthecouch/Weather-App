function showDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function results(response) {
  console.log(response);
  let city = document.querySelector(`#cityName`);
  let tempElement = document.querySelector(`#cityTemp`);
  let weatherElement = document.querySelector(`#weatherDesc`);
  let weatherEmoji = document.querySelector("#weatherIcon");
  let humidityElement = document.querySelector(`#humid`);
  let windSpeed = document.querySelector(`#wind`);
  let sunElement = document.querySelector(`#sun`);
  let date = document.querySelector("#date");

  cTemp = Math.round(response.data.main.temp);

  city.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(cTemp);
  weatherElement.innerHTML = response.data.weather[0].main;
  humidityElement.innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  windSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  sunElement.innerHTML = `Sunrise:xxxxxxxxxx | sunset: xxxxx`;
  date.innerHTML = "Last updated: " + showDate(response.data.dt * 1000);
}

function pullData(event) {
  event.preventDefault();
  let cityGiven = document.querySelector(`#givenCity`);
  let city = cityGiven.value;

  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiUrl = `${apiLink}&appid=${apiKey}`;
  axios
    .get(apiUrl)
    .then(results)
    .catch((error) => {
      alert(`This location could not be found`);
    });
}

function iAmHere(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(results);
}

function showCTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(`#cityTemp`);
  tempElement.innerHTML = cTemp;
}

function showFTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(`#cityTemp`);
  fTemp = (cTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fTemp);
}
let fTemp = null;
let cTemp = null;

let celsius = document.querySelector("#cTemp");
celsius.addEventListener("click", showCTemp);

let fahrenheit = document.querySelector("#fTemp");
fahrenheit.addEventListener("click", showFTemp);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(iAmHere);
}
let find = document.getElementById("find");
find.addEventListener("click", getCurrentPosition);

let lookUpCity = document.querySelector(`#searchButton`);
lookUpCity.addEventListener("click", pullData);
