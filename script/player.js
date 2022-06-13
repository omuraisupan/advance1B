import { /*deck, deckInit,*/ deck, deckInit, hand } from "./hand.js" 
//import { gameFunction } from "gameFcnc.js"

//デバッグ用
deckInit();
//
export class Player {

  constructor( userID, chip ) {
    this._userID = userID;
    this._chip = chip;
    this._bedChip = 0;
    this._cards = hand.cardInit();
    this._riseCount = 1;
    this._drop = false;
    this._turn = false;

    //gameData.chip( this.userID, this.chip );
  }

  getUserID() {
    return this._userID;
  }

  getBedChip() {
    return this._bedChip;
  }

  getCards() {
    return this._cards;
  }

  getRiseCount() {
    return this._riseCount;
  }

  isDrop() {
    return this._drop;
  }

  isTurn() {
    return this._turn;
  }

  changeTurn() {
    this._turn = !this._turn;
    return this._turn;
  }

  bit( chip ) {
    this._bedChip += chip;
    this._chip -= chip;
    /*ゲーム情報処理部の関数呼び出し*/
  }

  rise( chip ) {
    if (this._riseCount > 0) {
      this._riseCount--;
      this._bedChip += chip;
      this._chip -= chip;
    } else {
      console.log("ERROR NO RISECOUNT LEFT");
      return "ERROR"
    }
  }

  drop() {
    this._drop = true;
  }

  check() {
    this.bit(0);
  }

  exchange( card ) {
    this._cards = this._cards.filter( _card => _card != card );
    this._cards.push( hand.deal(deck) );
    return this._cards;
  }
}

//デバッグ用
const taro = new Player("taro", 10000);
console.log(taro.getCards());
const c = taro.getCards()[0];
console.log( c );
taro.exchange( c );
console.log(taro.getCards());