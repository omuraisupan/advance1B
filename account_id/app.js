//firebaseの読み込み、初期化

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js"

//各自変える
const firebaseConfig = {
  apiKey: "******************",
  authDomain: "**********************",
  databaseURL: "***********************",
  projectId: "**************",
  storageBucket: "*******************",
  messagingSenderId: "*************",
  appId: "**********************",
  measurementId: "********************"
};
//ここまで

const app = initializeApp(firebaseConfig);
 

/* 6.18 kakishima

------------------------
arg : なし
ret : database 
------------------------
データベースを使うときにこの関数を使ってデータベースを呼び出す
*/
export function returnDatabase(){
  const database = getDatabase(app);
  return database;
}


