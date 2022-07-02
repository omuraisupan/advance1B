//firebaseの読み込み、初期化

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

//各自変える
const firebaseConfig = {
    apiKey: "AIzaSyDt_IQyz3VeYf_mzv3ivffD7zwjqXuCWXA",
  authDomain: "poker-test-a59a2.firebaseapp.com",
  databaseURL: "https://poker-test-a59a2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "poker-test-a59a2",
  storageBucket: "poker-test-a59a2.appspot.com",
  messagingSenderId: "461485280745",
  appId: "1:461485280745:web:037ca457fca760156f4f78",
  measurementId: "G-HE27X7QWWY"
};
//ここまで

export const app = initializeApp(firebaseConfig);