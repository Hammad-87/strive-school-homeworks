window.onload = function () {
  this.indexPage();
  let brand = document.querySelector("#brand");
  brand.onclick = function () {
    window.location.replace("/");
  };
};

function indexPage() {
  const root = document.querySelector(".root");
  let title = addElement(root, "h2", {
    innerText: "Favorites",
    style: "margin-top:50px;margin-bottom:50px;",
  });

  let row = addElement(root, "div", { className: "row" });

  for (let i = 0; i < albums.length; i++) {
    let album = albums[i];
    addCard(album, row, "sm");
  }
}
function addCard(album, row, size) {
  let col = addElement(row, "div", {
    className: `col-xl-${4} col-md-${3} col-md-${2}`,
    style: "margin-bottom:50px;",
  });
  let card = addElement(col, "div", {
    className: "card",
    style: "min-width:240px",
  });
  let img = addElement(card, "img", {
    className: "card-img-top",
    src: album.cover,
  });
  let body = addElement(card, "div", { className: "card-body" });
  let title = addElement(body, "h5", {
    className: "card-title",
    innerText: album.name,
  });
  let artist = addElement(body, "p", {
    className: "card-text",
    innerText: album.artist,
  });
  let year = addElement(body, "p", {
    className: "card-text",
    innerText: album.release,
  });
  let genre = addElement(body, "p", {
    className: "card-text genre",
    innerText: album.genre,
  });
  let a = addElement(body, "button", {
    className: "btn btn-danger",
    onclick: function () {
      detailPage(album);
    },
    style: "min-width:100%",
    innerHTML: "More &rarr; ",
  });
}
function detailPage(album) {
  let artist = artists.filter(function (o) {
    return o.name === album.artist;
  })[0];
  const root = document.querySelector(".root");
  const brand = document.querySelector("#brand");
  brand.innerHTML = "&larr; Back To Albums";
  root.innerHTML = "";
  let jumbotron = addElement(root, "div", {
    className: "jumbotron jumbotron-fluid",
    style: `background:url(${album.cover});background-size:cover; background-position:50% 35%; height:400px; margin-top:50px;padding:30px;`,
  });
  let jumbotronContainer = addElement(jumbotron, "div", {
    className: "container",
  });

  let jumbotronTitle = addElement(jumbotronContainer, "h1", {
    className: "display-4",
    innerText: album.name,
    style: "color:#fff",
  });
  let jumbotronDescription = addElement(jumbotronContainer, "p", {
    className: "lead",
    innerText: `${album.artist},${album.release}`,
    style: "color:#fff",
  });
  let button = addElement(jumbotronContainer, "a", {
    className: "btn btn-danger",
    innerText: "Listen",
    style: "width:80px",
    href: album.url,
    target: "blank",
  });

  let albumTitle = addElement(root, "h2", { innerText: "About Album" });
  let aboutAlbum = addElement(root, "p", { innerText: album.info });
  let aboutTitle = addElement(root, "h3", {
    innerText: "About Artist",
    style: "margin:50px 0px;",
  });
  let aboutContent = addElement(root, "div", { className: "row" });
  let artistAvatarContainer = addElement(aboutContent, "div", {
    className: "col-md-4 col-lg-4 col-xl-4 col-sm-12",
  });
  let avatar = addElement(artistAvatarContainer, "img", {
    src: artist.avatar,
    style: "width:100%",
  });
  let artistInfoContainer = addElement(aboutContent, "div", {
    className: "col-md-8 col-lg-8 col-xl-8 col-sm-12",
  });

  let artistTitle = addElement(artistInfoContainer, "h4", {
    innerText: artist.name,
  });
  let about = addElement(artistInfoContainer, "div", { innerText: artist.bio });
  /*
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Fluid jumbotron</h1>
    <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
  </div>
</div>
  */
}
