window.onload = function () {
  this.indexPage();
};
function Navbar() {
  const menu = ["Home", "About Us", "Tours", "Contact"];
  let navbar = document.querySelector(".navbar-nav");
  this.console.log(navbar);
  for (let i = 0; i < menu.length; i++) {
    let item = menu[i];
    let li = this.addElement(navbar, "li", { className: "nav-item" });
    let link = this.addElement(li, "a", {
      className: "nav-link",
      href: "#",
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

  let jumbotron = addElement(root, "div", { className: "jumbotron" });
  let title = addElement(jumbotron, "h1", {
    className: "display-4",
    innerText: "My Tour Operator",
  });
  let description = addElement(jumbotron, "p", {
    className: "lead",
    innerText: "My Simple Exp.",
  });
  let divider = addElement(jumbotron, "hr", { className: "my-4" });
  let action = addElement(jumbotron, "button", {
    className: "btn btn-dark",
    innerText: "My Action",
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
      className: "col-xl-3 col-md-4 col-md-3 col-sm-6 col-xs-12",
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
}
