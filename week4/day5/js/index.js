window.onload = function () {
  NavBar();
  HighLights();
  MainCarousel();
  VerticalCards();
  //GridCarousel();
  Releases();
  Missed();
};

const NavBar = () => {
  let root = document.querySelector("#root");
  let navBG = addElement(root, "div", { className: "nav-bg" });
  let nav = addElement(root, "nav", {
    className: "navbar  navbar-expand-lg navbar-dark",
  });
  let navContainer = addElement(nav, "div", { className: "container" });
  let logoLink = addElement(navContainer, "a", {
    className: "navbar-brand",
    href: "/",
  });
  let logo = addElement(logoLink, "img", {
    id: "brand-logo",
    src: "./assets/brand-logo.png",
  });
  let ul = addElement(navContainer, "ul", {
    className: "navbar-nav mr-auto",
  });
  for (let i = 0; i < menu.length; i++) {
    let item = menu[i];
    let li = addElement(ul, "li", { className: "nav-item d-sm-none" });
    let a = addElement(ul, "a", {
      className: "nav-link",
      href: item.href,
      innerText: item.name,
    });
  }
  let form = addElement(navContainer, "form", {
    className: "form-inline my-2 my-lg-0",
  });
  let shoppingCart = addElement(form, "button", { className: "icon-button" });
  let shoppingIcon = addElement(shoppingCart, "i", {
    className: "fas fa-shopping-cart",
  });
  let search = addElement(form, "button", { className: "icon-button" });
  let searchIcon = addElement(search, "i", {
    className: "fas fa-search",
  });
};

const HighLights = () => {
  let content = document.querySelector(".content");
  let title = addTitle(content, "High Lights", "fas fa-marker");
};

const addTitle = (container, text, icon) => {
  let titleContainer = addElement(container, "div", {
    className: "title-container container",
  });
  let title = addElement(titleContainer, "div", {
    className: "title",
    style: "margin:50px 0px;",
  });
  let iconContainer = addElement(title, "div", { className: "title-icon" });
  let iconComponent = addElement(iconContainer, "i", {
    className: icon,
  });
  let titleText = addElement(title, "div", {
    className: "title-text",
    innerText: text,
  });
  let divider = addElement(titleContainer, "hr", { className: "hr" });
};

const MainCarousel = () => {
  let content = document.querySelector(".content");
  let carousel = addElement(content, "div", {
    id: "mainCarousel",
    className: "carousel slide",
  });
  carousel.setAttribute("data-ride", "carousel");
  let indicators = addElement(carousel, "ol", {
    className: "carousel-indicators",
  });
  for (let i = 0; i < 3; i++) {
    let li = addElement(indicators, "li", {
      name: `indicator ${i}`,
      className: i === 0 ? "active" : "passive",
    });
    li.setAttribute("data-target", "#mainCarousel");
    li.setAttribute("data-slide-to", i);
  }
  let carouselInner = addElement(carousel, "div", {
    className: "carousel-inner",
  });
  for (let j = 0; j < 3; j++) {
    let slide = addElement(carouselInner, "div", {
      className: `carousel-item ${j === 0 ? "active" : ""}`,
    });
    let triple = addElement(slide, "div", { className: "carousel-triple" });
    for (let i = 1; i < 4; i++) {
      let img = addElement(triple, "div", {
        style: `background:url(${`./assets/carousel${
          j + i
        }.jpg`});background-repeat:no-repeat;object-fit:cover;background-size:cover;`,
        className:
          i === 1
            ? `carousel-image`
            : i === 2
            ? "carousel-image-middle"
            : "carousel-image",
      });
      i === 1 && img.setAttribute("data-slide", "prev");
      i === 1 && img.setAttribute("href", "#mainCarousel");
      i === 3 && img.setAttribute("data-slide", "next");
      i === 3 && img.setAttribute("href", "#mainCarousel");
      img.setAttribute("role", "button");
      if (i === 2) {
        let footer = addElement(img, "div", {
          className: "card-footer",
          style: "width:100%",
        });
        let platforms = addElement(footer, "div", { className: "platforms" });
        let windows = addElement(platforms, "i", {
          className: "fab fa-windows platform-icon",
        });
        let apple = addElement(platforms, "i", {
          className: "fab fa-apple platform-icon",
        });

        let row = addElement(img, "div", {
          style:
            "display:flex;flex-direction:row;width:100%;justify-content:space-between;align-items:center;",
        });
        let title = addElement(row, "h3", {
          className: "middle-title",
          innerText: `Title ${j + 1}`,
        });
        let left = addElement(row, "div", {
          style: "display:flex;flex-direction:row",
        });
        let priceContainer = addElement(left, "div", {
          className: "price-container",
        });
        let discount = addElement(priceContainer, "div", {
          className: "discount",
          innerText: `- % ${Math.ceil(Math.random() * 15)}`,
          style: "font-size:20pt;",
        });
        let prices = addElement(priceContainer, "div", {
          className: "prices",
        });
        let newPrice = addElement(prices, "div", {
          className: "new-price",
          innerText: `$ ${Math.ceil(Math.random() * 50)}.99`,
          style: "color:white;font-size:20pt",
        });
        let button = addElement(left, "button", {
          className: "add-to-cart-button",
          style:
            "display:inline;width:180px;;height:50px;font-size:15pt;margin-left:50px;",
        });
        button.innerHTML = `<i class="fas fa-cart-plus"></i> Add to cart`;
      }
    }
  }
  let prevButton = addElement(carousel, "a", {
    className: "carousel-control-prev",
    href: "#mainCarousel",
  });

  prevButton.setAttribute("data-slide", "prev");
  prevButton.setAttribute("role", "button");
  let prevIcon = addElement(prevButton, "i", {
    className: "fas fa-chevron-circle-left",
  });

  let nextButton = addElement(carousel, "a", {
    className: "carousel-control-next",
    href: "#mainCarousel",
  });

  nextButton.setAttribute("data-slide", "next");
  nextButton.setAttribute("role", "button");
  let nextIcon = addElement(nextButton, "i", {
    className: "fas fa-chevron-circle-right",
  });
};

