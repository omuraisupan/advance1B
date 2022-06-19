import { RoomManage } from "./room_manage.js";

//デバッグ用
const memberList = [ "taro", "jiro", "saburo", "shiro", "gorou" ];
const room = new RoomManage( memberList );
room.showCards("taro");