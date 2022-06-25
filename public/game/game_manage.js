import { Player } from "./player.js";

const player = new Player("aaa", 1000);

const numChip = document.getElementById("chip")
const buttom = document.getElementById("unko");
console.log(player.getChip());

buttom.onclick = function() {
  numChip.textContent = player.getChip();
}

numChip.onclick = null;