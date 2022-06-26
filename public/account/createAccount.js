import { ref, set, getDatabase, onValue } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { app } from "./app.js"

/* 6.18 kakishima
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

  //console.log('userID = ' + _userID);
  //console.log('password = ' + _password);
  
  const check = checkUserID(_userID);

  if(passwordCheck(_password, _password2) == 1){
    set(_ref, {
      password: _password,
      highScore: 0
    })
    .then(() => {
      listOfUserID(_userID);
      alert('createAccount success');
    })
    .catch((error) => {
      alert('createAccount failed');
    });
  }
});


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
    //成功
    console.log('passcheck=t');
    return 1;
  } else {
    //失敗
    alert('パスワード(再入力)が違います');
    console.log('passcheck=f');
    return 0;
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


//既存のuserIDと重複してないか確認
//userIDいれて値帰ってきたらerror
function checkUserID(userID){
  const _database = getDatabase(app);
  const _ref = ref(_database, '/uidList/' + userID );
  onValue(_ref, (snapshot) => {
    const _data = snapshot.val();
    const _tes = _data.userID;
    console.log('tes = ' + _tes);
    if(_tes != null){
      //failed
      alert('既存のユーザID');
      return 0;
    }else{
      alert('使用可能なユーザID');
      return 1;
    }
  })
}
