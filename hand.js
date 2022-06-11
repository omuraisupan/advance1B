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

// {suit, number}の配列　分割代入を利用
const deckList = suitList.map( suit => numList.map( number => ({suit, ...number}))).flat();

//実際に使用する山札
let deck

const deckInit = () => {
  deck = [...deckList]
}

const hand = {
  cardInit: function() {
    deck.sort(()=> Math.random() - 0.5);
    cards = [
      this.deal(deck),
      this.deal(deck),
      this.deal(deck),
      this.deal(deck),
      this.deal(deck)
    ];
    console.log(cards)
    return cards;
  },
  deal: function( deck ) {
    card = deck.shift();
    return card;
  },
  checkHand: function( _cards ) {
    if (this.isRoyalStraightFlush( _cards )) return "RoyalStraightFlush"
    else if (this.isStraightFlush( _cards )) return "StraightFlush"
    else if (this.isFourCard( _cards)) return "FourCard"
    else if (this.isFullHouse( _cards )) return "FullHouse"
    else if (this.isFlush( _cards)) return "Flush"
    else if (this.isStraight( _cards )) return "Straight"
    else if (this.isThreeCard( _cards )) return "ThreeCard"
    else if (this.isTwoPair( _cards )) return "TwoPair"
    else if (this.isOnePair( _cards )) return "OnePair"
    else return "NoPair"
  },
  numCount: function ( _cards ){
    const countList = new Array(14).fill(0);
    for (card of _cards) {
      countList[card.num]++;
    }
    return countList;
  },
  isRoyalStraightFlush: function( _cards ) {
    if (!this.isStraightFlush( _cards )) return false;
    countList = this.numCount( _cards );
    if (countList[1] == 1 && countList[13] == 1) return true;
    return false;
  },
  isStraightFlush: function( _cards ) {
    return this.isStraight( _cards ) && this.isFlush( _cards );
  },
  isFourCard: function( _cards ) {
    for (count of this.numCount( _cards )) {
      if (count >= 4) return true;
    }
    return false;
  },
  isFullHouse: function( _cards ){
    //ツーペアかつスリーペアならフルハウス
    return this.isTwoPair( _cards ) && this.isThreeCard( _cards );
  },
  isFlush: function( _cards ) {
    suit = _cards[0].suit;
    for ( card of _cards ) {
      if (card.suit == suit) continue;
      else return false;
    }
    return true;
  },
  isStraight: function ( _cards ) {
    cards = [..._cards];
    cards.sort(function(a,b) {
      if (a.num < b.num) return -1;
      if (a.num > b.num) return 1;
      return 0;
    })
    //10,J,Q,K,A の役は例外
    if (cards[0] == 1 && cards[1] == 10 && cards[2] == 11
      && cards[3] == 12 && cards[4] == 13) return true;
    for (let i = 0; i < cards.length-1; i++) {
      if(cards[i+1].num - cards[i].num == 1) continue;
      else return false
    }
    return true;
  },
  isThreeCard: function( _cards ) {
    for (count of this.numCount( _cards )) {
      if (count >= 3) return true;
    }
    return false;
  },
  isTwoPair: function( _cards ) {
    pairs = 0;
    for (count of this.numCount( _cards )) {
      if (count >= 2) pairs++;
    }
    if (pairs == 2) return true;
    return false;
  },
  isOnePair: function( _cards ) {
    for (count of this.numCount( _cards )) {
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