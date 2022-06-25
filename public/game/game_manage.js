import { Player } from "./player.js";

const player = new Player("testuser", 1000);

const turn = document.getElementById("turn");
const chip = document.getElementById("chip");
const hand = document.getElementById("hand");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
const card5 = document.getElementById("card5");
const betChip = document.getElementById("betChip");
const betAdd = document.getElementById("betAdd");
const betButtom = document.getElementById("betButtom");

document.getElementById("userId").textContent = player.getUserID();

const showCard = (() => {
  const cards = player.getCards();
  const card1src = "img/" + cards[0]["suit"] + cards[0]["num"] + ".png";
  const card2src = "img/" + cards[1]["suit"] + cards[1]["num"] + ".png";
  const card3src = "img/" + cards[2]["suit"] + cards[2]["num"] + ".png";
  const card4src = "img/" + cards[3]["suit"] + cards[3]["num"] + ".png";
  const card5src = "img/" + cards[4]["suit"] + cards[4]["num"] + ".png";
  card1.setAttribute("src", card1src);
  card2.setAttribute("src", card2src);
  card3.setAttribute("src", card3src);
  card4.setAttribute("src", card4src);
  card5.setAttribute("src", card5src);
});

let isHold1 = false;
let isHold2 = false;
let isHold3 = false;
let isHold4 = false;
let isHold5 = false;

const changeHold = (() => {
  if (card1.value == "true") {
    card1.value = "false";
    isHold1 = false;
    card1.style.backgroundColor = "#b0c4de";
  } else {
    card1.value = "true";
    isHold1 = true;
    card1.style.backgroundColor = "#ffff00";
  }
});

card1.addEventListener("click", () => {
  changeHold();
  console.log(isHold1)
});


betButtom.addEventListener("click", () => {
  const bet = betAdd.value;
  if (bet < 10 || player.getChip() < bet) {
    alert("ビットするチップ数が有効ではありません！")
  } else {
    player.bit(betAdd.value);

    hand.textContent = player.checkHand();
    chip.textContent = player.getChip();
    betChip.textContent = player.getBetChip();

    const deck = player.deckInit();
    player.cardInit( deck );

    betAdd.value = '';

    player.nextTurn();
    checkEnd();
  }
});

const checkEnd = (() => {
  if (player.getTurn() > 10) {
    alert("ゲーム終了");
    betAdd.remove();
    betButtom.remove();
  } else {
    turn.textContent = player.getTurn();
    console.log(player.getTurn());
  }
});