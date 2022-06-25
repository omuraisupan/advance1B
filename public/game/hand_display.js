import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-functions.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"
// firebaseのAPIキーをimport
import { app } from "./config.js"

const auth = getAuth();
const functions = getFunctions();
const db = getDatabase();
connectFunctionsEmulator(functions, "localhost", 5001);
const setMemberList = httpsCallable(functions, 'setMemberList');
const gameStart = httpsCallable(functions, "gameStart");

//デバッグ用
signInAnonymously(auth)
  .then(() => {
    //console.log("auth ok");

    setMemberList()
      .then(() => {
        gameStart();
      });
  })
  .catch((error) => {
    console.log(error.code);
  });


/*onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    set(ref(db, "users/"), {
      uid: uid
    });
  } else {

  }
})*/

/*memberList()
  .then((result) => {
    const data = result.data;
    console.log(data.memberList[0]);
    document.getElementById(checkHand).innnerContent = data.memberList[0]._userID;
  })
  .catch((error) => {
    console.log(error.code);
  })*/

//判定された役を表示
//document.getElementById(checkHand).innerHTML = checkHand(_cards)

//他のプレイヤーの役は通信で同期？