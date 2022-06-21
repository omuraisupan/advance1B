const functions = require("firebase-functions");
const Player = require("./player");
const RoomManage = require("./room_manage");

//デバッグ用

exports.memberList = functions.https.onCall((data, context) => {
  const memberList = [ "taro", "jiro", "saburo", "shiro", "gorou" ];
  const room = new RoomManage( memberList );
  return {
    memberList: room._playerList
  }
});

exports.memberList2 = functions.https.onRequest((req, res) => {
  const memberList = [ "taro", "jiro", "saburo", "shiro", "gorou" ];
  const room = new RoomManage( memberList );
  res.send(room._playerList);
});

/*exports.displayHand = functions.https.onCall((data, context) => {

});*/