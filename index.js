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

  let nextDay = date + 1;
  let ShortWeekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  console.log(nextDay);
  //let shortDay = ShortWeekDays[dateOfMonth.getDay()];
  // let nextday = document.querySelector(`#day1`);
  // nextday.innerHTML = `${shortDay}`;

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
  let date = document.querySelector("#date");

  cTemp = Math.round(response.data.temperature.current);

  city.innerHTML = response.data.city;
  tempElement.innerHTML = Math.round(cTemp);
  weatherElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `Humidity: ${Math.round(
    response.data.temperature.humidity
  )}%`;
  windSpeed.innerHTML = `Wind Speed: ${Math.round(
    response.data.wind.speed
  )}km/h`;

  date.innerHTML = "Last updated: " + showDate(response.data.time * 1000);
  weatherEmoji.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function pullData(event) {
  event.preventDefault();
  let cityGiven = document.querySelector(`#givenCity`);
  let city = cityGiven.value;

  let apiKey = "tbo44a605238adb4290d1a5ad61393fa";
  let apiLink = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiLink)
    .then(results)
    .catch((error) => {
      alert(`This location could not be found`);
    });
}

function iAmHere(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "tbo44a605238adb4290d1a5ad61393fa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;

  axios.get(`${apiUrl}`).then(results);
}

function showCTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(`#cityTemp`);
  tempElement.innerHTML = cTemp;
  fahrenheit.classList.replace("active", "non-active");
  celsius.classList.replace("non-active", "active");
}

function showFTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector(`#cityTemp`);
  fTemp = (cTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fTemp);
  fahrenheit.classList.replace("non-active", "active");
  celsius.classList.replace("active", "non-active");
}
let fTemp = null;
let cTemp = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCTemp);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFTemp);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(iAmHere);
}
let find = document.getElementById("find");
find.addEventListener("click", getCurrentPosition);

let lookUpCity = document.querySelector(`#searchButton`);
lookUpCity.addEventListener("click", pullData);
