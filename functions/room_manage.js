const Player = require("./player.js");
const GameManage = require("./game_manage.js")

module.exports = class RoomManage {

  
  /* 6.19 omu

  6.19 作成 (omu)
  -------------------------

  arg: memberList
      // Array [ userID, ... , userID ]
      // userID: string //メンバーのユーザIDです.
      // ルームメンバーの配列です.
  let: none

  プライベート変数
  _gameManage:  instance // GameManageクラスのインスタンスです.
  _deck: Array[ card, ... , card ] // 山札の枚数分
         // card: { suit:heart, num: 6} などのオブジェクト
         // このルームで使用する山札です.
  _playerList: Array[ player, ... ,player] // プレイヤーの人数分
        // player: Playerクラスのインスタンスです.
        // このルームに参加しているプレイヤーを配列に入れます.
  __________________________

  コンストラクタです.プライベート変数の初期化を行います.
  上記の変数はいかに記述するメソッドで操作します.

  */
  constructor( memberList ) {
    this._gameManage = new GameManage();
    this._deck = this._gameManage.deckInit();
    this._playerList = [];
    for (const player of memberList) {
      const player_ = new Player(player, 10000, this._deck);
      this._playerList.push( player_ );
    }
    this._playerList[Math.floor(Math.random() * (memberList.length + 1))].changeTurn();
    console.log(this._playerList);
    console.log(this._deck);
  }

  /* 6.20 omu

  6.20作成 (omu)
  -------------------------

  arg: none
  let: none
  __________________________

  次のゲームを開始するときに呼び出します.
  山札や手札などを初期化します.

  */
  nextGame() {
    this._deck = this._gameManage.deckInit();
    for (const player of this._playerList) {
      player.cardInit( this._deck );
    }
    this._playerList[Math.floor(Math.random() * 5)].changeTurn();
  }

  
  //テスト用
  /*
  テスト用に作成した関数です
  */
  showCards( userID ) {
    let cards;
    console.log(userID);
    for (const player of this._playerList) {
      if (player.getUserID() == userID) {
        cards = player.getCards();
      }
    }
    for (const card of cards) {
      const card = document.getElementById("card1")
      card1.textContent= card.suit;
      document.body.prepend( card );
    }
    console.log(cards);
  }

}