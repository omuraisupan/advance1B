//kakishima

//ログアウト
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
logOut.addEventListener('click', function() {
  const _auth = getAuth();
  signOut(_auth)
  .then(() => {
    //ログアウトに成功したらアラートを出してログイン画面に戻る
    console.log('ログアウトしました');
    alert('ログアウトしました');
    document.location.href = "asd3.html"; //ログイン画面に戻る
  }).catch((error) => {
    console.log('ログアウト失敗', error);
    alert('ログアウト失敗');
  });
});
      