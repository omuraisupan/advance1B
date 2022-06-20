//ルーム画面のゲーム開始の非活性化
if (isGameReady == true) {
    document.getElementById('readyButton').style.visibility = 'disabled';
}

//プレイヤーIDの取得
document.getElementById(otherPlayer1).innerHTML = checkHand(_cards)
document.getElementById(otherPlayer2).innerHTML = checkHand(_cards)
document.getElementById(otherPlayer3).innerHTML = checkHand(_cards)
document.getElementById(otherPlayer4).innerHTML = checkHand(_cards)