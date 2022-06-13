import { hand } from "./hand.js" 
import { deck, deckInit, chipData, betData, dropData, turnData,
        setPlayers, setBet, setChip, setDrop, setTurn } from "./gamemanage.js"

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

  getChip() {
    return this._chip;
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
    /*ゲーム情報処理部の関数呼び出し*/
    setTurn( this );
    return this._turn;
  }

  bit( chip ) {
    this._bedChip += chip;
    this._chip -= chip;
    /*ゲーム情報処理部の関数呼び出し*/
    setBet( this );
    setChip( this );
  }

  rise( chip ) {
    if (this._riseCount > 0) {
      this._riseCount--;
      this._bedChip += chip;
      this._chip -= chip;
      /*ゲーム情報処理部の関数呼び出し*/
      setBet( this );
      setChip( this );
    } else {
      console.log("ERROR NO RISECOUNT LEFT");
      return "ERROR"
    }
  }

  drop() {
    this._drop = true;
    /*ゲーム情報処理部の関数呼び出し*/
    setDrop( this );
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
/*const taro = new Player("taro", 10000);
const jiro = new Player("jiro", 10000);
const fuga = new Player("fuga", 10000);

const players = [ taro, jiro, fuga ];
setPlayers( players );
taro.bit(1000);
taro.changeTurn();
taro.drop();
console.log( betData );
console.log( chipData );
console.log( dropData );
console.log( turnData );*/