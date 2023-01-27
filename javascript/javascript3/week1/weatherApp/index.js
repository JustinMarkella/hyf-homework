const userInput = document.querySelector("input");
let userCity;
let lat;
let lon;
let citiesWeather;
let sunrise;
let sunset;
let currentTime;
let iconsrc;
let map;
let findLat;
let findLon;
//Save my location optional
//  Checking if latitude and longitude was saved last time.
const localLat = localStorage.getItem("lat");
const localLon = localStorage.getItem("lon");
if (
  JSON.parse(localLat) !== " ".trim() &&
  JSON.parse(localLon) !== " ".trim()
) {
  lat = JSON.parse(localLat);
  lon = JSON.parse(localLon);
  getWeatherInfo();
}
// Getting link for user city API
document.querySelector(".butt1").addEventListener("click", defineUserCity);
function defineUserCity() {
  userCity = `http://api.openweathermap.org/geo/1.0/direct?q=${userInput.value}&limit=1&appid=31dd7dff87c1085463c902c9359e5fc9&units=metric`;
  getLatLon();
}

// Getting users longitude and latitude

async function getLatLon() {
  try {
    const response = await fetch(userCity);
    const data = await response.json();
    lat = data[0].lat;
    lon = data[0].lon;
    getWeatherInfo();
  } catch (error) {
    alert("Input is empty or city wasn't found");
  }
}
// Getting API with users lat and lon
async function getWeatherInfo() {
  citiesWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=31dd7dff87c1085463c902c9359e5fc9&units=metric`;
  const response = await fetch(citiesWeather);
  const data = await response.json();
  let city;
  //Change first letter of users city for lowercase to capital if user input !== city in API
  const cityLower = userInput.value.trim();
  if (cityLower.toLowerCase() !== data.name.toLowerCase() && cityLower !== "") {
    city = cityLower.charAt(0).toUpperCase() + cityLower.slice(1);
    document.querySelector(".main h2").innerText = ` ${city} (${data.name})`;
  } else {
    document.querySelector(".main h2").innerText = `${data.name}`;
  }
  // Getting all relevant info
  // document.querySelector(".main h2").innerText = ` ${city} (${data.name})`;
  document.querySelector(".temp").innerText = `${Math.round(
    data.main.temp
  )} °C`;
  document.querySelector(".wind").innerText = `Wind: ${Math.round(
    data.wind.speed
  )} m/sec`;
  document.querySelector(
    ".descr"
  ).innerText = `${data.weather[0].main} (${data.weather[0].description})`;
  sunrise = showTime(data.sys.sunrise);
  sunset = showTime(data.sys.sunset);
  document.querySelector(
    ".sun"
  ).innerHTML = `Sunrise at: ${sunrise}<br /> Sunset at: ${sunset}`;
  // Super-mega feature that works only in Europe(sometimes)!
  currentTime = showTime(data.dt);
  document.querySelector(".time").innerText = `Local time: ${currentTime}`;
  // Weather icon
  iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.querySelector(".clouds").src = `${iconsrc}`;
  document.querySelector(".clouds").alt = "weather-logo";
  window.initMap = initMap();
  //Add lat and lon to local storage (optional)
  localStorage.setItem("lat", JSON.stringify(lat));
  localStorage.setItem("lon", JSON.stringify(lon));
}
// Convert time from UNIX timestamp
function showTime(timestamp) {
  const date = new Date(timestamp * 1000).toLocaleTimeString();
  return date;
}
//User location
const locate = () =>
  navigator.geolocation.getCurrentPosition((position) => {
    findLat = position.coords.latitude;
    findLon = position.coords.longitude;
    console.log(findLat, findLon);
  });
locate();

// Optional a map showing where the city is located

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lon },
    zoom: 12,
  });
}

// Use my current position optional
document.querySelector(".myPos").addEventListener("click", showLocalWeather);
function showLocalWeather() {
  lat = findLat;
  lon = findLon;
  getWeatherInfo();
}
