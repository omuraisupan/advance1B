//realtime db使ってid+pass保存
import { ref, set } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
import { returnDatabase } from "./app.js"

/* 6.18 kakishima

------------------------
arg : none
ret : none
------------------------
アカウント作成
ユーザIDとパスワードを登録する
*/

createAccount.addEventListener('click',(e) => {
  e.preventDefault();      
  const _userID = document.getElementById('userID').value;      
  const _password = document.getElementById('password').value;
  const _database = returnDatabase();
  
  console.log('userID = ' + _userID);
  console.log('password = ' + _password);
       
     
  //users=>userid=>password
  /*
  set(ref(_database, _userid + '/users'), {
    password: _password,
  })
  .then(() => {
    alert('success');
  })
  .catch((error) => {
    alert('failed');
  });
  /*
  -userid
    -user
      -password: "password"
  dbに他の要素入れるなら
  */
      
  //userid=>password 
  set(ref(_database, _userID), {
    password: _password
  })
  .then(() => {
    alert('success');
  })
  .catch((error) => {
    alert('failed');
  });
  /*
  -userid
    -password: "password"
  dbがuserid+passwordのみなら
  */
});
