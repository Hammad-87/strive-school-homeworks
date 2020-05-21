const API_ENDPOINT = "https://striveschool.herokuapp.com/books";
let cart = [];
const GET_BOOKS = function (callback) {
  let loader = showLoader();

  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((books) => {
      callback && callback(null, books);
      removeElement(loader);
    })
    .catch((error) => {
      callback && callback(error, null);
    });
};
const showLoader = () => {
  let container = document.querySelector(".items");
  let div = document.createElement("div");
  div.innerHTML = `
   <div class="ui active dimmer">
    <div class="ui text loader">Loading</div>
  </div>`;
  container.appendChild(div);
  return div;
};
const showPlaceHolder = (message) => {
  let container = document.querySelector(".items");
  container.innerHTML = "";
  let placeholder = document.createElement("div");
  let content = `<div class="ui placeholder segment">
  <div class="ui icon header">
    <i class="search icon"></i>
   ${message}
  </div>
</div>`;
  placeholder.innerHTML = content;
  container.appendChild(placeholder);
  return placeholder;
};
const removeElement = (element) => {
  element.remove();
};
const RenderBooks = (raw, perPage, page) => {
  let chunks = _.chunk(raw, perPage);
  console.log(chunks);
  let books = chunks[page];
  let items = document.querySelector(".items");
  let pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";
  let before = document.createElement("a");
  before.className = "item";
  before.innerHTML = `<i class="left chevron icon"></i>`;
  pagination.appendChild(before);
  before.addEventListener("click", function () {
    if (page - 1 >= 0) {
      RenderBooks(raw, perPage, page - 1);
    }
  });
  let a = document.createElement("a");
  a.innerText = `${page + 1}/${chunks.length}`;
  a.className = "active item";
  pagination.appendChild(a);
  let after = document.createElement("a");
  after.className = "item";
  after.innerHTML = `<i class="right chevron icon"></i>`;
  pagination.appendChild(after);
  after.addEventListener("click", function () {
    if (page + 1 < chunks.length) {
      RenderBooks(raw, perPage, page + 1);
    }
  });
  items.innerHTML = "";
  console.log(items);
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let exists = _.find(cart, { asin: book.asin });
    let item = document.createElement("div");
    item.className = "item";
    item.classList.add("animate__fadeInUp");
    item.innerHTML = `
    <div class="image">
          <img class="ui image centered small" src=${book.img}>
        </div>
        <div class="content">
        
          <a class="header">${book.title}</a>
          
          <div class="meta">
         <a class="ui red horizontal label">${book.category.toUpperCase()}</a>
        
          </div>
  
        </div>
       <div class="ui right floated actions">
            <h4>${book.price} €</h4>
                 <div class="extra">
    <div  class="ui vertical animated basic button" tabindex="0">
            <div class="hidden content">
            Skip
        </div>
        <div class="visible content">
           <i class="eye slash icon"></i>
        </div>
        </div>
       <div 
       id="${book.asin}"
       class="ui vertical animated secondary button add-button" tabindex="0">
            <div class="hidden content">
            Add
        </div>
        <div class="visible content">
          <i class="shop icon"></i>
         ${exists ? exists.quantity : 0}
        </div>
        </div>
            </div> 
        
        </div>
        
     `;
    items.appendChild(item);
  }
  let addButtons = document.querySelectorAll(".add-button");
  for (let i = 0; i < addButtons.length; i++) {
    let addButton = addButtons[i];
    addButton.addEventListener("click", function (e) {
      let asin = e.currentTarget.id;
      let book = _.find(books, { asin });
      let exists = _.find(cart, { asin });
      e.currentTarget.innerHTML = `   <div class="hidden content">
            Add
        </div>
        <div class="visible content">
           <i class="shop icon"></i>
           1
        </div>
        </div>
            </div> `;
      if (exists) {
        let bookInCart = _.find(cart, { asin });
        bookInCart.quantity++;
        RenderCart();
        e.currentTarget.innerHTML = `   <div class="hidden content">
            Add
        </div>
        <div class="visible content">
           <i class="shop icon"></i>
         ${exists.quantity}
        </div>
        </div>
            </div> `;
      } else {
        addToCart({ ...book, quantity: 1 });
      }
    });
  }
};
const RenderCart = () => {
  let cartItems = document.querySelector(".list");
  cartItems.innerHTML = "";
  let totalPrice = cart.reduce(
    (accumulator, item) => accumulator + item.quantity * item.price,
    0
  );
  let totalPriceContainer = document.querySelector(".total-price");
  totalPriceContainer.innerHTML = "";
  let total = document.createElement("h3");

  total.innerText = `Total : ${totalPrice.toFixed(2)} €`;
  totalPriceContainer.appendChild(total);

  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      let itemElement = document.createElement("div");
      itemElement.className = "item";
      itemElement.innerHTML = `

       <img class="ui mini image" src=${item.img}></img>
            
           
            <div class="content">
                  <a class="header">${item.title.substring(0, 30)} ... </a>
                  <div class="description">Quantity : ${item.quantity}</div>
                  <div class="description">${(
                    item.price * item.quantity
                  ).toFixed(2)} €</div>
                    
                  </div>
      `;
      cartItems.appendChild(itemElement);
    }
  } else {
    let emptyCart = document.createElement("div");
    emptyCart.innerHTML = `
    <div class="ui centered piled empty-cart">
    <i class="shop icon"></i>
    Your Cart Is Empty
    </div>
    
    `;
    cartItems.appendChild(emptyCart);
  }
};
const filterData = (data, query) => {
  let q = query.toLowerCase();
  return _.filter(data, function (o) {
    return (
      o.title.toLowerCase().includes(q) || o.category.toLowerCase().includes(q)
    );
  });
};
window.onload = function () {
  GET_BOOKS((err, books) => {
    if (err) {
    } else {
      RenderBooks(books, 5, 0);
      let search = document.querySelector("#search");
      let emptyCartBtn = document.querySelector("#empty-cart");
      emptyCartBtn.onclick = emptyCart;
      search.onkeyup = function (e) {
        let query = e.currentTarget.value;
        let filtered = filterData(books, query);
        let placeholder;
        if (filtered.length === 0) {
          placeholder = showPlaceHolder(
            `We couldn't find any books with the name '${query}'`
          );
        } else {
          if (placeholder) {
            removeElement(placeholder);
          }
          RenderBooks(filtered, 5, 0);
        }
      };
    }
  });
};

const addToCart = (item) => {
  cart.push(item);
  RenderCart();
};

const emptyCart = () => {
  cart = [];
  RenderCart();
};
