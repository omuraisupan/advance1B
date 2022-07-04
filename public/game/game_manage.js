import { app } from "../app.js"
import { ref, update, get, getDatabase } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { Player } from "./player.js";

const uid = (new URL(document.location)).searchParams.get('uid');

const player = new Player(uid, 1000);

const turn = document.getElementById("turn");
const chip = document.getElementById("chip");
const excount = document.getElementById("ex");
const hand = document.getElementById("hand");
const card = document.querySelectorAll(".card");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const img4 = document.getElementById("img4");
const img5 = document.getElementById("img5");
const exchangeButtom = document.getElementById("exchangeButtom");
const betChip = document.getElementById("betChip");
const betAdd = document.getElementById("betAdd");
const betButtom = document.getElementById("betButtom");
const nextButtom = document.getElementById("nextButtom");
const mainmenu = document.getElementById('mainmenu');

document.getElementById("userId").textContent = player.getUserID();
excount.textContent = player.getExchangeCount();

const showCard = (() => {
  const cards = player.getCards();
  const img1src = "img/" + cards[0]["suit"] + cards[0]["num"] + ".png";
  const img2src = "img/" + cards[1]["suit"] + cards[1]["num"] + ".png";
  const img3src = "img/" + cards[2]["suit"] + cards[2]["num"] + ".png";
  const img4src = "img/" + cards[3]["suit"] + cards[3]["num"] + ".png";
  const img5src = "img/" + cards[4]["suit"] + cards[4]["num"] + ".png";
  img1.setAttribute("src", img1src);
  img2.setAttribute("src", img2src);
  img3.setAttribute("src", img3src);
  img4.setAttribute("src", img4src);
  img5.setAttribute("src", img5src);
});

showCard();

card.forEach((target) => {
  target.addEventListener("click", () => {
    target.classList.toggle("hold");
  });
});


exchangeButtom.addEventListener("click", () => {
  if (player.isBet()) {
    if (player.getExchangeCount() > 0) {
      const cards = player.getCards();
      card.forEach((target) => {
        if(target.classList.contains("hold")) {
          console.log(cards[target.id-1])
          player.exchange(cards[target.id-1]);
          target.classList.toggle("hold");
        }
      });
      showCard();
      player.decExchangeCount();
      console.log(player.getCards());
      excount.textContent = player.getExchangeCount();
    } else {
      alert("もう手札交換出来ません！")
    }
  } else {
    alert("ビットしてから手札交換をしてください！")
  }
});

betButtom.addEventListener("click", () => {
  const bet = betAdd.value;
  if (!player.isBet()) {
    if (bet < 10 || player.getChip() < bet) {
      alert("ビットするチップ数が有効ではありません！")
    } else {
      player.bit(betAdd.value);
  
      player.doBet();
      chip.textContent = player.getChip();
      betChip.textContent = player.getBetChip();
  
      betAdd.value = '';
    }
  } else {
    alert("既にビットしています！")
  }
});

nextButtom.addEventListener("click", () => {
  hand.textContent = player.checkHand();

  const deck = player.deckInit();
  player.cardInit( deck );

  chip.textContent = player.getChip();
  betChip.textContent = player.getBetChip();

  player.nextTurn();
  checkEnd();
})

mainmenu.addEventListener("click", () => {
  const uid = (new URL(document.location)).searchParams.get('uid');
  document.location.href = '../mainmenu?uid=' + uid;
})

const checkEnd = (() => {
  if ((player.getTurn() > 10)||(player.getChip() < 10) ){
    alert("ゲーム終了");
    let isHighScore = false;
    const db = getDatabase(app);
    const _ref = ref(db, '/users/' + uid);
    get(_ref).then((snapshot) => {
      if (player.getChip() > snapshot.val().highScore) {
        update(_ref, {
          highScore: player.getChip()
        })
        isHighScore = true;
      }
    })
    betAdd.remove();
    betButtom.remove();
    const score = document.getElementById('score');
    if (isHighScore) {
      score.textContent = "ハイスコア！" +  "スコア：" + player.getChip();
    } else {
      score.textContent = "スコア：" + player.getChip();
    }

  } else {
    turn.textContent = player.getTurn();
    showCard();
  }
});