import { ref, getDatabase, get, onValue} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { app } from "./app.js"
import { getParam } from "./highScore.js"

/* 7.03 kakishima
　 7.04 kaki onValue => get に変更

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
_html: 全体のハイアスコアを表示
_html2: ログインしているユーザのユーザID・ハイスコアを表示
------------------------
ウィンドウが更新された時、全体でのハイスコアとログインしているユーザのユーザID・ハイスコアを表示
*/

window.onload = function writeHighScore(){
  const _database = getDatabase(app);
  const _ref = ref(_database, '/data/' + 'ranking/');
  //get(_ref).then((snapshot) => {
  onValue(_ref, (snapshot) => {
    let _highScore1 = parseInt(snapshot.val().highScore1);
    let _userID1 = snapshot.val().userID1;
    let _highScore2 = parseInt(snapshot.val().highScore2);
    let _userID2 = snapshot.val().userID2;
    let _highScore3 = parseInt(snapshot.val().highScore3);
    let _userID3 = snapshot.val().userID3;
    var _html = "";
    _html += "--HIGHSCORE--" + "<br>";
    _html += "1 : " + _userID1 + " " + _highScore1 + "<br>";
    _html += "2 : " + _userID2 + " " + _highScore2 + "<br>";
    _html += "3 : " + _userID3 + " " + _highScore3 + "<br><br>";
    document.getElementById("write").innerHTML = _html;

    const _url = window.location.href;
    const _userID = getParam("userID", _url);
    const _ref2 = ref(_database, '/users/' + _userID);
    get(_ref2).then((snapshot) => {
    //onValue(_ref2, (snapshot) => {
      const _highScore = parseInt(snapshot.val().highScore);
      var _html2 = "";
      _html2 += "YourUserID : " + _userID  + "<br>" + "YourHighScore : " + _highScore + "<br>";
      document.getElementById("write2").innerHTML = _html2;
    })
  })
}
