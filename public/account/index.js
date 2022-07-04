const mainmenu1 = document.getElementById("mainmenu1");
const mainmenu2 = document.getElementById("mainmenu2");

mainmenu1.addEventListener("click", () => {
  const uid = (new URL(document.location)).searchParams.get('uid');
  document.location.href = '../mainmenu?uid=' + uid;
})

mainmenu2.addEventListener("click", () => {
  const uid = (new URL(document.location)).searchParams.get('uid');
  document.location.href = '../mainmenu?uid=' + uid;
})