import { deck, deckInit, hand } from "hand.js" 

class Player {

  constructor( userID, chip ) {
    this._userID = userID;
    this._chip = chip;
    this._cards = hand.cardInit();
    this._turn = false;
  }

  bit( chip ) {
    console.log("bit before chip:" + this.chip);
    /*ゲーム情報処理部の関数呼び出し*/
    /*this.chip = function(userID, _chip)*/

    console.log("bit after chip:" + this.chip);
    return {
      "before":_chip,
      "after":this.chip
    }
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
    /*ゲーム情報処理部の関数呼び出し*/
    /*function(userID)*/
    return this.userID
  }

  check() {
    /*ゲーム情報処理部の関数呼び出し*/
    /*function(userID)*/
    return this.userID
  }

  exchange( cardNumber ) {
    /*ゲーム情報処理部の関数呼び出し*/
    /*this.card =  function(_cardNumber)*/
  }
}
