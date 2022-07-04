import { ref, getDatabase, get } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { app } from "./app.js"

const login = document.getElementById("login");

/* 6.27 omu

6.27 omu 色々変更
6.18 kakishima
------------------------
arg : none
ret : none
------------------------
プライベート変数
_userID: ページに入力されたユーザIDを格納
_password: ページに入力されたパスワードを格納
_database: 呼び出したデータベースを格納
_ref: databaseの場所
------------------------
useridとpasswordでのログイン
成功：次の画面に映る
失敗：ユーザIDまたはパスワードが違いますとアラート
*/

login.addEventListener('click',(e) => {
  e.preventDefault();
  const _userID = document.getElementById('userID').value;
  const _password = document.getElementById('password').value;
  const _database = getDatabase(app);
  const _ref = ref(_database, '/users/' + _userID);

  get(_ref).then((snapshot) => {
    if ( snapshot.exists() ) {
      const data = snapshot.val();
      const userPW = data.password;
      if (_password == userPW) {
        //成功したら次の画面に移る
        //let url = new URL('./mainmenu', "http://localhost:5000");
        
        let url = new URL('./mainmenu', document.location.protocol + document.location.host);
        url.searchParams.append('uid', _userID);
        document.location.href = url;
      } else {
        alert('ユーザIDまたはパスワードが違います');
      }
    } else {
      alert('ユーザIDまたはパスワードが違います');
    }
  });
});
