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

const chipSet = ( userID, chip ) => {
  chipData.push({ userID: userID, chip: chip})
}

chipSet( "aaa", 31)
chipSet( "bbb", 23)

console.log(chipData)