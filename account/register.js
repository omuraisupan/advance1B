//kakishima

//新規登録処理
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
register.addEventListener('click', function() {
  const _email = document.getElementById('email').value; //メールアドレス
  const _password = document.getElementById('password').value; //パスワード
  const _password2 = document.getElementById('password2').value; //パスワード(再入力)
  
  if(passwordCheck(_password, _password2) == 1){
    const _auth = getAuth();
    createUserWithEmailAndPassword(_auth, _email, _password)
    .then(() => {
      alert('登録完了');
      return 1;
    })
    .catch((error) => {
      alert('登録できません（' + error.message + '）');
      return 0;
    });
  }
});


//再入力したパスワードの一致を確認
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

