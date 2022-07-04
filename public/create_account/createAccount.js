import { ref, set, getDatabase, get } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { app } from "../app.js"

const createAccount = document.getElementById("createAccount");

/* 6.27 omu

6.27 omu
6.18 kakishima
------------------------
arg : none
ret : none
------------------------
_userID: ページに入力されたユーザIDを格納
_password: ページに入力されたパスワードを格納
_database: 呼び出したデータベースを格納
_ref: databaseの場所
------------------------
アカウント作成
ユーザIDとパスワードを登録する
データの初期化

データベースの構造↓
users
  -userid
    -password: "****"
    -highScore: "****"
*/

createAccount.addEventListener('click',(e) => {
  e.preventDefault();      
  const _userID = document.getElementById('userID').value;      
  const _password = document.getElementById('password').value;
  const _password2 = document.getElementById('password2').value;
  const _database = getDatabase(app);
  const _ref = ref(_database, '/users/' + _userID);

  get(_ref).then((snapshot) => {
    if ( !snapshot.exists() && passwordCheck(_password, _password2) ){
      set(_ref, {
        password: _password,
        highScore: 0
      })
      .then(() => {
        //listOfUserID(_userID);
        let url = new URL('./mainmenu', document.location.protocol + document.location.host);
        url.searchParams.append('uid', _userID);
        document.location.href = url;
      })
      .catch((error) => {
        alert('createAccount failed');
      });
    } else if ( snapshot.exists() ) {
      alert("既存のユーザIDです。変更してください")
    }
  })
})


/* 6.18 kakishima
------------------------
arg : _password = 設定予定のパスワード
      _password2 = 再入力のパスワード
ret : 成功 => 1
      失敗 => 0
------------------------
再入力したパスワードの一致を確認
*/

function passwordCheck(_password, _password2) {
  if (_password == _password2) {
    if(_password.length >= 6){
      //成功
      console.log('passcheck=t');
      return true;
    }else{
      alert('パスワードが6文字未満です');
      console.log('passcheck=f');
      return false;
    }
  } else {
    //失敗
    alert('パスワード(再入力)が違います');
    console.log('passcheck=false');
    return false;
  }
}

//未完----------------------------------------


//ユーザIDのリスト
function listOfUserID(_userID){
  const _database = getDatabase(app);
  const _ref = ref(_database, '/uidList/' + _userID);
  set(_ref, {
    userID: _userID
  })
}
