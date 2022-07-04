'use strict';

var playlist = [
  'musics/moonlightcafe.mp3',
  'musics/yume.mp3',
  'musics/mizunonakanotsuki.mp3'
]
let now_file = playlist[0];

// 要素
const music = new Audio(now_file);
const play = document.getElementById('play');
const volumeUp = document.getElementById('volume-up');
const volumeDown = document.getElementById('volume-down');
const mute = document.getElementById('mute');
const btn_back = document.getElementById("btn_back");
const btn_forward = document.getElementById("btn_forward");
const btn_previous = document.getElementById("btn_previous");
const btn_after = document.getElementById("btn_after");
const crtTime = document.getElementById('timeviewr');
 // <input type="range">
const seekbar = document.querySelector("#seekbar");
// <span>
const curtime = document.querySelector("#curtime");
// <span>
const alltime = document.querySelector("#alltime");
let duration = 0;
let timerid;
var index = 0;

// 再生ボタン
play.addEventListener('click', function(){
  if(!music.paused){
    play.innerHTML ="再生";
    music.pause();
  }else{
    play.innerHTML = "停止";
    music.play();
  }
});

// 音量ボタン
volumeUp.addEventListener('click', function(){
  const volume = music.volume;
  if(volume < 1){
    music.volume = (volume * 10 + 1) / 10;
  }
});
volumeDown.addEventListener('click', function(){
  const volume = music.volume;
  if(volume > 0){
    music.volume = (volume * 10 - 1) / 10;
  }
});

// ミュートボタン
mute.addEventListener('click', function(){
  if(music.muted){
    music.muted = false;
  }else{
    music.muted = true;
  }
});

//10s巻き戻しボタン
btn_back.addEventListener('click', function(e){
  music.currentTime -= 10;
});

//10sスキップボタン
btn_forward.addEventListener('click', function(e){
  music.currentTime += 10;
});

btn_after.addEventListener('click', function(e){
  music.currentTime = music.duration;
});

btn_previous.addEventListener('click', function(e){
  if(music.currentTime < 1 && index > 0){
    index--;
    music.src = playlist[index];
    music.play();
  }else{
    music.currentTime = 0;
  }
})


music.addEventListener('ended', function(){
  index++;
  if (index < playlist.length) {
    music.src = playlist[index];
    music.play();
  }
  else {
    music.src = playlist[0];
    music.play();
    index = 0;
  }
});

// 時間表示
  music.addEventListener('timeupdate', function(){
    var sec = '0' + Math.floor(music.currentTime % 60); // 秒数
    var min = '0' + Math.floor(music.currentTime / 60); // 分数
    sec = sec.substr(sec.length-2, 2);
    min = min.substr(min.length-2, 2);
    var totalSec ='0' + Math.floor(music.duration % 60); //秒数
    var totalMin ='0' + Math.floor(music.duration / 60); //分数
    totalSec = totalSec.substr(totalSec.length-2, 2);
    totalMin = totalMin.substr(totalMin.length-2, 2);
    crtTime.innerHTML = min + ":" + sec + ' [' +  totalMin + ':' + totalSec + ']';
  }, true);