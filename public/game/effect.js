'use strict'

// クリック時の効果音をつけるプログラムである   
// ワンクリック対応

// 2022/07/06 ダブルクリック時にも音が出るよう修正

// idの取得を行う
const exchangeButtom = document.getElementById('exchangeButtom'); // 手札交換
const betButtom = document.getElementById('betButtom'); // ビットする
const nextButtom = document.getElementById('nextButtom'); // 次のターン
const mainmenu = document.getElementById('mainmenu'); // メインメニューに戻る
const mute = document.getElementById('mute'); // ミュート
const card1 =document.getElementById('1');
const card2 =document.getElementById('2');
const card3 =document.getElementById('3');
const card4 =document.getElementById('4');
const card5 =document.getElementById('5');


// ボタンの効果音を追加
let buttonAudio_file = 'musics/クリック.mp3';
const buttonAudio = new Audio(buttonAudio_file);
buttonAudio.volume = 0.3;

//カードの効果音を追加
let cardAudio_file = 'musics/カードをめくる.mp3';
const cardAudio = new Audio(cardAudio_file);
cardAudio.volume = 0.3;

// ボタン効果音の実装
exchangeButtom.addEventListener('click', function(){
    cardAudio.currentTime = 0;
    buttonAudio.play();    
});

betButtom.addEventListener('click', function(){
    cardAudio.currentTime = 0;
    buttonAudio.play();
});

nextButtom.addEventListener('click', function(){
    cardAudio.currentTime = 0;
    buttonAudio.play();
});

mainmenu.addEventListener('click', function(){
    cardAudio.currentTime = 0;
    buttonAudio.play();
});

// カード効果音の実装
card1.addEventListener('click', function(){
    cardAudio.currentTime = 0;
    cardAudio.play();
});

card2.addEventListener('click', function(){
    cardAudio.currentTime = 0;
    cardAudio.play();
});

card3.addEventListener('click', function(){
    cardAudio.currentTime = 0;
    cardAudio.play();
});

card4.addEventListener('click', function(){
    cardAudio.currentTime = 0;
    cardAudio.play();
});

card5.addEventListener('click', function(){
    cardAudio.currentTime = 0;
    cardAudio.play();
});


