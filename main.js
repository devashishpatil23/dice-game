"use strict";

const imageUrls = {
  img1: "https://i.postimg.cc/fVyHD3qR/dice-1.png",
  img2: "https://i.postimg.cc/gw6NLCW9/dice-2.png",
  img3: "https://i.postimg.cc/JDNxPj0P/dice-3.png",
  img4: "https://i.postimg.cc/dkPn25sh/dice-4.png",
  img5: "https://i.postimg.cc/zHqjM3R5/dice-5.png",
  img6: "https://i.postimg.cc/kDCfDYYZ/dice-6.png",
};

const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
let player0El = document.querySelector(".player--0");
let player1El = document.querySelector(".player--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting  Conditions
let scores, currentScore, activePlayer, playling;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playling = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hideDice");
  player0El.classList.remove("winner");
  player1El.classList.remove("winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  document.querySelector("#name--0").textContent = "Player 1";
  document.querySelector("#name--1").textContent = "Player 0";
};

init();
//  switch player funtion
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Rolling Dice funtion
btnRoll.addEventListener("click", function () {
  if (playling) {
    // generate random number
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display dice
    diceEl.classList.remove("hideDice");
    // generate random dice imges
    const randomImg = `img${dice}`;
    const randomImageUrl = imageUrls[randomImg];
    diceEl.src = randomImageUrl;

    // check if 1 or not
    if (dice !== 1) {
      // add dice number to curent score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer} `).textContent =
        currentScore;
    } else {
      // switch next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  // add current score to active player
  if (playling) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player score is >=100
    // finish the game
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("winner");
      document.querySelector(`.player--${activePlayer} h2`).textContent =
        "Winner 🏆";
      document.querySelector(`#current--${activePlayer}`).textContent = 0;
      playling = false;
    } else {
      switchPlayer();
    }
  }
});

// reset  game

btnNew.addEventListener("click", function () {
  init();
});
