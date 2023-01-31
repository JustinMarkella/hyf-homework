const userInput = document.querySelector(".gifName");
let gifArray;
document.querySelector(".search").addEventListener("click", getGif);
async function getGif() {
  if (userInput.value.trim() === "") {
    alert("You forgot to enter giphy-name");
  } else if (amount.value === "") {
    giphys = `https://api.giphy.com/v1/gifs/search?api_key=Y55ch22OYmhAWV15dqMxf0PDOtgBzrlL&q=${userInput.value}&limit=10&offset=0&rating=g&lang=en`;
  } else if (amount.value) {
    giphys = `https://api.giphy.com/v1/gifs/search?api_key=Y55ch22OYmhAWV15dqMxf0PDOtgBzrlL&q=${userInput.value}&limit=${amount.value}&offset=0&rating=g&lang=en`;
  }
  // Fetch and respose data from API
  const response = await fetch(giphys);
  const info = await response.json();
  gifArray = info.data;
  remove();
  const ul = document.createElement("ul");
  const div = document.querySelector(".showGifs");
  div.appendChild(ul);
  renderGifs();
}
document.querySelector(".search").addEventListener("click", getGif);

// Render gifs
function renderGifs() {
  for (let i = 0; i < gifArray.length; i++) {
    const li = document.createElement("li");
    const ul = document.querySelector(".showGifs ul");
    li.innerHTML = `<img src = ${gifArray[i].images.fixed_width.url} alt=${gifArray[i].images.title}/>`;
    ul.appendChild(li);
  }
}

// Change amount of gifs after rendering
const amount = document.querySelector(".gifsAmount");
async function changeAmount() {
  remove();
  giphys = `https://api.giphy.com/v1/gifs/search?api_key=Y55ch22OYmhAWV15dqMxf0PDOtgBzrlL&q=${userInput.value}&limit=${amount.value}&offset=0&rating=g&lang=en`;
  const response = await fetch(giphys);
  const info = await response.json();
  gifArray = info.data;
  const ul = document.createElement("ul");
  const div = document.querySelector(".showGifs");
  div.appendChild(ul);
  renderGifs();
}
document.querySelector(".gifsAmount").addEventListener("input", changeAmount);

// Remove ul with results
async function remove() {
  document.querySelector(".showGifs ul").remove();
}
