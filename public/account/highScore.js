import { ref, set, onValue, getDatabase } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { app } from "./app.js"

/* 6.18 kakishima

------------------------
arg : none
ret : none
------------------------
プライベート変数
_userID: ページに入力されたユーザIDを格納
_password: ページに入力されたパスワードを格納
_database: 呼び出したデータベースを格納
_ref: databaseの場所
_url: 現在のページのURL
------------------------
そのユーザIDの持ち主のハイスコアを更新する
成功：updata highScore successと表示し、highScoreを更新する
失敗：updata highScore failedと表示する
*/

highScore.addEventListener('click',(e) => {
  const _highScore = document.getElementById('highScore').value;
  //const _database = returnDatabase();
  const _database = getDatabase(app);
  const _url = window.location.href; //URLの取得
  const _userID = getParam("userID", _url);
  const _ref = ref(_database, '/users/' + _userID);        
        
  onValue(_ref, (snapshot) => {
    const _data = snapshot.val();
    const _password = _data.password;
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
  });
})


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

function getParam(name, url) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var _regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  var _results = _regex.exec(url);
  if (!_results) return null;
  if (!_results[2]) return '';
  return decodeURIComponent(_results[2].replace(/\+/g, " "));
}
