//kakishima

//ログイン処理
import { getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
loginCheck.addEventListener('click', function() {
  var _email = document.getElementById("email").value; //メールアドレス
  var _password = document.getElementById("password").value; //パスワード

  const _auth = getAuth();
  signInWithEmailAndPassword(_auth, _email, _password)
  .then(() => {
    //ログインが成功したらアラートを出し、別ページに移動する
    console.log('ログイン完了');
    document.location.href = "success2.html";
    return 1;
  })
  .catch((error) => {
    //ログイン失敗ならアラートを出す
    console.log('ログイン失敗', error);
    alert('ログイン失敗');
    return 0;
  });
});
