window.onload = function () {
  createTitle();
};

function createTitle(titleText, element) {
  let root = document.querySelector("#root");
  let title = addElement(root, "h1", {
    innerText: "Hello Spotify!",
  });
}
function createLayout() {}
