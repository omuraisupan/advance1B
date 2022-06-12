//山札配列を作るための配列
const suitList = [ "spade", "clover", "diamond", "heart" ];
const numList = [
  {num: 1},
  {num: 2},
  {num: 3},
  {num: 4},
  {num: 5},
  {num: 6},
  {num: 7},
  {num: 8},
  {num: 9},
  {num: 10},
  {num: 11},
  {num: 12},
  {num: 13},
]

// 山札 {suit, number}の配列　分割代入を利用
const deckList = suitList.map( suit => numList.map( number => ({suit, ...number}))).flat();

//実際に使用する山札
export let deck

//山札を初期状態にしてシャッフルする
export const deckInit = () => {
  deck = [...deckList]
  deck.sort(()=> Math.random() - 0.5);
}

export const hand = {
  //山札から手札5毎を配る
  cardInit: function() {
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
  //山札から手札を1枚配る
  deal: function( deck ) {
    let card = deck.shift();
    return card;
  },
  //手札の役を判定する
  checkHand: function( cards ) {
    if (this.isRoyalStraightFlush( cards )) return "RoyalStraightFlush"
    else if (this.isStraightFlush( cards )) return "StraightFlush"
    else if (this.isFourCard( cards )) return "FourCard"
    else if (this.isFullHouse( cards )) return "FullHouse"
    else if (this.isFlush( cards )) return "Flush"
    else if (this.isStraight( cards )) return "Straight"
    else if (this.isThreeCard( cards )) return "ThreeCard"
    else if (this.isTwoPair( cards )) return "TwoPair"
    else if (this.isOnePair( cards )) return "OnePair"
    else return "NoPair"
  },

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
    if (!this.isStraightFlush( cards )) return false;
    countList = this.numCount( cards );
    if (countList[1] == 1 && countList[13] == 1) return true;
    return false;
  },
  //ストレートフラッシュ
  isStraightFlush: function( cards ) {
    return this.isStraight( cards ) && this.isFlush( cards );
  },
  //フォーカード
  isFourCard: function( cards ) {
    for (const count of this.numCount( cards )) {
      if (count >= 4) return true;
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
      if (card.suit == suit) continue;
      else return false;
    }
    return true;
  },
  //ストレート
  isStraight: function ( cards ) {
    let _cards = [...cards];
    _cards.sort(function(a,b) {
      if (a.num < b.num) return -1;
      if (a.num > b.num) return 1;
      return 0;
    })
    //10,J,Q,K,A の役は例外
    if (_cards[0] == 1 && _cards[1] == 10 && _cards[2] == 11
      && _cards[3] == 12 && _cards[4] == 13) return true;
    for (let i = 0; i < _cards.length-1; i++) {
      if(_cards[i+1].num - _cards[i].num == 1) continue;
      else return false
    }
    return true;
  },
  //スリーカード
  isThreeCard: function( cards ) {
    for (const count of this.numCount( cards )) {
      if (count >= 3) return true;
    }
    return false;
  },
  //ツーペア
  isTwoPair: function( cards ) {
    let pairs = 0;
    for (const count of this.numCount( cards )) {
      if (count >= 2) pairs++;
    }
    if (pairs == 2) return true;
    return false;
  },
  //ワンペア
  isOnePair: function( cards ) {
    for (const count of this.numCount( cards )) {
      if (count >= 2) return true;
    }
    return false;
  },
}

//デバッグ用
deckInit();
console.log(hand.checkHand(hand.cardInit()));
deckInit();
console.log(hand.checkHand(hand.cardInit()));
deckInit();
console.log(hand.checkHand(hand.cardInit()));