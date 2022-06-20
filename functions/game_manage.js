export class GameManage{
//山札配列を作るための配列
  suitList = [ "spade", "clover", "diamond", "heart" ];
  numList = [
    {num: 1}, {num: 2}, {num: 3}, {num: 4},
    {num: 5}, {num: 6}, {num: 7}, {num: 8},
    {num: 9}, {num: 10}, {num: 11}, {num: 12},
    {num: 13}
  ]

// 山札 {suit, number}の配列　分割代入を利用
  deckList = this.suitList.map( suit => this.numList.map( number => ({suit, ...number}))).flat();

//使用する山札の生成.山札を初期状態にしてシャッフルする.
  deckInit() {
    let deck = [...this.deckList];
    deck.sort(()=> Math.random() - 0.5);
    return deck;
  }


//各プレイヤーのチップ数を保管
//配列で保持するプログラム、DB使うなら変更
  chipData = [];
  betData = [];
  dropData = [];
  turnData = [];

//配列で保持するプログラム、DB使うなら変更
  setPlayers = ( players ) => {
    for (const player of players) {
      chipData.push({userID: player.getUserID(), chip: player.getChip()});
      betData.push({userID: player.getUserID(), betChip: player.getBedChip()});
      dropData.push({userID: player.getUserID(), drop: player.isDrop()});
      turnData.push({userID: player.getUserID(), turn: player.isTurn()});
    }
  }

  setBet = ( player ) => {
    const index = betData.findIndex( _player => _player.userID === player.getUserID());
    betData[index].betChip = player.getBedChip();
  }

  setChip = ( player ) => {
    const index = chipData.findIndex( _player => _player.userID === player.getUserID());
    chipData[index].chip = player.getChip();
  }

  setDrop = ( player ) => {
    const index = chipData.findIndex( _player => _player.userID === player.getUserID());
    dropData[index].drop = player.isDrop();
  }

  setTurn = ( player ) => {
    const index = chipData.findIndex( _player => _player.userID === player.getUserID());
    turnData[index].turn = player.isTurn();
  }
}