let loading = false;
let imagesArray = [];
let errorMessage = {};
let API_ENDPOINT = "http://www.splashbase.co/api/v1/images/search?query=";
function getImages(query, callback) {
  // loading is true because fetching takes time we must give feedback to user
  loading = true;
  fetch(API_ENDPOINT + query)
    .then((response) => response.json())
    // we are getting data as json object
    .then((data) => {
      const { images } = data;
      //object deconstructing => we are getting images from data object
      imagesArray = images;
      // we assign fetched images array to imagesArray and push it to global variables stack
      loading = false;
      // since images are loaded we can let user know
      callback(null, images);
    })
    .catch((error) => {
      callback(error, null);
      loading = false;
      // loading false
    });
}
const onLoad = () => {
  let primaryButton = document.querySelector(".btn-primary");
  primaryButton.innerText = "Load Computer Images";
  let secondaryButton = document.querySelector(".btn-secondary");
  secondaryButton.innerText = "Search Image";
  primaryButton.addEventListener("click", function () {
    getImages("computer", (error, images) => {
      if (error) {
        console.error(error);
      } else {
        if (images.length > 0) {
          mapImagesToCards(images, "Computer");
        } else {
          console.log("images not found");
        }
      }
    });
  });
  secondaryButton.addEventListener("click", function () {
    let query = document.querySelector("#query");
    getImages(query.value, (error, images) => {
      if (error) {
        console.error(error);
      } else {
        if (images.length > 0) {
          mapImagesToCards(images, "People");
        } else {
          let alert = `<div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">HEADS UP !</h4>
                <p> We couldnt find image for the query ${query.value}</p>
                <hr>
                <p class="mb-0">Are you sure this thing is exists? BECAUSE OUR API IS AWESOME AND IT HAS EVERYTHING IN IT</p>

                </div>`;

          let alertArea = document.querySelector("#alert-area");
          alertArea.innerHTML = alert;
          setTimeout(() => {
            alertArea.innerHTML = "";
          }, 6000);
        }
      }
    });
  });
};
const mapImagesToCards = (images, randomQuery) => {
  let cards = document.querySelectorAll(".card");
  let heading = document.querySelector(".jumbotron-heading");
  heading.innerText = `Results for ${randomQuery}`;
  for (let i = 0; i < images.length; i++) {
    let card = cards[i];
    let image = images[i];
    let svg = card.querySelector("svg");
    if (svg) {
      svg.remove();
    }
    let imageExists = document.querySelector(`#image-${i}`);
    if (imageExists) {
      imageExists.src = image.url;
    } else {
      let img = document.createElement("img");
      img.id = `image-${i}`;
      img.style = "width:100%;object-fit:cover;";
      card.insertBefore(img, card.firstChild);
      img.src = image.url;
      let cardButtons = card.querySelectorAll("button");
      let primaryButton = cardButtons[0];
      let secondaryButton = cardButtons[1];
      primaryButton.setAttribute("data-toggle", "modal");
      primaryButton.setAttribute("data-target", "#modal");
      primaryButton.addEventListener("click", function (e) {
        let bigImage = document.createElement("img");
        bigImage.style =
          "width:100%;object-fit:cover;background-repeat:no-repeat;";
        bigImage.src = img.src;
        let modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML = "";
        modalBody.appendChild(bigImage);
        secondaryButton.innerText = "Hide";
        let textMuted = card.querySelector("small");
        textMuted.innerText = img.id;
      });
      secondaryButton.addEventListener("click", function (e) {
        let col = card.parentNode;

        col.remove();
      });
    }
  }
};
window.onload = onLoad;
