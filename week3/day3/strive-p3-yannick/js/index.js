window.onload = function () {
  this.indexPage();
};
function Navbar() {
  const menu = ["Home", "About", "Tours", "Contact"];
  let navbar = document.querySelector(".navbar-nav");
  this.console.log(navbar);
  for (let i = 0; i < menu.length; i++) {
    let item = menu[i];
    let li = this.addElement(navbar, "li", { className: "nav-item" });
    let link = this.addElement(li, "button", {
      className: "nav-link btn orange-btn",
      onclick: function () {
        let functionName = item.toLowerCase();
        if (item !== "Home") {
          eval(`${functionName}()`);
        } else {
          window.location.replace("/");
        }
      },
      innerText: item,
    });
  }
}
function indexPage() {
  Navbar();
  let root = document.querySelector(".root");

  /**<div class="jumbotron">
  <h1 class="display-4">Hello, world!</h1>
  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  <hr class="my-4">
  <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
  <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
</div> */

  let jumbotron = addElement(root, "div", {
    className: "jumbotron",
    style: `background:url(https://source.unsplash.com/1600x900/?beach);`,
  });
  let title = addElement(jumbotron, "h1", {
    className: "display-4",
    innerText: "Home, home, where I wanted to go",
    style: "color:white;",
  });
  let description = addElement(jumbotron, "p", {
    className: "lead",
    innerText: "As Coldplay say",
  });
  let divider = addElement(jumbotron, "hr", { className: "my-4" });
  let action = addElement(jumbotron, "a", {
    className: "btn btn-dark",
    innerText: "What ?",
    href: "https://www.youtube.com/watch?v=CtTCebEZMCQ",
    target: "blank",
  });
  renderDestinations(root, "Deals Of Week", destinations);
  renderDestinations(root, "Welcome Summer !", summerOffers);
  dealOfTheDay();
}

function renderDestinations(root, titleText, data) {
  let destinationsContainer = addElement(root, "div", {
    className: "destinations shadow-lg p-3 mb-5 bg-white rounded",
  });

  let title = addElement(destinationsContainer, "h2", {
    innerText: titleText,
    style: "margin:30px 0px;",
  });
  let row = addElement(destinationsContainer, "div", { className: "row" });
  for (let destination of data) {
    let col = addElement(row, "div", {
      className: "col-xl-4 col-md-4 col-md-3 col-sm-6 col-xs-12",
    });
    let card = addElement(col, "div", {
      className: "card",
      style: "margin-bottom:30px;",
    });
    let img = addElement(card, "img", {
      className: "card-img-top",
      src: destination.photo,
      style: "height:200px;",
    });
    let cardBody = addElement(card, "div", { className: "card-body" });
    let title = addElement(cardBody, "h5", {
      className: "card-title",
      innerText: destination.name,
    });
    let p = addElement(cardBody, "p", {
      className: "card-text",
      innerText: `€ ${destination.price}`,
    });
    let description = addElement(cardBody, "p", {
      className: "card-text",
      innerHTML: paragraph.substring(0, 100),
    });
    let action = addElement(cardBody, "a", {
      href: "#",
      className: "btn btn-dark",
      innerText: "Details",
    });
  }
}

function dealOfTheDay() {
  let allDatas = [...summerOffers, ...destinations]; // 10
  let randomDestination =
    allDatas[Math.ceil(Math.random() * allDatas.length - 1)];
  console.log(randomDestination);
  let root = document.querySelector(".root");
  let dealOfTheDay = addElement(root, "div", {
    className: "dealOfTheDay",
  });
  let title = addElement(dealOfTheDay, "h4", {
    innerText: "Deal Of The Day",
    style: "margin:30px 0px",
  });
  let row = addElement(dealOfTheDay, "div", { className: "row" });
  let photoSection = addElement(row, "div", { className: "col-8" });
  let image = addElement(photoSection, "img", {
    src: randomDestination.photo,
    style: "width:100%",
  });
  let infoSection = addElement(row, "div", { className: "col-4" });

  let titleOfDestination = addElement(infoSection, "h4", {
    innerText: randomDestination.name,
    style:
      "display:flex;flex-direction:row;justify-content:space-between;align-items:center;",
  });
  let badge = addElement(titleOfDestination, "span", {
    className: "badge badge-secondary",
    innerText: "Cheapest",
  });
  let price = addElement(infoSection, "h3", {
    innerText: `€ ${randomDestination.price}`,
  });
  addElement(infoSection, "div", {
    innerHTML: paragraph.substring(0, 1200),
    style: "text-align:justify;",
  });
}

function Testimonials() {
  /*
  fetch(`https://randomuser.me/api/?results=5`)
    .then((response) => response.json())
    .then(function (data) {
      let users = data.results;
    });
 */
  let users = Array.from({ length: 5 });
  let root = document.querySelector(".root");
  let;
}

function about() {
  let root = document.querySelector(".root");
  root.innerHTML = "";
  let contentContainer = addElement(root, "div", {
    className: "contentContainer",
    style: "padding:50px 0px;",
  });
  let title = addElement(contentContainer, "h2", { innerText: " About Us " });
  addElement(root, "div", { innerHTML: paragraph });
}

function tours() {
  let root = document.querySelector(".root");
  root.innerHTML = "";
  let contentContainer = addElement(root, "div", {
    className: "contentContainer",
    style: "padding:50px 0px;",
  });
  renderDestinations(root, "Tours", [...summerOffers, ...destinations]);
}

function contact() {
  let root = document.querySelector(".root");
  root.innerHTML = "";
  let contentContainer = addElement(root, "div", {
    className: "contentContainer",
    style: "padding:50px 0px;",
  });
  let title = addElement(contentContainer, "h2", { innerText: " Contact " });
  let formHTML = `<form>
  <div class="form-group">
    <label for="exampleFormControlInput1">Email address</label>
    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="johndoe@strive.school">
  </div>

  <div class="form-group">
    <label for="exampleFormControlTextarea1">Message</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
 <p style="text-align:right;">
  <button style="min-width:80px;" class="btn btn-dark">Send</button></p>
</form>`;

  let form = addElement(root, "div", { innerHTML: formHTML });
}
