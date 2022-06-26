import { ref, onValue, getDatabase } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
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
_address: 遷移先のURL
_query: URLに保持する予定の情報
_url: 最終的なURL
------------------------
useridとpasswordでのログイン
成功：login successと表示し、次の画面に映る
失敗：failedと表示する
*/

login.addEventListener('click',(e) => {
  e.preventDefault();
  const _userID = document.getElementById('userID').value;
  const _password = document.getElementById('password').value;
  //const _database = returnDatabase();
  const _database = getDatabase(app);
  const _ref = ref(_database, '/users/' + _userID);
  const _address = "http://127.0.0.1:5500/account_id2/success.html"; //遷移先のurl
  const _query = "?userID=" + _userID;
  const _url = _address + _query; 

  onValue(_ref, (snapshot) => {
    const _data = snapshot.val();
    const _password2 = _data.password;
    //console.log('password(moto) = ' + _password2);
    if(_password == _password2){
      //成功したら次の画面に移る
      alert('login success');
      document.location.href = _url;
    }else{
      alert('failed');
    }
  });
});
