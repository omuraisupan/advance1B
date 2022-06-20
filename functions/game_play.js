const functions = require("firebase-functions");
const RoomManage = require("./room_manage");

//デバッグ用

exports.test = functions.https.onRequest((req, res) => {
  const memberList = [ "taro", "jiro", "saburo", "shiro", "gorou" ];
  const room = new RoomManage( memberList );
  res.send( room._playerList );
});