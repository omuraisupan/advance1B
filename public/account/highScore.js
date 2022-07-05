import { ref, set, getDatabase, get} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { app } from "../app.js"

/* 6.18 kakishima
　 7.04 kaki onValue => get に変更

------------------------
arg : none
ret : none
------------------------
プライベート変数
_userID: ページに入力されたユーザID
_password: ページに入力されたパスワード
_database: 呼び出したデータベース
_ref: databaseの場所
_url: 現在のページのURL
_highScore: 入力されたハイスコア
_highScore0: 現時点でのハイスコア
------------------------
そのユーザIDの持ち主のハイスコアを更新する
成功：updata highScore successと表示し、highScoreを更新する
失敗：updata highScore failedと表示する
*/

//inputHighScore.addEventListener('click',(e) => {
  //const _highScore = document.getElementById('highScore').value;
export function inputHighScore(_highScore){
  const _database = getDatabase(app);
  const _url = window.location.href; //URLの取得
  const _userID = getParam("uid", _url);
  const _ref = ref(_database, '/users/' + _userID);        
        
  //onValue(_ref, (snapshot) => {
  get(_ref).then((snapshot) => {
    const _data = snapshot.val();
    const _password = _data.password;
    const _highScore0 = parseInt(_data.highScore);
    if(_highScore0 < _highScore){
      set(_ref, {
        password: _password,
        highScore: _highScore
      })
      .then(() => {
        console.log('updata highScore success');
      })
      .catch((error) => {
        console.log('updata highScore failed');
      });
    }else{
      console.log("inputhighscore 更新なし");
    }
  });
  setHighScore(_highScore);
}
//)


/* 6.26 kakishima

------------------------
arg : name = URLから取り出したいものの名前
      url = 対称のURL
ret : urlにおいてnameで指定した項目の値
------------------------
プライベート変数
_regex: 正規表現にしたname
_results: urlから_regexの内容があるかを検索した結果
------------------------
URLからnameで指定した項目を出力する
*/

export function getParam(name, url) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var _regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var _results = _regex.exec(url);
  if (!_results) return null;
  if (!_results[2]) return '';
  return decodeURIComponent(_results[2].replace(/\+/g, " "));
}


/* 6.30 kakishima
　 7.04 kaki onValue => get に変更
------------------------
arg : _highScore = 入力されたハイスコア(ゲーム終了時のスコア)
ret : none
------------------------
プライベート変数
_database: 呼び出したデータベース
_ref: databaseの場所
_url: 現在のページのURL
_highScore0: 入力されたハイスコア(ゲーム終了時のスコア)
_highScore1: 現時点で1位のハイスコア
_highScore2: 現時点で2位のハイスコア
_highScore3: 現時点で3位のハイスコア
_userID0: urlから取得した現在のプレイ中のユーザID
_userID1: 現時点で1位のユーザID
_userID2: 現時点で2位のユーザID
_userID3: 現時点で3位のユーザID
------------------------
全体のハイスコアを更新
*/

//setHighScore.addEventListener('click',(e) => {
  //const _highScore = document.getElementById('highScore').value;
export function setHighScore(_highScore){
  let _highScore0 = _highScore;
  const _database = getDatabase(app);
  const _ref = ref(_database, '/data/' + 'ranking/');
  get(_ref).then((snapshot) => {
  //onValue(_ref, (snapshot) => {
    const _url = window.location.href;
    let _userID0 = getParam("uid", _url);
    let _highScore1 = parseInt(snapshot.val().highScore1);
    let _userID1 = snapshot.val().userID1;
    let _highScore2 = parseInt(snapshot.val().highScore2);
    let _userID2 = snapshot.val().userID2;
    let _highScore3 = parseInt(snapshot.val().highScore3);
    let _userID3 = snapshot.val().userID3;
    
    if(_highScore3 < _highScore0){
    let _change = _highScore0;
    _highScore0 = _highScore3;
    _highScore3 = _change;
    _change =_userID0;
    _userID0 = _userID3;
    _userID3 = _change;
    //console.log("h0 = " + _highScore0 + " h3 = " + _highScore3);
      if(_highScore2 < _highScore3){
        _change = _highScore3;
        _highScore3 = _highScore2;
        _highScore2 = _change;
        _change =_userID3;
        _userID3 = _userID2;
        _userID2 = _change;
        //console.log("h2 = " + _highScore2 + " h3 = " + _highScore3);
        if(_highScore1 < _highScore2){
          _change = _highScore2;
          _highScore2 = _highScore1;
          _highScore1 = _change;
          _change =_userID2;
          _userID2 = _userID1;
          _userID1 = _change;
          //console.log("h1 = " + _highScore1 + " h2 = " + _highScore2);
        }
      }
    }
    set(_ref, {
      highScore1: _highScore1,
      highScore2: _highScore2,
      highScore3: _highScore3,
      userID1: _userID1,
      userID2: _userID2,
      userID3: _userID3
    })
    .then(() => {
      //console.log(_highScore1 + " " + _highScore2 + " " + _highScore3);
      console.log('sethighscore success');
    })
    .catch((error) => {
      console.log('sethighscore failed');
    });
  });
}
//)
