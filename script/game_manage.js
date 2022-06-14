import { Player } from "./player.js"

//山札配列を作るための配列
const suitList = [ "spade", "clover", "diamond", "heart" ];
const numList = [
  {num: 1}, {num: 2}, {num: 3}, {num: 4},
  {num: 5}, {num: 6}, {num: 7}, {num: 8},
  {num: 9}, {num: 10}, {num: 11}, {num: 12},
  {num: 13}
]

// 山札 {suit, number}の配列　分割代入を利用
const deckList = suitList.map( suit => numList.map( number => ({suit, ...number}))).flat();

//使用する共通の山札
export let deck;

//山札を初期状態にしてシャッフルする
export const deckInit = () => {
  deck = [...deckList]
  deck.sort(()=> Math.random() - 0.5);
}


//各プレイヤーのチップ数を保管
//配列で保持するプログラム、DB使うなら変更
export let chipData = [];
export let betData = [];
export let dropData = [];
export let turnData = [];

//配列で保持するプログラム、DB使うなら変更
export const setPlayers = ( players ) => {
  for (const player of players) {
    chipData.push({userID: player.getUserID(), chip: player.getChip()});
    betData.push({userID: player.getUserID(), betChip: player.getBedChip()});
    dropData.push({userID: player.getUserID(), drop: player.isDrop()});
    turnData.push({userID: player.getUserID(), turn: player.isTurn()});
  }
}

export const setBet = ( player ) => {
  const index = betData.findIndex( _player => _player.userID === player.getUserID());
  betData[index].betChip = player.getBedChip();
}

export const setChip = ( player ) => {
  const index = chipData.findIndex( _player => _player.userID === player.getUserID());
  chipData[index].chip = player.getChip();
}

export const setDrop = ( player ) => {
  const index = chipData.findIndex( _player => _player.userID === player.getUserID());
  dropData[index].drop = player.isDrop();
}

export const setTurn = ( player ) => {
  const index = chipData.findIndex( _player => _player.userID === player.getUserID());
  turnData[index].turn = player.isTurn();
}