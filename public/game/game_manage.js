
//山札配列を作るための配列
suitList = [ "spade", "clover", "diamond", "heart" ];
numList = [
  {num: 1}, {num: 2}, {num: 3}, {num: 4},
  {num: 5}, {num: 6}, {num: 7}, {num: 8},
  {num: 9}, {num: 10}, {num: 11}, {num: 12},
  {num: 13}
]

// 山札 {suit, number}の配列　分割代入を利用
deckList = this.suitList.map( suit => this.numList.map( number => ({suit, ...number}))).flat();

//使用する山札の生成.山札を初期状態にしてシャッフルする.
deckInit (() =>  {
  let deck = [...this.deckList];
  deck.sort(()=> Math.random() - 0.5);
  return deck;
})