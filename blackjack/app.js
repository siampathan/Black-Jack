let blackjack = {
  you: {
    scoreSpan: "#your-result",
    div: "#your-box",
    boxSize: ".flex-table-2 div",
    score: 0,
  },

  dealer: {
    scoreSpan: "#dealer-result",
    div: "#dealer-box",
    boxSize: ".flex-table-2 div",
    score: 0,
  },

  cards: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
  cardsMap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    K: 10,
    J: 10,
    Q: 10,
    A: [1, 11],
  },

  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  isTrunover: false,
  pressOnce: false,
};

const YOU = blackjack["you"];
const DEALER = blackjack["dealer"];

const winSound = new Audio("sounds/sounds_cash.mp3");
const hitSound = new Audio("sounds/sounds_swish.m4a");
const lostSound = new Audio("sounds/sounds_aww.mp3");

let windoWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

document.querySelector("#hit").addEventListener("click", blackjackHit);
document.querySelector("#stand").addEventListener("click", blackjackStand);
document.querySelector("#dealer").addEventListener("click", blackjackDeal);
document.querySelector("#reset").addEventListener("click", blackjackRestart);

function blackjackHit() {
  if (blackjack["isStand"] === false) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
    hitSound.play();
  }
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjack["cards"][randomIndex];
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let cardImage = document.createElement("img");
    cardImage.src = `images/${card}.png`;
    cardImage.style = `width : ${widthSize}; height : ${heightSize};`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
  }
}

function widthSize() {
  if (windoWidth > 1000) {
    let newWindoWith = window.screen.width * 0.1;
    return newWindoWith;
  } else return window.screen.width * 0.18;
}

function heightSize() {
  if (windowHeight > 700) {
    let newWindoHeight = window.screen.height * 0.18;
    return newWindoHeight;
  } else return window.screen.height * 0.15;
}

function updateScore(card, activePlayer) {
  if (card === "A") {
    if (activePlayer["score"] + blackjack["cardsMap"][card][1] <= 21) {
      activePlayer["score"] += blackjack["cardsMap"][card][1];
    } else activePlayer["score"] += blackjack["cardsMap"][card][0];
  } else activePlayer["score"] += blackjack["cardsMap"][card];
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
    document.querySelector(activePlayer["scoreSpan"]).style.color = "red";
  } else
    document.querySelector(activePlayer["scoreSpan"]).textContent =
      activePlayer["score"];
}

function blackjackStand() {
  if (blackjack.pressOnce === false) {
    blackjack["isStand"] = true;
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");

    for (let i = 0; i < yourImages.length; i++) {
      let card = randomCard();
      showCard(card, DEALER);
      updateScore(card, DEALER);
      showScore(DEALER);

      blackjack["isTrunover"] = true;
    }
  }

  blackjack.pressOnce = true;

  computerWinner();
  showWinner(winner);
}

function computerWinner() {
  if (YOU["score"] <= 21) {
    if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) winner = YOU;
    else if (YOU["score"] < DEALER["score"]) winner = DEALER;
    else winner = "DRAW";
  } else if (YOU["score"] > 21 && DEALER["score"] <= 21) winner = DEALER;
  else winner = "None";

  return winner;
}

function showWinner() {
  let message, messageColor;
  if (winner == YOU) {
    message = "YOU Won!";
    messageColor = "#00e676";
    document.querySelector("#win").textContent = blackjack["wins"] += 1;
    winSound.play();
  }
  if (winner == DEALER) {
    message = "YOU LOST!";
    messageColor = "red";
    document.querySelector("#loss").textContent = blackjack["losses"] += 1;
    lostSound.play();
  }
  if (winner == "Draw") {
    message = "YOU Draw!";
    messageColor = "yellow";
    document.querySelector("#draw").textContent = blackjack["draws"] += 1;
  }
  if (winner == "None") {
    message = "YOU Both Busted!";
    messageColor = "orange";
  }

  document.querySelector("#result").textContent = message;
  document.querySelector("#result").style.color = messageColor;
}

function blackjackDeal() {
  if (blackjack["isTrunover"] === true) {
    let yourImages = document
      .querySelector("#your-box")
      .querySelectorAll("img");

    let dealerImages = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");

    YOU["score"] = DEALER["score"] = 0;
    document.querySelector("#your-result").textContent = 0;
    document.querySelector("#dealer-result").textContent = 0;

    document.querySelector("#your-result").style.color = "white";
    document.querySelector("#dealer-result").style.color = "white";

    document.querySelector("#result").textContent = "Let's Play";
    document.querySelector("#result").style.color = "white";

    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
      dealerImages[i].remove();
    }

    blackjack["isStand"] = false;
    blackjack.pressOnce = false;
    blackjack["isTrunover"] = false;
  }
}

function blackjackRestart() {
  blackjackDeal();

  document.querySelector("#win").textContent = 0;
  document.querySelector("#draw").textContent = 0;
  document.querySelector("#loss").textContent = 0;

  blackjack.wins = 0;
  blackjack.draws = 0;
  blackjack.losses = 0;
}
