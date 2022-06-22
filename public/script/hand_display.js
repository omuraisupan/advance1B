import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-functions.js"

// firebaseのAPIキーをimport
import { app } from "./config.js"

const auth = getAuth();
const functions = getFunctions();
connectFunctionsEmulator(functions, "localhost", 5001);
const memberList = httpsCallable(functions, 'memberList');


//デバッグ用
signInAnonymously(auth)
  .then(() => {
    console.log("ok");
  })
  .catch((error) => {
    console.log(error.code);
  })

memberList()
  .then((result) => {
    const data = result.data;
    console.log(data.memberList[0]);
    document.getElementById(checkHand).innnerContent = data.memberList[0]._userID;
  })
  .catch((error) => {
    console.log(error.code);
  })

//判定された役を表示
//document.getElementById(checkHand).innerHTML = checkHand(_cards)

//他のプレイヤーの役は通信で同期？