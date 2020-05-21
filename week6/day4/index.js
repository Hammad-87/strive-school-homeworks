const API_ENDPOINT = "https://striveschool.herokuapp.com/books";
let cart = [];
let raw = [];

const initialDefinitions = (books) => {
  let search = document.querySelector("#search");
  let emptyCartBtn = document.querySelector("#empty-cart");
  emptyCartBtn.onclick = emptyCart;
  search.onkeyup = function (e) {
    let query = e.currentTarget.value;
    let filtered = filterData(books, query);
    let placeholder;
    if (filtered.length === 0) {
      placeholder = SearchPlaceHolder(query);
    } else {
      if (placeholder) {
        removeElement(placeholder);
      }
      RenderBooks(filtered, 5, 0);
    }
  };
};

const cartTotal = () => {
  return cart
    .reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
    .toFixed(2);
};

const addToCart = (e, item) => {
  let exists = _.find(cart, { asin: item.asin });
  if (exists) {
    let bookInCart = _.find(cart, { asin: item.asin });
    bookInCart.quantity++;
    e.currentTarget.innerHTML = AddButton(exists.quantity);
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  RenderCart();
};

const removeItemFromCart = (item) => {
  cart = _.without(cart, item);
  RenderCart();
  let addBtn = document.getElementById(`add-item-${item.asin}`);
  addBtn.innerHTML = AddButton(0);
};

const emptyCart = () => {
  cart = [];
  RenderCart();
};

const filterData = (data, query) => {
  let q = query.toLowerCase();
  return _.filter(data, function (o) {
    return (
      o.title.toLowerCase().includes(q) || o.category.toLowerCase().includes(q)
    );
  });
};

const GET_BOOKS = function (callback) {
  let loader = Loader();
  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((books) => {
      raw = books;
      callback && callback(null, books);
      removeElement(loader);
    })
    .catch((error) => {
      callback && callback(error, null);
    });
};

const Loader = () => {
  /*
        We call this function before loading data from server
        to give feedback user 
    */
  let container = document.querySelector("body");
  let div = document.createElement("div");
  div.innerHTML = LoaderComponent();
  container.appendChild(div);
  return div;
};
const SearchPlaceHolder = (message) => {
  /*
        Search placeholder is the component
        we use to tell user there is no results for current query
    */
  let container = document.querySelector(".items");
  container.innerHTML = "";
  let placeholder = document.createElement("div");
  let content = SearchPlaceHolderComponent(message);
  placeholder.innerHTML = content;
  container.appendChild(placeholder);
  /* we return component back to where we created ,
    so we can remove it later without querying again
  */
  return placeholder;
};
const removeElement = (element) => {
  element.remove();
};
const RenderBooks = (raw, perPage, page) => {
  let chunks = _.chunk(raw, perPage);
  RenderPagination(chunks, page, raw, perPage);
  let books = chunks[page];
  let items = document.querySelector(".items");
  items.innerHTML = "";
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    let exists = _.find(cart, { asin: book.asin });
    let item = document.createElement("div");
    item.className = "item";
    item.innerHTML = BookItemComponent(book, exists);
    items.appendChild(item);
    let addButton = document.querySelector(`#add-item-${book.asin}`);
    let skipButton = document.querySelector(`#remove-item-${book.asin}`);
    skipButton.addEventListener("click", function (e) {
      removeElement(item);
    });
    addButton.addEventListener("click", function (e) {
      e.currentTarget.innerHTML = AddButton(1);
      addToCart(e, book);
    });
  }
};
const RenderPagination = (chunks, page, raw, perPage) => {
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
};
const RenderCart = () => {
  let cartItems = document.querySelector(".list");
  cartItems.innerHTML = "";
  let totalPriceContainer = document.querySelector(".total-price");
  totalPriceContainer.innerHTML = "";
  let total = document.createElement("h3");
  total.innerText = `Total : ${cartTotal()} €`;
  totalPriceContainer.appendChild(total);
  if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      let itemElement = document.createElement("div");
      itemElement.className = "item";
      itemElement.innerHTML = BookItemCart(item);
      cartItems.appendChild(itemElement);
      let removeButton = document.querySelector(`#remove-btn-${item.asin}`);
      removeButton.onclick = function () {
        removeItemFromCart(item);
      };
    }
  } else {
    let emptyCart = document.createElement("div");
    emptyCart.innerHTML = EmptyCartComponent();
    cartItems.appendChild(emptyCart);
  }
};

const onLoad = () => {
  GET_BOOKS((err, books) => {
    if (err) {
      console.log(err);
    } else {
      RenderBooks(books, 5, 0);
      initialDefinitions(books);
    }
  });
};

window.onload = onLoad;
