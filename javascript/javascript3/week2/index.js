const currency = document.querySelectorAll(".currency");
const button = document.querySelector(".exchange");
const api_url = `https://open.er-api.com/v6/latest/USD`;

async function getDataFromApi() {
  try {
    const response = await fetch(api_url);
    const data = await response.json();
    const currnecyCode = data.rates;
    function getCurrencies(obj) {
      for (const key in obj) {
        const value = obj[key];
        if (key === "DKK") {
          currency[0].innerHTML += `<option selected="selected" value=${value}>${key}</option>`;
        } else if (key === "EUR") {
          currency[1].innerHTML += `<option selected="selected" value=${value}>${key}</option>`;
        } else {
          currency[0].innerHTML += `<option value=${value}>${key}</option>`;
          currency[1].innerHTML += `<option value=${value}>${key}</option>`;
        }
      }
    }
    getCurrencies(currnecyCode);
  } catch (error) {
    console.log(error);
  }
}
getDataFromApi();

button.addEventListener("click", () => countAmount());
function countAmount() {
  let currencyFrom = currency[0].value;
  let currencyTo = currency[1].value;
  let amountValue = document.querySelector(".fromInput").value;
  if (amountValue <= 0) {
    alert("Please put a valid number");
  }
  let resultInput = document.querySelector(".toInput");
  let result = (amountValue / currencyFrom) * currencyTo;
  resultInput.value = `${result.toFixed(2)}`;
}
currency[0].addEventListener("change", () => countAmount());
currency[1].addEventListener("change", () => countAmount());
