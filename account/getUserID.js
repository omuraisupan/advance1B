//kakishima

//ユーザIDを出力
//ログインした後にこの関数を呼び出す

import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
getUserID.addEventListener('click', function() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const _email = user.email;
      console.log('email = ' + _email);
      const _userID = user.uid;
      console.log('userID = ' + _userID);
      return _userID;
    } else {
      console.log('userID error');
      return 0;
    }
  });
});
