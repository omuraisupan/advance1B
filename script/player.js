import { /*deck, deckInit,*/ deck, deckInit, hand } from "./hand.js" 
//import { gameFunction } from "gameFcnc.js"

//デバッグ用
deckInit();
//
class Player {

  constructor( userID, chip ) {
    this._userID = userID;
    this._chip = chip;
    this._bedChip = 0;
    this._cards = hand.cardInit();
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
    this._turn = false;
    /*ゲーム情報処理部の関数呼び出し*/
  }

  rise( chip ) {
    console.log("bit before chip:" + this.chip);
    /*ゲーム情報処理部の関数呼び出し*/
    /*this.chip = function(userID, _chip)*/

    console.log("bit after chip:" + this.chip);
    return {
      "before":_chip,
      "after":this.chip
    }
  }

  drop() {
    this._drop = true;
  }

  check() {
    this.bit(0);
    this.turn = false;
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