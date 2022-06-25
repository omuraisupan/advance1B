/* 6.19 omu
handオブジェクトは手札に関する処理を記述しています.

card について
{ suit: heart, num: 3 }
などのオブジェクトの形式です.
*/

export const hand = {
  /* 6.19 omu

  6.19 引数にdeckを追加(omu)
  6.19 コメント作成 (omu)
  -----------------------
  hand.cardInit()

  arg: Array[ card, ... ,card] // 山札の枚数文ある
  ret: Array[ card, card, card, card, card ]

  card: { suit: heart, num: 3}などのオブジェクト

  -----------------------
  初期手札の5枚を山札から引きます.
  返り値は5枚のカードです.
  */
  cardInit: function( deck ) {
    let cards = [
      this.deal(deck),
      this.deal(deck),
      this.deal(deck),
      this.deal(deck),
      this.deal(deck)
    ];
    console.log(cards)
    return cards;
  },
  /* 6,19 omu

  6.19 コメント作成 (omu)
  ------------------------
  hand.deal( deck )
  deck: Array[ card, card, ... , card ] //山札の枚数だけcardがあります.
  card: { suit: heart, num: 3 }などの形式のオブジェクト

  arg: deckオブジェクト
  ret: card

  ------------------------
  山札からカード1枚を配ります.
  返り値は1枚のカードです.

  */
  //山札から手札を1枚配る
  deal: function( deck ) {
    let card = deck.shift();
    return card;
  },
  /* 6.19 omu

  6.19 コメント作成 (omu)
  ------------------------
  hand.checkHand( cards )
  cards: Array[ card, card, card, card, card]
  card: { suit: heart, num: 3 } などの形式のオブジェクト

  arg: Array[ card, card, card, card, card ]
  ret: string //役名を出力します

  ------------------------
  手札の役を判定します.
  返り値はその役の名前です.

  */
  checkHand: function( cards ) {
    if (this.isRoyalStraightFlush( cards )) {
      return "RoyalStraightFlush"
    }
    else if (this.isStraightFlush( cards )) {
      return "StraightFlush"
    }
    else if (this.isFourCard( cards )) {
      return "FourCard"
    }
    else if (this.isFullHouse( cards )) {
      return "FullHouse"
    }
    else if (this.isFlush( cards )) {
      return "Flush"
    }
    else if (this.isStraight( cards )) {
      return "Straight"
    }
    else if (this.isThreeCard( cards )) {
      return "ThreeCard"
    }
    else if (this.isTwoPair( cards )) {
      return "TwoPair"
    }
    else if (this.isOnePair( cards )) {
      return "OnePair"
    }
    else {
      return "NoPair"
    }
  },

  /* 6.19 omu
    以下のメソッドはすべてcheckHandメソッドの動作用です.
    詳細は記述しません.
  */
  //役判定用の関数
  numCount: function ( cards ){
    const countList = new Array(14).fill(0);
    for (const card of cards) {
      countList[card.num]++;
    }
    return countList;
  },
  //ロイヤルストレートフラッシュ
  isRoyalStraightFlush: function( cards ) {
    if (!this.isStraightFlush( cards )) {
      return false;
    }
    countList = this.numCount( cards );
    if (countList[1] == 1 && countList[13] == 1) {
      return true;
    }
    return false;
  },
  //ストレートフラッシュ
  isStraightFlush: function( cards ) {
    return this.isStraight( cards ) && this.isFlush( cards );
  },
  //フォーカード
  isFourCard: function( cards ) {
    for (const count of this.numCount( cards )) {
      if (count >= 4) {
        return true;
      }
    }
    return false;
  },
  //フルハウス
  isFullHouse: function( cards ){
    //ツーペアかつスリーペアならフルハウス
    return this.isTwoPair( cards ) && this.isThreeCard( cards );
  },
  //フラッシュ
  isFlush: function( cards ) {
    const suit = cards[0].suit;
    for (const card of cards ) {
      if (card.suit == suit) {
        continue;
      }
      else {
        return false;
      }
    }
    return true;
  },
  //ストレート
  isStraight: function ( cards ) {
    let _cards = [...cards];
    _cards.sort(function(a,b) {
      if (a.num < b.num) {
        return -1;
      }
      if (a.num > b.num) {
        return 1;
      }
      return 0;
    })
    //10,J,Q,K,A の役は例外
    if (_cards[0] == 1 && _cards[1] == 10 && _cards[2] == 11
      && _cards[3] == 12 && _cards[4] == 13) {
        return true;
      }
    for (let i = 0; i < _cards.length-1; i++) {
      if(_cards[i+1].num - _cards[i].num == 1) {
        continue;
      }
      else {
        return false;
      }
    }
    return true;
  },
  //スリーカード
  isThreeCard: function( cards ) {
    for (const count of this.numCount( cards )) {
      if (count >= 3) {
        return true;
      }
    }
    return false;
  },
  //ツーペア
  isTwoPair: function( cards ) {
    let pairs = 0;
    for (const count of this.numCount( cards )) {
      if (count >= 2) {
        pairs++;
      }
    }
    if (pairs == 2) {
      return true;
    }
    return false;
  },
  //ワンペア
  isOnePair: function( cards ) {
    for (const count of this.numCount( cards )) {
      if (count >= 2) {
        return true;
      }
    }
    return false;
  },
}