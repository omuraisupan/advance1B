import hand from hand.js

class Player {

  constructor( _userID, _chip ) {
    this._userID = _userID;
    this._chip = _chip;
    this._cards = hand.cardInit();
  }

  bit( _chip ) {
    console.log("bit before chip:" + this.chip);
    /*ゲーム情報処理部の関数呼び出し*/
    /*this.chip = function(userID, _chip)*/

    console.log("bit after chip:" + this.chip);
    return {
      "before":_chip,
      "after":this.chip
    }
  }

  rise( _chip ) {
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

  exchange( _cardNumber ) {
    /*ゲーム情報処理部の関数呼び出し*/
    /*this.card =  function(_cardNumber)*/
  }
}
