// 1. Log out the text Called after 2.5 seconds 2.5 seconds after the script is loaded.
function timeFunction() {
  setTimeout(() => {
    console.log("Called after 2.5 seconds");
  }, 2500);
}

// 2. Create a function that takes 2 parameters: delay and stringToLog.
// Calling this function should log out the stringToLog after delay seconds.
// Call the function you have created with some different arguments.
// const logStringAfterDelay = (delay, stringToLog) => {
//   setTimeout(() => console.log(stringToLog), delay * 1000);
// }
function logStringAfterDelay(delay, stringToLog) {
  setTimeout(() => console.log(stringToLog), delay * 1000);
}
logStringAfterDelay(3, "it!");
logStringAfterDelay(1, "I");
logStringAfterDelay(2, "did");
// 3. Create a button in html.
// When clicking this button, use the function you created in the previous task to log out the text:
// Called after 5 seconds 5 seconds after the button is clicked.
document
  .querySelector(".butt")
  .addEventListener("click", () =>
    logStringAfterDelay(5, "Called after 5 seconds")
  );

// 4. Create two functions and assign them to two different variables.
// One function logs out Earth, the other function logs out Saturn.
// Now create a new third function that has one parameter: planetLogFunction.
// The only thing the third function should do is call the provided parameter function.
// Try call the third function once with the Earth function and once with the Saturn function.
function earthLogger() {
  return console.log("Earth");
}
const saturnLogger = () => console.log("Saturn");
function planetLogFunction(planet) {
  planet();
}
planetLogFunction(earthLogger);
planetLogFunction(saturnLogger);

// 5. Create a button with the text called "Log location".
// When this button is clicked the location (latitude, longitude) of the user should be logged out using this browser api
const locate = () =>
  navigator.geolocation.getCurrentPosition((position) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>This is the latitude ${position.coords.latitude}</p><p>This is the longitude ${position.coords.longitude}</p>`;
    document.querySelector("main").appendChild(div);
  });
document.querySelector(".showLoc").addEventListener("click", locate);
// 6. Optional. Now show that location on a map using fx the Google maps api
let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 56.6951936, lng: 9.4928896 },
    zoom: 12,
  });
}
window.initMap = initMap;

// 7. Create a function called runAfterDelay.
// It has two parameters: delay and callback. When called the function should wait delay seconds and then call the provided callback function.
// Try and call this function with different delays and different callback functions
function runAfterDelay(delay, callback) {
  setTimeout(() => callback(), delay * 1000);
}
runAfterDelay(4, function () {
  console.log("should be logged after 4 seconds");
});

// 8. Check if we have double clicked on the page.
// A double click is defined by two clicks within 0.5 seconds.
// If a double click has been detected, log out the text: "double click!"
document.addEventListener("click", function (e) {
  if (e.detail === 2) {
    console.log("You did double click!");
    // alert("You did double click!"); With alert I can see that it works.
  }
});
// 9. Create a function called jokeCreator that has three parameters:
// shouldTellFunnyJoke - boolean, logFunnyJoke - function and logBadJoke - function.
// If you set shouldTellFunnyJoke to true it should call the logFunnyJoke function that should log out a funny joke.
// And vice versa.
function jokeCreator(shouldTellFunnyJoke) {
  if (shouldTellFunnyJoke === true) {
    logFunnyJoke();
  } else {
    logBadJoke();
  }
}
function logFunnyJoke() {
  console.log(`Helvetica and Times New Roman walk into a bar.
"Get out of here!" shouts the bartender. "We don't serve your type."`);
}
function logBadJoke() {
  console.log("What do you call a fish with no eyes? A fsh.");
}
jokeCreator(true);
