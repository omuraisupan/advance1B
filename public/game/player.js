import { hand } from "./hand.js"


// 山札配列を作るための配列
const suitList = [ "spade", "clover", "diamond", "heart" ];
const numList = [
  {num: 1}, {num: 2}, {num: 3}, {num: 4},
  {num: 5}, {num: 6}, {num: 7}, {num: 8},
  {num: 9}, {num: 10}, {num: 11}, {num: 12},
  {num: 13}
]
const deckList = suitList.map( suit => numList.map( number => ({suit, ...number}))).flat();

/* 6.19 omu

6.19 コメント追加 (omu)
------------------------
プレイヤーに関するクラスです.
プレイヤーが行うことをメソッドとして記述しています.

*/
export class Player {

  /* 6.25 (omu)

  6.25 turnをカウントに変更, changeTurn()を削除
  6.19 引数に deck を追加.cardInitの引数にdeckを入れる. (omu)
  6.19 コメント追加 (omu)
  ------------------------

  arg: userID: string // ユーザIDです.
       chip: int // ゲーム開始時のチップ数です.
  let: none

  プライベート変数
  _userID:   string // userIDです.
  _chip:      int   // 持ちチップ数です.
  _betChip:   int   //ベッドしているチップ数です.
  _cards:   Array[ card, card, card, card, card ]
            // card: { suit: heart, num: 3 }などのオブジェクトの形式
            // 手札のカードです.
  _riseCount: int   // レイズ出来る残り回数です.
  _exchangeCount:int// 残りの手札交換可能回数です
  _turn:      int   // 経過ターン数.
  _bet:     bool  // ベット済みかどうか.
  ------------------------

  コンストラクタです.プライベート変数の初期化を行います.
  上記の変数はいかに記述するメソッドで操作します.
  */

  constructor( userID, chip ) {
    this._userID = userID;
    this._chip = chip;
    this._betChip = 0;
    this._deck = this.deckInit();
    this._cards = hand.cardInit( this._deck );
    this._riseCount = 1;
    this._exchangeCount = 1;
    this._turn = 1;
    this._bet = false;

    //gameData.chip( this.userID, this.chip );
  }

  //使用する山札の生成.山札を初期状態にしてシャッフルする.
  deckInit () {
    let deck = [ ...deckList ];
    deck.sort(()=> Math.random() - 0.5);
    return deck;
  }

  /* 6.25 omu

  6.25 コメント作成 (omu)
  -----------------------
  player.checkhand()

  arg: none
  ret: string

  -----------------------
  手札の役を判定し、それに応じてチップ数を増やします.
  ベットしているチップ数を0にします.
  手札の役を返します.

  */
  checkHand() {
    const handName = hand.checkHand (this._cards );
    switch ( handName ) {
      case "RoyalStraightFlush":
        this._chip += this._betChip * 101;
        break;
      case "StraightFlush":
        this._chip += this._betChip * 51;
        break;
      case "FourCard":
        this._chip += this._betChip * 21;
        break;
      case "FullHouse":
        this._chip += this._betChip * 11;
        break;
      case "Flush":
        this._chip += this._betChip * 8;
        break;
      case "Straight":
        this._chip += this._betChip * 6;
        break;
      case "ThreeCard":
        this._chip += this._betChip * 4;
        break;
      case "TwoPair":
        this._chip += this._betChip * 2;
        break;
      case "OnePair":
        this._chip += this._betChip;
        break;
      case "NoPair":
        break;
      default:
    }
    this._betChip = 0;
    return handName;
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
  player.getBetChip()

  arg: none
  ret: int // _betChip

  -----------------------
  プライベート変数の_betChipを返します.
  ベッドしているチップ数です.

  */
  getBetChip() {
    return this._betChip;
  }

  /* 7.05 omu

  7.05 作成 (omu)
  -----------------------
  player.doBet()

  arg: none
  ret: none

  -----------------------
  プライベート変数の_isBetをtrueにします.

  */
  doBet() {
    this._bet = true;
  }

  /* 7.05 omu

  7.05 作成 (omu)
  -----------------------
  player.isBet()

  arg: none
  ret: bool

  -----------------------
  プライベート変数の_betを返します

  */
  isBet() {
    return this._bet
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

  /* 6.25 omu

  6.25 作成 (omu)
  -----------------------
  player.getTurn()

  arg: none
  ret: int // _turn

  -----------------------
  プライベート変数の_turnを返します.
  ターン数です.

  */
  getTurn() {
    return this._turn;
  }

  /* 6.28 omu

  6.28 作成 (omu)
  -----------------------
  player.getExchangeCount()

  arg: none
  ret: int // _turn

  -----------------------
  プライベート変数の_exchangeCountを返します.
  ターン数です.

  */
  getExchangeCount() {
    return this._exchangeCount;
  }

  /* 6.28 omu

  6.28 作成 (omu)
  -----------------------
  player.decExchangeCount()

  arg: none
  ret: int // _turn

  -----------------------
  プライベート変数の_exchangeCountを1減らします.
  ターン数です.

  */
  decExchangeCount() {
    this._exchangeCount--;
    return this._exchangeCount;
  }


  /* 7.04 omu

  7.04 _isBetをfalseにする処理を追加
  6.28 exchangeCount追加
  6.25 nextTurn()に変更
  6.19 コメント作成 (omu)
  -----------------------
  player.nextTurn()

  arg: none
  ret: _turn

  -----------------------
  次のターンにします.
  そのプレイヤーのターンかどうかです.

  */
  nextTurn() {
    this._exchangeCount = 1;
    this._turn++;
    this._bet = false;
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
    this._betChip += Number(chip);
    this._chip -= Number(chip);
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
    this._cards.push( hand.deal(this._deck) );
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