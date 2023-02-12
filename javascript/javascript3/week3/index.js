let screenshotUrl;
const userEmail = document.querySelector(".userEmail");
const userPassword = document.querySelector(".userPassword");
const form = document.querySelector(".mainForm");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": `${RAPID_API_KEY}`,
    "X-RapidAPI-Host": `${RAPID_API_HOST}`,
  },
};
//Get an URL of website from user and pub its screenshot

async function getScreenshot() {
  const inputElement = document.querySelector(".userInput");
  try {
    const response = await fetch(
      `https://${RAPID_API_HOST}/screenshot?url=https%3A%2F%2F${inputElement.value}&width=1920&height=1080&fullscreen=true`,
      options
    );
    const data = await response.json();
    screenshotUrl = data.screenshotUrl;
    showScreenshot();
    document.querySelector(".messageForUser").innerHTML = "";
  } catch (error) {
    console.log(error);
  }
}

function showPubToUser() {
  document.querySelector(".messageForUser").innerHTML =
    "Please wait... Publishing your screenshot";
}
function showSendingProcess() {
  document.querySelector(".messageForUser").innerHTML =
    "Your screenshot was published on the server";
}
function showScreenshot() {
  const image = document.querySelector(".screenshot");
  image.src = `${screenshotUrl}`;
  image.alt = "website-screenshot";
}
async function postData() {
  const inputElement = document.querySelector(".userInput");
  const userEmailValue = userEmail.value;
  try {
    const userInput = inputElement.value;
    await fetch(`https://crudcrud.com/api/${CRUDCRUD_API_KEY}/savedlinks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ userInput, screenshotUrl, userEmailValue }),
    });
    showSendingProcess();
  } catch (error) {
    console.log(error);
  }
}

// Get data (list of saved screenshots and website links).
async function getData() {
  document.querySelector(".screenshot").classList.add("hide");
  document.querySelector(".messageForUser").innerHTML = "";
  try {
    const response = await fetch(
      `https://crudcrud.com/api/${CRUDCRUD_API_KEY}/savedlinks`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    const listElement = document.querySelector(".listOutput");
    listElement.innerHTML = "";
    data.forEach((element) => {
      if (element.userEmailValue === userEmail.value) {
        listElement.innerHTML += `<p>${element._id}</p>
      <img class="screenshot" src="${element.screenshotUrl}" alt="${element.screenshotUrl} screenshot">
      <button data-id="${element._id}" class="deleteScreenshot">Delete</button>`;
      }
    });

    [...document.querySelectorAll(".deleteScreenshot")].forEach((element) => {
      element.addEventListener("click", deleteData);
    });
  } catch (error) {
    console.log(error);
  }
}

// Delete data (screenshot + id)
async function deleteData(event) {
  try {
    const id = event.target.dataset.id;
    const response = await fetch(
      `https://crudcrud.com/api/${CRUDCRUD_API_KEY}/savedlinks/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    getData();
  } catch (error) {
    console.log(error);
  }
}

// EXTRA and EXTRA EXTRA

//Create two users
async function sendUserData() {
  const formData = new FormData(form);
  const user1 = { email: "anita@gmail.com", password: "1234" };
  const user2 = { email: "pedro@gmail.com", password: "4321" };
  await fetch(`https://crudcrud.com/api/${CRUDCRUD_API_KEY}/users`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(user1),
    body: JSON.stringify(user2),
  }).catch((error) => console.log(error));
}
sendUserData();

//If the email and password matches the one user we created we show the applications else we show an error message.
document.querySelector(".loginBut").addEventListener("click", showApplication);
async function showApplication() {
  try {
    const response = await fetch(
      `https://crudcrud.com/api/${CRUDCRUD_API_KEY}/users`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    let userFound = false;
    for (let i = 0; i < data.length; i++) {
      const listItem = document.createElement("li");
      if (
        userEmail.value === data[i].email &&
        userPassword.value === data[i].password
      ) {
        userFound = true;
        document.querySelector(".screenshotBlock").innerHTML = `
        <input type="text" class="userInput" />
        <button class="getInput">Take a screenshot</button>
        <button class="saveScreenshot">Save the screenshot</button>
        <button class="showSavedScreenshots">Show list of saved screenshots</button>
        <div class="listOutput"></div>
        <div class="imageOutput">
          <img src="" class="screenshot" />
        </div>`;
        document
          .querySelector(".getInput")
          .addEventListener("click", showPubToUser);
        document
          .querySelector(".getInput")
          .addEventListener("click", getScreenshot);
        document
          .querySelector(".saveScreenshot")
          .addEventListener("click", postData);
        document
          .querySelector(".showSavedScreenshots")
          .addEventListener("click", getData);
      }
      //Show list of users
      else {
        console.log(data[i].email);
      }
    }
    if (userFound === false) {
      alert("user was not found");
    }
  } catch (error) {
    console.log(error);
  }
}
