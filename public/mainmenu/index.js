const gamestart = document.getElementById("gamestart");
const rule = document.getElementById("rule");
const ranking = document.getElementById("ranking");

gamestart.addEventListener("click", () => {
  const uid = (new URL(document.location)).searchParams.get('uid');
  document.location.href = '../game?uid=' + uid;
})

rule.addEventListener("click", () => {
  const uid = (new URL(document.location)).searchParams.get('uid');
  document.location.href = '../rule?uid=' + uid;
})

ranking.addEventListener("click", () => {
  const uid = (new URL(document.location)).searchParams.get('uid');
  document.location.href = '../account?uid=' + uid;
})