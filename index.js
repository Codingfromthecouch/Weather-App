function currentDate(now) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = weekDays[now.getDay()];
  let minutes = `${now.getMinutes()}`;
  let hours = `${now.getHours()}`;
  let dateAndTime = document.querySelector("#day_time");
  if (minutes < 10) {
    minutes = `0${now.getHours()}`;
  }
  if (hours < 10) {
    hours = `0${now.getHours()}`;
  }
  dateAndTime.innerHTML = `${day} ${hours}:${minutes}`;
}

function Rest_of_week() {
  let date = new Date();
  let tomorrowDate = new Date(date.getTime() + 1000 * 60 * 60 * 24);

  console.log(tomorrowDate);
  let short_weekdays = ["sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  console.log(short_weekdays[day]);
}

let now = new Date();
currentDate(now);

Rest_of_week();

function results(response) {
  console.log(response);
  let cityGiven = `${response.data.name}`;
  cityName.innerHTML = `${cityGiven}`;

  let temperature = Math.round(response.data.main.temp);
  let ftemp = Math.round(temperature * 1.8 + 32);
  let tempElement = document.querySelector(`#cityTemp`);
  let description = response.data.weather[0].description;
  tempElement.innerHTML = `${temperature}℃ ${ftemp}℉ | ${description}`;

  let humidity = response.data.main.humidity;
  let humidElement = document.querySelector(`#humid`);
  humidElement.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(`#wind`);
  windElement.innerHTML = `Wind: ${windSpeed}km/h`;
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

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(iAmHere);
}

let find = document.getElementById("find");
find.addEventListener("click", getCurrentPosition);

let lookUpCity = document.querySelector(`#searchButton`);
lookUpCity.addEventListener("click", pullData);
