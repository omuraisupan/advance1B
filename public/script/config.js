import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

const firebaseConfig = {
  /* apiキーを貼り付け*/
  apiKey: "AIzaSyDkpazmHuRFxU3EgtN6Qqbx9SVZaLouVT8",
  authDomain: "test2-fba52.firebaseapp.com",
  databaseURL: "https://test2-fba52-default-rtdb.firebaseio.com",
  projectId: "test2-fba52",
  storageBucket: "test2-fba52.appspot.com",
  messagingSenderId: "121590090463",
  appId: "1:121590090463:web:b79d045c5a5a56f064776a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);