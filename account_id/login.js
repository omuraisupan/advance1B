 import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
 import { returnDatabase } from "./app.js"

/* 6.18 kakishima

------------------------
arg : none
ret : none
------------------------
useridとpasswordでのログイン
成功：login successと表示し、次の画面に映る
失敗：failedと表示しする
*/

login.addEventListener('click',(e) => {
  e.preventDefault();
  const _userID = document.getElementById('userID').value;
  const _password = document.getElementById('password').value;
  const _database = returnDatabase();
  const _ref = ref(_database, _userID);
  onValue(_ref, (snapshot) => {
    const _data = snapshot.val();
    const _password2 = _data.password;
    //const _password2 = _data.user.password; //userの木を作る場合
    console.log('password(再入力) = ' + _password2);
    if(_password == _password2){
      //成功したら次の画面に移る
      alert('login success');
      document.location.href = "success.html";
    }else{
      alert('failed');
    }
  });
});
