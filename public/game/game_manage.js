import { app } from "../app.js"
import { ref, update, get, getDatabase } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { Player } from "./player.js";
import { setHighScore } from "../account/highScore.js";

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

/* 7.12 omu

7.12 コメント作成 (omu)
-----------------------
showCard()

-----------------------
手札を描画します

*/
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

// 手札を描画（初期処理）
showCard();

// クリックしたら交換するフラグを付けます
card.forEach((target) => {
  target.addEventListener("click", () => {
    target.classList.toggle("hold");
  });
});

/* 7.12 omu
  
  7.12 コメント作成(omu)
  ------------------------
  手札交換ボタンの処理
  ------------------------
*/
exchangeButtom.addEventListener("click", () => {

  // ベット済みでなければエラーメッセージ
  if (player.isBet()) {

    // 手札交換回数が残ってなければエラーメッセージ
    if (player.getExchangeCount() > 0) {

      // 交換フラグが付いたカードを交換
      const cards = player.getCards();
      card.forEach((target) => {
        if(target.classList.contains("hold")) {
          console.log(cards[target.id-1])
          player.exchange(cards[target.id-1]);
          target.classList.toggle("hold");
        }
      });

      // 新しい手札を描画
      showCard();

      // 手札交換回数を 1減らす
      player.decExchangeCount();
      console.log(player.getCards());

      // 手札交換回数を再表示
      excount.textContent = player.getExchangeCount();
    } else {

      // 手札交換回数が残ってないのでエラーメッセージ
      alert("もう手札交換出来ません！")
    }
  } else {

    // ベット済みでないのでエラーメッセージ
    alert("ビットしてから手札交換をしてください！")
  }
});


/* 7.12 omu

  7.12 コメント作成(omu)
  ------------------------
  ベットボタンの処理
  ------------------------
*/
betButtom.addEventListener("click", () => {
  const bet = betAdd.value;

  // ベット済みならエラーメッセージ
  if (!player.isBet()) {

    // ビットするチップ数 < 100 or 持ちチップ数以上に賭けていたらエラーメッセージ
    if (bet < 100 || player.getChip() < bet) {

      // ビットできないのでエラーメッセージ
      alert("ビットするチップ数が有効ではありません！")
    } else {
      // 主処理

      // ビットさせる
      player.bit(betAdd.value);

      player.doBet();

      // チップ数を再表示
      chip.textContent = player.getChip();
      betChip.textContent = player.getBetChip();
  
      betAdd.value = '';
    }
  } else {

    // ベット済みなのでエラーメッセージ
    alert("既にビットしています！")
  }
});


/* 7.12 omu
  
  7.12 コメント作成(omu)
  ------------------------
  次のターンの処理
  ------------------------
*/
nextButtom.addEventListener("click", () => {

  // ベット済みなら処理をする
  if (player.isBet()) {

    // 手札の役判定
    hand.textContent = player.checkHand();

    // 手札・デッキを初期化
    const deck = player.deckInit();
    player.cardInit( deck );
    
    // チップの処理
    chip.textContent = player.getChip();
    betChip.textContent = player.getBetChip();

    // 次のターンのためにplayerオブジェクトのメソッド呼び出し
    player.nextTurn();

    // 終了判定
    checkEnd();
  } else {

    // ベットしてなければエラーメッセージ
    alert("ビットしてください！");
  }
})

/*  7.12 omu

  7.12 コメント作成(omu)
  ------------------------
  メインメニューに戻るボタンの処理
  ------------------------

  メインメニューに戻ります
*/
mainmenu.addEventListener("click", () => {
  const uid = (new URL(document.location)).searchParams.get('uid');
  document.location.href = '../mainmenu?uid=' + uid;
})

/* 7.12 omu

7.12 コメント作成 (omu)
-----------------------
checkEnd()

-----------------------
ゲーム終了判定・ゲーム終了処理を行います。

*/
const checkEnd = (() => {

  // ターン数 > 100 or 持ちチップ数 < 10　なら終了
  if ((player.getTurn() > 10)||(player.getChip() < 100) ){
    alert("ゲーム終了");

    // ハイスコア更新処理
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
    setHighScore(player.getChip());

    // ゲーム中のボタンを削除
    betAdd.remove();
    betButtom.remove();
    nextButtom.remove();
    exchangeButtom.remove();

    // スコアを表示
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