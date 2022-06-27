const buttom = document.getElementById("gamestart");

buttom.addEventListener("click", () => {
  const uid = (new URL(document.location)).searchParams.get('uid');
  document.location.href = '../game?uid=' + uid
})