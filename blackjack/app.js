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

let windoWidth = window.screen.width;
let windowHeight = window.screen.height;
let winner;

document.querySelector("#hit").addEventListener("click", balckjackHit);

function balckjackHit() {
  let card = randomCard();
  showCard(card, YOU);
}

function randomCard() {
  let randomIndex = Math.floor(Math.random() * 13);
  return blackjack["cards"][randomIndex];
}
