import { Player } from "./player.js"

//各プレイヤーのチップ数を保管
let chipData = [];
let bitData = [];

const gameData = {
  chip: function( userID, chip) {

  },
  declare: function( userID, chip, kind) {

  },
  turnChange: function( userID) {

  },
  result: function( userID, king) {
    
  }
}

const setPlayer = ( players ) => {
  for (player of players) {
    chipData.push({userID: player.getUserID(), chip: player.getChip()});
    bitData.push({userID: player.getUserID(), bedChip: player.getBedchip()})
  }
}

const setChip = ( player ) => {
  chipData.push({ userID: player.getUserID(), chip: player.getChip()});
}


//デバッグ用
chipSet( "aaa", 31)
chipSet( "bbb", 23)

console.log(chipData)