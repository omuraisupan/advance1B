import { hand } from "./hand.js" 

/* 6.19 omu

6.19 コメント追加 (omu)
------------------------
プレイヤーに関するクラスです.
プレイヤーが行うことをメソッドとして記述しています.

*/
export class Player {

  /* 6.19 (omu)

  6.19 引数に deck を追加.cardInitの引数にdeckを入れる. (omu)
  6.19 コメント追加 (omu)
  ------------------------

  arg: userID: string // ユーザIDです.
       chip: int // ゲーム開始時のチップ数です.
  let: none

  プライベート変数
  _userID:   string // userIDです.
  _chip:      int   // 持ちチップ数です.
  _bedChip:   int   //ベッドしているチップ数です.
  _cards:   Array[ card, card, card, card, card ]
            // card: { suit: heart, num: 3 }などのオブジェクトの形式
            // 手札のカードです.
  _riseCount: int   // レイズ出来る残り回数です.
  _drop:      bool  // ドロップしたかどうかです.
  _turn:      bool  // そのプレイヤーのターンかどうかです.
  ------------------------

  コンストラクタです.プライベート変数の初期化を行います.
  上記の変数はいかに記述するメソッドで操作します.
  */
  constructor( userID, chip, deck ) {
    this._userID = userID;
    this._chip = chip;
    this._bedChip = 0;
    this._cards = hand.cardInit( deck );
    this._riseCount = 1;
    this._drop = false;
    this._turn = false;

    //gameData.chip( this.userID, this.chip );
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.getUserID()

  arg: none
  ret: string // _userID

  -----------------------
  プライベート変数の_userIDを返します.
  ユーザIDです.

  */
  getUserID() {
    return this._userID;
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.getChip()

  arg: none
  ret: int // _chip

  -----------------------
  プライベート変数の_chipを返します.
  持ちチップ数です.

  */
  getChip() {
    return this._chip;
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.getBedChip()

  arg: none
  ret: int // _bedChip

  -----------------------
  プライベート変数の_bedChipを返します.
  ベッドしているチップ数です.

  */
  getBedChip() {
    return this._bedChip;
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.getCards()

  arg: none
  ret: Array[ card, card, card, card, card ]
    // card: {suit: heart, num: 3 } などのオブジェクトの形式
    // _cards

  -----------------------
  プライベート変数の_cardsを返します.
  手札のカードです.
  
  */
  getCards() {
    return this._cards;
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.getRiseCount()

  arg: none
  ret: int // _riseCount

  -----------------------
  プライベート変数の_riseCountを返します.
  レイズ出来る残り回数です.
  
  */
  getRiseCount() {
    return this._riseCount;
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.isDrop()

  arg: none
  ret: bool // _drop

  -----------------------
  プライベート変数の_dropを返します.
  ドロップしたかどうかです.

  */
  isDrop() {
    return this._drop;
  }


  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.isTurn()

  arg: none
  ret: bool // !_turn

  -----------------------
  プライベート変数の_turnを返します.
  そのプレイヤーのターンかどうかです.

  */
  isTurn() {
    return this._turn;
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.changeTurn()

  arg: none
  ret: bool // _turn

  -----------------------
  プライベート変数の_turnの反転を返します.
  プライベート変数の_turnも反転させます.

  プレイヤーのターンを変更したいときに利用してください.

  */
  changeTurn() {
    this._turn = !this._turn;
    return this._turn;
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.bit( chip )

  arg: int // ビットしたチップ数です.
  ret: none

  -----------------------
  指定したチップ数だけビットします.

  */
  bit( chip ) {
    this._bedChip += chip;
    this._chip -= chip;
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.rise( chip )

  arg: int // レイズしたチップ数です.
  ret: none

  -----------------------
  指定したチップ数だけレイズします.

  */
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

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.drop()

  arg: none
  ret: none

  -----------------------
  プレイヤーをドロップさせます.

  */
  drop() {
    this._drop = true;
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.check()

  arg: none
  ret: none

  -----------------------
  プレイヤーをチェックさせます.

  */
  check() {
    this.bit(0);
  }

  /* 6.19 omu

  6.19 コメント作成 (omu)
  -----------------------
  player.exchange( card )

  arg: { suit: heart, num: 3}などのオブジェクトの形式
  ret: Array[ card, card, card, card, card ]
    //card { suit: heaet, num: 3}などのオブジェクトの形式

  -----------------------
  指定したカードが手札にある場合、それを捨てて新たに山札から1枚引きます.
  新たな手札を返します.

  */
  exchange( card ) {
    this._cards = this._cards.filter( _card => _card != card );
    this._cards.push( hand.deal(deck) );
    return this._cards;
  }

  /* 6.19 omu

  6.19 作成 (omu)
  -----------------------
  player.cardInit( card )

  arg: Array[ card, ... , card ] //山札の枚数分
    //card:{ suit: heart, num: 3}などのオブジェクトの形式
  ret: none

  -----------------------
  プレイヤーの手札を生成します.

  */
  cardInit( deck ) {
    this._cards = hand.cardInit( deck );
  }
}