const VerticalCards = () => {
  let content = document.querySelector(".content");
  let container = addElement(content, "div", { className: "container" });
  let row = addElement(container, "div", {
    className: "row",
    style: "margin-top:100px;",
  });
  for (let i = 1; i <= 4; i++) {
    let col = addElement(row, "div", { className: "col-sm-3" });
    let card = addElement(col, "div", { className: "card" });
    let cardMedia = addElement(card, "div", { className: "card-media" });
    let img = addElement(cardMedia, "img", {
      className: "card-image",
      src: `./assets/tile (${i}).jpg`,
      style: "height:150px;object-fit:cover;",
    });
    let title = addElement(card, "div", {
      className: "card-title",
      innerText: `Item ${i}`,
    });
    let footer = addElement(card, "div", { className: "card-footer" });
    let platforms = addElement(footer, "div", { className: "platforms" });
    let windows = addElement(platforms, "i", {
      className: "fab fa-windows platform-icon",
    });
    let apple = addElement(platforms, "i", {
      className: "fab fa-apple platform-icon",
    });
    let priceContainer = addElement(footer, "div", {
      className: "price-container",
    });
    let discount = addElement(priceContainer, "div", {
      className: "discount",
      innerText: "-25%",
    });
    let prices = addElement(priceContainer, "div", { className: "prices" });
    let oldPrice = addElement(prices, "div", {
      className: "old-price",
      innerText: "$85.99",
    });
    let newPrice = addElement(prices, "div", {
      className: "new-price",
      innerText: "$55.99",
    });
    let button = addElement(priceContainer, "button", {
      className: "add-to-cart-button",
    });
    let icon = addElement(button, "div", { className: "fas fa-cart-plus" });
  }
};

const GridCarousel = () => {
  let content = document.querySelector(".content");
  addTitle(content, "Recommended For You", "fas fa-compass");
  let container = addElement(content, "div", { className: "container" });
  let row = addElement(container, "div", {
    className: "row",
    style: "margin-top:25px;",
  });
  for (let i = 6; i < 14; i++) {
    let col = addElement(row, "div", {
      className: "col-sm-3",
      style: "margin-top:25px;",
    });
    let card = addElement(col, "div", { className: "card" });
    let cardMedia = addElement(card, "div", { className: "card-media" });
    let img = addElement(cardMedia, "img", {
      className: "card-image",
      src: `./assets/tile (${i}).jpg`,
      style: "height:150px;object-fit:cover;",
    });
    let title = addElement(card, "div", {
      className: "card-title",
      innerText: `Item ${i}`,
    });
    let footer = addElement(card, "div", { className: "card-footer" });
    let platforms = addElement(footer, "div", { className: "platforms" });
    let windows = addElement(platforms, "i", {
      className: "fab fa-windows platform-icon",
    });
    let apple = addElement(platforms, "i", {
      className: "fab fa-apple platform-icon",
    });
    let priceContainer = addElement(footer, "div", {
      className: "price-container",
    });
    let discount = addElement(priceContainer, "div", {
      className: "discount",
      innerText: "-25%",
    });
    let prices = addElement(priceContainer, "div", { className: "prices" });
    let oldPrice = addElement(prices, "div", {
      className: "old-price",
      innerText: "$85.99",
    });
    let newPrice = addElement(prices, "div", {
      className: "new-price",
      innerText: "$55.99",
    });
    let button = addElement(priceContainer, "button", {
      className: "add-to-cart-button",
    });
    let icon = addElement(button, "div", { className: "fas fa-cart-plus" });
  }
};

