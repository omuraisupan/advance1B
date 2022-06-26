//firebaseの読み込み、初期化

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

//各自変える
const firebaseConfig = {
  apiKey: "AIzaSyBsGkvXHGfVWWZsnPJJCrxi4D8hLoQxu9Q",
  authDomain: "ninsyou-4f692.firebaseapp.com",
  databaseURL: "https://ninsyou-4f692-default-rtdb.firebaseio.com",
  projectId: "ninsyou-4f692",
  storageBucket: "ninsyou-4f692.appspot.com",
  messagingSenderId: "1042980416685",
  appId: "1:1042980416685:web:95eb74fcc23dadc0d6ea24",
  measurementId: "G-8KLJ77YLSF"
}
//ここまで

export const app = initializeApp(firebaseConfig);
 