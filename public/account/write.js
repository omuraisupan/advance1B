import { ref, onValue, getDatabase} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { app } from "../app.js"
import { getParam } from "./highScore.js"

/* 6.18 kakishima

------------------------
arg : none
ret : none
------------------------
プライベート変数
_database: 呼び出したデータベース
_ref: databaseの場所
_ref2: databaseの場所
_url: 現在のページのURL
_highScore: ログインしているユーザのハイスコア
_highScore1: 現時点で1位のハイスコア
_highScore2: 現時点で2位のハイスコア
_highScore3: 現時点で3位のハイスコア
_userID: ログインしているのユーザID
_userID1: 現時点で1位のユーザID
_userID2: 現時点で2位のユーザID
_userID3: 現時点で3位のユーザID
_html11: 全体で1位のハイアスコアを表示
_html12: 全体で2位のハイアスコアを表示
_html13: 全体で3位のハイアスコアを表示
_html2: ログインしているユーザのユーザIDを表示
_html2: ログインしているユーザのハイスコアを表示
------------------------
ウィンドウが更新された時、全体でのハイスコアとログインしているユーザのユーザID・ハイスコアを表示
*/

window.onload = function writeHighScore(){
  const _database = getDatabase(app);
  const _ref = ref(_database, '/data/' + 'ranking/');
  onValue(_ref, (snapshot) => {
    let _highScore1 = parseInt(snapshot.val().highScore1);
    let _userID1 = snapshot.val().userID1;
    let _highScore2 = parseInt(snapshot.val().highScore2);
    let _userID2 = snapshot.val().userID2;
    let _highScore3 = parseInt(snapshot.val().highScore3);
    let _userID3 = snapshot.val().userID3;

    var _html11 = "1 : " + _userID1 + " " + _highScore1;
    var _html12 = "2 : " + _userID2 + " " + _highScore2;
    var _html13 = "3 : " + _userID3 + " " + _highScore3;
    document.getElementById("write1-1").textContent = _html11;
    document.getElementById("write1-2").textContent = _html12;
    document.getElementById("write1-3").textContent = _html13;

    const _url = window.location.href;
    const _userID = getParam("uid", _url);
    const _ref2 = ref(_database, '/users/' + _userID);
    onValue(_ref2, (snapshot) => {
      const _highScore = parseInt(snapshot.val().highScore);
      var _html21 = "YourUserID : " + _userID;
      var _html22 = "YourHighScore : " + _highScore;
      document.getElementById("write2-1").textContent = _html21;
      document.getElementById("write2-2").textContent = _html22;
    })
  })
}
