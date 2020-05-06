/*
      JS Exercises
      EX11) Write a function to add a new link into the navbar
      EX12) Write a function to remove the Search Looking class item
      EX13) Write a function to change the background of the jumbotron
      EX14) Write a function to change the color of the main title
      EX15) Write a function to change the column size for post headings
      EX16) Write a function to remove all the links under "Elsewhere"
      EX17) Write a function to trim just the first 150 characters for each blog post
      EX18) Write a function and attach it to the "Newer" button, to add new Blog Post (just div and title)
      EX19) Write a function and attach it to the "Older" button, to remove the last Blog Post
      EX20) Write an alert with the name of the author every time the user hover with the mouse over an author name
  */

window.onload = function () {
  addNewLink();
  removeSearch();
  changeBgJumbotron();
  changeColorTitle();
  trimFirst150();
  attachToNewer();
  attachToOlder();
  alertAuthorName();
};

// ex-11
function addNewLink() {
  let nav = document.querySelector("nav");
  let a = document.createElement("a");
  a.className = "p-2 text-muted";
  a.href = "#";
  a.innerText = "New Link";
  nav.appendChild(a);
}

//ex-12

function removeSearch() {
  let search = document.querySelector(".text-muted svg");
  search.style.display = "none";
}

// ex-13
function changeBgJumbotron() {
  let jumbotron = document.querySelector(".jumbotron");
  jumbotron.style.background =
    "url(https://occ-0-2219-33.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABceL_FxRrEg1Jm2LyiYugCJwBkJ2v4GmCBWQ_JNLBXCu1tpO1CMoOxGk9R74PCzrCR0FLIrjdgZlyIHnZEuiHArY6C9G.jpg?r=a82)";
}

//ex-14

function changeColorTitle() {
  let title = document.querySelector("h1");
  title.style.color = "red";
}

// ex-15

function changeColumnSize() {}

//ex 16

function removeAllLinksUnderElseWhere() {}

function trimFirst150() {
  let allPinPost = document.querySelectorAll(".blog-post p");
  allPinPost.forEach((p) => {
    //console.log(p);
    p.innerText = p.innerHTML.substring(0, 150) + " ...";
  });
}

function attachToNewer() {
  let btn = document.querySelector(".blog-pagination .btn-outline-secondary");
  ///console.log(btn);
  btn.onclick = function () {
    alert("hasd");
    let newPost = document.createElement("div");
    newPost.className = "blog-post new-blog";
    let title = document.createElement("h2");
    title.className = "blog-post-title";
    title.innerText = "New Blog Post";
    let p = document.createElement("p");
    p.innerText = "lorem ipsum aşsdksakl";
    newPost.appendChild(title);
    newPost.appendChild(p);
    let blogContainer = document.querySelector(".blog-main");
    blogContainer.appendChild(newPost);
  };
}

function attachToOlder() {
  let btn = document.querySelector(".blog-pagination .btn-outline-primary");
  //console.log(btn);
  btn.onclick = function () {
    let last = document.querySelector(".blog-main").lastChild;
    last.style.display = "none";
  };
}
function alertAuthorName() {}
