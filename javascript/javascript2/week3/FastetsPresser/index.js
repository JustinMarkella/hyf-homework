// Confetti function
const canvas = document.querySelector("#my-confetti");
const jsConfetti = new JSConfetti();

let timerStarter;
let timerStoped = true;
let clInterval;
let clInterval2;
let s = 0;
let l = 0;
let userInput = document.querySelector("input");

// Coundown before game started
function countDownBeforeStart() {
  if (userInput.value === " ".trim()) {
    alert("Put valid number");
  } else if (timerStoped === true) {
    document.querySelector(".start").disabled = true;
    s = 0;
    document.querySelector(".sResult p").innerText = `${s}`;
    l = 0;
    document.querySelector(".lResult p").innerText = `${l}`;
    document.querySelector("h3").innerHTML = ` `;
    let secs = 4;
    clInterval = setInterval(tick, 1000);
    function tick() {
      secs--;
      document.querySelector("h2").innerHTML = secs;
      if (secs === 0) {
        clearInterval(clInterval);
        document.querySelector("h2").innerHTML = `GO!`;
        timer();
      }
    }
  }
}

// Ingame countdown
function timer() {
  let roundTime = userInput.value;
  clInterval2 = setInterval(tick, 1000);
  function tick() {
    roundTime--;
    document.querySelector("h3").innerHTML = roundTime;
    if (roundTime === 0) {
      clearInterval(clInterval2);
      document.querySelector("h3").innerHTML = `Game is over!`;
    }
  }
  timerStoped = false;
  s = 0;
  l = 0;
  document.querySelector(".lResult p").innerText = `${l}`;
  document.querySelector(".sResult p").innerText = `${s}`;
  window.addEventListener("keyup", count);
  timerStarter = setTimeout(() => {
    if (s > l && timerStoped === false) {
      document.querySelector(".winner").innerHTML = `<p>Player S wins!</p>`;
      jsConfetti.addConfetti();
    } else if (s < l && timerStoped === false) {
      document.querySelector(".winner").innerHTML = `<p>Player L wins!</p>`;
      jsConfetti.addConfetti();
    } else if (s === l && timerStoped === false) {
      document.querySelector(".winner").innerHTML = `<p>DRAAAAAAW!</p>`;
    }
    timerStoped = true;
    document.querySelector(".start").disabled = false;
  }, userInput.value * 1000);
  return;
}

// Key count function
function count(e) {
  if (e.key === "s" && timerStoped === false) {
    document.querySelector(".sResult p").innerText = `${(s += 1)}`;
  } else if (e.key === "l" && timerStoped === false) {
    document.querySelector(".lResult p").innerText = `${(l += 1)}`;
  } else if (timerStoped === true) {
    window.removeEventListener("keyup", count);
  }
}
document
  .querySelector(".start")
  .addEventListener("click", countDownBeforeStart);

// Reset game option
document.querySelector(".reset").addEventListener("click", () => {
  location.reload();
});

// .onclick = resetGame; Please don't mind about this function. It was just a waste of time.
// I can't realise why I can't start the game again if reset button was clicked during
// ingame coundown.

// I'll keep this comment just for memory 🥲

// function resetGame() {
//   timerStoped === true;
//   s = 0;
//   document.querySelector(".sResult").innerHTML = `<p>${s}</p>`;
//   l = 0;
//   document.querySelector(".lResult").innerHTML = `<p>${l}</p>`;
//   window.removeEventListener("keyup", count);
//   clearInterval(clInterval);
//   clearInterval(clInterval2);
//   document.querySelector("h2").innerHTML = " ";
//   document.querySelector("h3").innerHTML = ` `;
//   if (document.querySelector(".start").disabled === true) {
//     document.querySelector(".start").disabled = false;
//   }
// }