const Releases = () => {
  let content = document.querySelector(".content");
  addTitle(content, "Recommended For You", "fas fa-compass");
  let carousel = addElement(content, "div", {
    id: "releaseCarousel",
    className: "carousel slide",
  });
  carousel.setAttribute("data-ride", "carousel");
  let indicators = addElement(carousel, "ol", {
    className: "carousel-indicators",
  });
  for (let i = 0; i < 4; i++) {
    let li = addElement(indicators, "li", {
      name: `indicator ${i}`,
      className: i === 0 ? "active" : "passive",
    });
    li.setAttribute("data-target", "#releaseCarousel");
    li.setAttribute("data-slide-to", i);
  }
  let carouselInner = addElement(carousel, "div", {
    className: "carousel-inner",
  });
  for (let j = 0; j < 4; j++) {
    let slide = addElement(carouselInner, "div", {
      className: `carousel-item ${j === 0 ? "active" : ""}`,
    });
    let container = addElement(slide, "div", { className: "container" });
    let row = addElement(container, "div", { className: "row" });
    let col1 = addElement(row, "div", { className: "col-sm-4" });

    let col2 = addElement(row, "div", { className: "col-sm-8" });
    for (let i = 6; i < 14; i++) {
      let col = addElement(row, "div", {
        className: "col-sm-3",
        style: "margin-top:25px;",
      });
      let card = addElement(col, "div", { className: "card" });
      let cardMedia = addElement(card, "div", { className: "card-media" });
      let img = addElement(cardMedia, "img", {
        className: "card-image",
        src: `./assets/tile (${i + j}).jpg`,
        style: "height:150px;object-fit:cover;",
      });
      let title = addElement(card, "div", {
        className: "card-title",
        innerText: `Item ${i}`,
      });
      let footer = addElement(card, "div", { className: "card-footer" });
      let platforms = addElement(footer, "div", { className: "platforms" });
      let windows = addElement(platforms, "i", {
        className: "fab fa-windows platform-icon",
      });
      let apple = addElement(platforms, "i", {
        className: "fab fa-apple platform-icon",
      });
      let priceContainer = addElement(footer, "div", {
        className: "price-container",
      });
      let discount = addElement(priceContainer, "div", {
        className: "discount",
        innerText: "-25%",
      });
      let prices = addElement(priceContainer, "div", { className: "prices" });
      let oldPrice = addElement(prices, "div", {
        className: "old-price",
        innerText: "$85.99",
      });
      let newPrice = addElement(prices, "div", {
        className: "new-price",
        innerText: "$55.99",
      });
      let button = addElement(priceContainer, "button", {
        className: "add-to-cart-button",
      });
      let icon = addElement(button, "div", { className: "fas fa-cart-plus" });
    }
  }
};

const Missed = () => {
  let content = document.querySelector(".content");
  addTitle(content, "Releases you might have missed", "fas fa-star");
  let carousel = addElement(content, "div", {
    id: "missedCarousel",
    className: "carousel slide",
  });
  carousel.setAttribute("data-ride", "carousel");
  let indicators = addElement(carousel, "ol", {
    className: "carousel-indicators",
  });
  for (let i = 0; i < 3; i++) {
    let li = addElement(indicators, "li", {
      name: `indicator ${i}`,
      className: i === 0 ? "active" : "passive",
    });
    li.setAttribute("data-target", "#missedCarousel");
    li.setAttribute("data-slide-to", i);
  }
  let carouselInner = addElement(carousel, "div", {
    className: "carousel-inner",
  });
  for (let j = 0; j < 3; j++) {
    let slide = addElement(carouselInner, "div", {
      className: `carousel-item ${j === 0 ? "active" : ""}`,
    });
    let container = addElement(slide, "div", { className: "container" });
    let row = addElement(container, "div", { className: "row" });
    let col1 = addElement(row, "div", { className: "col-sm-4" });
    let col2 = addElement(row, "div", { className: "col-sm-8" });
    for (let i = 6; i < 10; i++) {
      let col = addElement(row, "div", {
        className: "col-sm-3",
        style: "margin-top:25px;",
      });
      let card = addElement(col, "div", { className: "card" });
      let cardMedia = addElement(card, "div", { className: "card-media" });
      let img = addElement(cardMedia, "img", {
        className: "card-image",
        src: `./assets/tile (${i + j}).jpg`,
        style: "height:150px;object-fit:cover;",
      });
      let title = addElement(card, "div", {
        className: "card-title",
        innerText: `Item ${i}`,
      });
      let footer = addElement(card, "div", { className: "card-footer" });
      let platforms = addElement(footer, "div", { className: "platforms" });
      let windows = addElement(platforms, "i", {
        className: "fab fa-windows platform-icon",
      });
      let apple = addElement(platforms, "i", {
        className: "fab fa-apple platform-icon",
      });
      let priceContainer = addElement(footer, "div", {
        className: "price-container",
      });
      let discount = addElement(priceContainer, "div", {
        className: "discount",
        innerText: "-25%",
      });
      let prices = addElement(priceContainer, "div", { className: "prices" });
      let oldPrice = addElement(prices, "div", {
        className: "old-price",
        innerText: "$85.99",
      });
      let newPrice = addElement(prices, "div", {
        className: "new-price",
        innerText: "$55.99",
      });
      let button = addElement(priceContainer, "button", {
        className: "add-to-cart-button",
      });
      let icon = addElement(button, "div", { className: "fas fa-cart-plus" });
    }
  }
};
