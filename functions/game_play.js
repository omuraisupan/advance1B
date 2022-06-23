const functions = require("firebase-functions");
const Player = require("./player");
const RoomManage = require("./room_manage");

let memberList = [];
let isStart = false;

//デバッグ用

exports.setMemberList = functions.https.onCall((data, context) => {
  memberList.push(context.auth.uid);
  console.log(memberList);
});

exports.gameStart = functions.https.onCall((data, context) => {
  if (!isStart) {
    isStart = true;
    console.log( memberList );
    const room = new RoomManage( memberList );
  }
});

exports.displayHand = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
});