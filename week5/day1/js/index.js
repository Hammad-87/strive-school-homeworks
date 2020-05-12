let device = {
  width: window.innerWidth,
  height: window.innerHeight,
};
var lastScrollTop = 0;

let activePage = "Home";
let currentSong = {};
let isPlaying = false;
let isMuted = false;
let songIndex = 0;
window.onload = function () {
  this.start();
};
window.onresize = updateScreenSizes;
// element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
function start() {
  createLayout();
  createControllers();
  initializePlayer(0);
  routeToPage("Home");
}
function initializePlayer() {
  let root = document.querySelector("#player-area");
  let player = addElement(root, "audio", { id: "player" });
  player.source = null;
  let source = addElement(player, "source", {
    src: "./data/album/0.m4a",
    type: "audio/x-m4a",
    controls: true,
    style: "z-index:-1",
  });
  player.onloadedmetadata = function () {
    player.volume = 0.5;
    let duration = document.querySelector("#duration");
    let currentTime = document.querySelector("#current-time");
    currentTime.innerText = "00:00";
    duration.innerText = toHHMMSS(player.duration);
  };
}
async function switchSong(index) {
  if (index >= 0 && index <= album.songs.length - 1) {
    let currentTime = document.querySelector("#current-time");
    let title = document.querySelector(".song-info-title");
    title.innerText = "";
    title.innerText =
      album.songs[songIndex].name.length > 20
        ? album.songs[songIndex].name.substring(0, 20) + " ..."
        : album.songs[songIndex].name;
    songIndex = index;
    currentTime.innerText = "00:00";
    let player = document.getElementById("player");
    player.src = "./data/album/" + index + ".m4a";
    player.onloadedmetadata = function () {
      player.volume = 0.5;
      let progress = document.querySelector("#progress");
      progress.value = 0;
      let duration = document.querySelector("#duration");
      let currentTime = document.querySelector("#current-time");
      currentTime.innerText = "00:00";
      duration.innerText = toHHMMSS(player.duration);
      play();

      play();
    };
  }
}
function play() {
  let player = document.getElementById("player");
  isPlaying ? player.pause() : player.play();
  let playButton = document.querySelector("#Play");
  playButton.firstChild.className = isPlaying
    ? "fas fa-play-circle"
    : "fas fa-pause-circle";
  isPlaying = !isPlaying;
  player.ontimeupdate = function () {
    let currentTime = document.querySelector("#current-time");
    currentTime.innerText = "00:00";
    currentTime.innerText = toHHMMSS(player.currentTime);
    let progress = document.querySelector("#progress");
    progress.value = Math.ceil((player.currentTime / player.duration) * 100);
  };
  player.onended = function () {
    isPlaying = !isPlaying;
    playButton.firstChild.className = "fas fa-play-circle";
    let progress = document.querySelector("#progress");
    progress.value = 0;
    if (songIndex < album.songs.length - 1) {
      switchSong(songIndex + 1);
      play();
    }
  };
}
function onVolumeChange(value) {
  let player = document.getElementById("player");
  let volume = parseInt(value) / 100;
  player.volume = volume;
}

function onTimeChange(value) {
  let player = document.getElementById("player");
  let percent = parseInt(value) / 100;
  player.currentTime = player.duration * percent;
}

function onVolumeToggle() {
  let player = document.getElementById("player");
  let volumeButton = document.querySelector("#Volume");
  isMuted = !isMuted;
  volumeButton.firstChild.className = isMuted
    ? "fas fa-volume-up"
    : "fas fa-volume-mute";
  player.muted = isMuted ? false : true;
}
function updateScreenSizes() {
  device.width = window.innerWidth;
  device.height = window.innerHeight;

  createLayout();
  let progressContainer = document.querySelector(".progress-container");

  progressContainer.style = `width:${
    device.width < 500 ? device.width : device.width * 0.5
  }px;`;
}
function createLayout() {
  let root = document.querySelector("#root");
  root.innerHTML = "";
  root.style = `height:${device.height}px;`;
  let sideBar = addElement(root, "div", {
    className: "side-bar d-none d-xl-block",
  });

  let container = addElement(root, "div", { className: "main-container" });
  container.innerHTML = "";
  //routeToPage(activePage);
  //sideBar.style.height = window.innerHeight;

  //checkImages();
  createSideBarMenu();
  //routeToPage("Home");
}

function createSideBarMenu() {
  let menu = [
    { text: "Home", icon: icons.home },
    { text: "Search", icon: icons.search },
    { text: "Your Library", icon: icons.library },
  ];
  let sideBar = document.querySelector(".side-bar");
  sideBar.innerHTML = null;
  let logoContainer = addElement(sideBar, "div", {
    className: "logo-container",
  });
  let logo = addElement(logoContainer, "img", {
    src: "./assets/brand/Spotify_Logo_RGB_White.png",
    style: "height:40px;",
  });

  let ul = addElement(sideBar, "ul", { className: "side-bar-list" });

  for (let i = 0; i < menu.length; i++) {
    let item = menu[i];
    let li = addElement(ul, "li", {
      className:
        activePage === item.text
          ? "side-bar-list-item-active"
          : "side-bar-list-item",
    });
    let button = addElement(li, "button", {
      className: "side-bar-list-link",
      onclick: function () {
        activePage = item.text;
        createSideBarMenu();
        routeToPage(item.text);
      },
    });

    let icon = addElement(button, "i", { className: item.icon });
    let div = addElement(button, "div", {
      className: "side-bar-list-item-text",
      innerText: item.text,
    });
  }
  let authButtons = addElement(sideBar, "div", {
    className: "auth-buttons",
  });
  let installApp = addElement(authButtons, "div", {
    innerHTML: `<i class="fas fa-arrow-circle-down"></i> Install app`,
    style: "cursor:pointer;",
  });
  let signUpButton = addElement(authButtons, "button", {
    className: "primary-button",
    innerText: "SIGN UP",
    style:
      "margin:20px 0px;height:30px;width:90%;background-color:white;color:black;",
    onclick: function () {
      loginPage();
    },
  });
  let loginButton = addElement(authButtons, "button", {
    className: "secondary-button",
    innerText: "LOG IN",
    style: "margin:10px 0px;height:30px;width:90%;",
    onclick: function () {
      loginPage();
    },
  });
}
function createControllers() {
  let root = document.querySelector("#player-area");
  root.innerHTML = "";

  let controllers = addElement(root, "div", { className: "controllers" });
  songInfo(controllers);
  playerControls(controllers);
  rightController(controllers);
}
function playerControls(container) {
  let controls = [
    { text: "Shuffle", icon: icons.shuffle },
    { text: "Backward", icon: icons.backward },
    { text: "Play", icon: icons.play },
    { text: "Forward", icon: icons.forward },
    { text: "Repeat", icon: icons.repeat },
  ];
  let controller = addElement(container, "div", { className: "controller" });
  let controlsContainer = addElement(controller, "div", {
    className: "controls-container",
  });
  for (let i = 0; i < controls.length; i++) {
    let control = controls[i];
    let button = addElement(controlsContainer, "button", {
      id: control.text,
      className: "controls-button",
      name: control.text,
      onclick: function () {
        if (control.text === "Play") {
          play();
        } else if (control.text === "Shuffle") {
          switchSong(Math.ceil(Math.random() * album.songs.length - 1));
        } else if (control.text === "Forward") {
          switchSong(songIndex + 1);
        } else if (control.text === "Backward") {
          switchSong(songIndex - 1);
        } else if (control.text === "Repeat") {
          switchSong(songIndex);
        } else {
          alert(control.text);
        }
      },
    });
    let icon = addElement(button, "i", {
      className: control.icon,
      style: `font-size:${control.text === "Play" ? "20pt" : "10pt"}`,
    });
  }
  let progressContainer = addElement(controller, "div", {
    className: "progress-container",
    style: `width:${device.width * 0.5}px;`,
  });
  let currentTime = addElement(progressContainer, "div", {
    innerText: "00:20",
    className: "progress-time",
    id: "current-time",
  });
  let progress = addElement(progressContainer, "input", {
    type: "range",
    value: 0,
    id: "progress",
    onchange: function (e) {
      onTimeChange(e.target.value);
    },
  });
  let songDuration = addElement(progressContainer, "div", {
    innerText: "04:50",
    className: "progress-time",
    id: "duration",
  });
}

function songInfo(container) {
  let songInfoContainer = addElement(container, "div", {
    className: "songInfoContainer d-none d-md-flex",
  });
  let albumCover = addElement(songInfoContainer, "button", {
    className: "controls-button",
    onclick: function () {
      routeToPage("Details");
    },
  });
  let cover = addElement(albumCover, "img", {
    className: "song-info-cover",
    src: albums[0].cover,
  });
  let songInfoText = addElement(songInfoContainer, "div", {
    className: "song-info-text",
  });
  let title = addElement(songInfoText, "div", {
    className: "song-info-title",
    innerText: album.songs[songIndex].name,
  });
  let artist = addElement(songInfoText, "button", {
    className: "song-info-artist controls-button",
    innerText: "Queen",
    onclick: function () {
      bandDetailPage();
    },
    style:
      "color:lightgrey;font-size:10pt;font-weight:100;opacity:0.5;margin:0px;",
  });
  let likeButton = addElement(songInfoContainer, "button", {
    className: "controls-button",
  });
  let likeIcon = addElement(likeButton, "i", { className: icons.like });

  let windowButton = addElement(songInfoContainer, "button", {
    className: "controls-button",
  });
  let windowIcon = addElement(windowButton, "i", { className: icons.window });
}

function rightController(container) {
  let rightControllerContainer = addElement(container, "div", {
    className: "rightControllerContainer d-none d-md-flex",
  });
  let listButton = addElement(rightControllerContainer, "button", {
    className: "controls-button",
  });
  let listIcon = addElement(listButton, "i", { className: icons.list });

  let desktopButton = addElement(rightControllerContainer, "button", {
    className: "controls-button",
  });
  let desktopIcon = addElement(desktopButton, "i", {
    className: icons.desktop,
  });

  let volumeButton = addElement(rightControllerContainer, "button", {
    className: "controls-button",
    id: "Volume",

    onclick: function () {
      onVolumeToggle();
    },
  });
  let volumeIcon = addElement(volumeButton, "i", { className: icons.volume });
  let volumeBar = addElement(rightControllerContainer, "input", {
    type: "range",
    className: "volume-bar",
    onchange: function (e) {
      onVolumeChange(e.target.value);
    },
  });
}

function routeToPage(page) {
  createPage(page);
}

function createPage(page) {
  let container = document.querySelector(".main-container");
  container.innerHTML = "";
  if (page === "Home") {
    homePage();
  }
  if (page === "Details") {
    detailsPage();
  }
  if (page === "Search") {
    detailsPage();
  }
  if (page === "Your Library") {
    detailsPage();
  }
}
function homePage() {
  let container = document.querySelector(".main-container");
  container.classList.add("home-container");
  container.style = "padding:50px;";
  let tabs = [
    "TRENDING",
    "PODCAST",
    "MOODS AND GENRES",
    "NEW RELEASES",
    "DISCOVER",
  ];
  createTab(container, tabs);
  let title = addElement(container, "h1", {
    innerText: "#TIMETRAVEL",
    style: "margin-bottom:25px;",
  });
  let row = addElement(container, "div", { className: "row" });
  for (let i = 0; i < list1.length; i++) {
    let item = list1[i];
    let col = addElement(row, "div", { className: "col" });
    let cardContainer = addElement(row, "div", {
      className: "card-container",
    });
    let img = addElement(cardContainer, "img", {
      src: item.cover,
      style: "max-width:200px;margin-bottom:25px;",
    });
    let text = addElement(cardContainer, "div", { innerText: item.name });
  }

  let secondTitle = addElement(container, "h1", {
    innerText: "WHILE YOU CODE",
    style: "margin-bottom:25px;",
  });
  let secondRow = addElement(container, "div", { className: "row" });
  for (let i = 0; i < list2.length; i++) {
    let item = list2[i];
    let col = addElement(secondRow, "div", { className: "col" });
    let cardContainer = addElement(secondRow, "div", {
      className: "card-container",
    });

    let img = addElement(cardContainer, "img", {
      src: item.cover,
      style: "max-width:200px;margin-bottom:25px;",
    });
    let text = addElement(cardContainer, "div", { innerText: item.name });
  }
}

function detailsPage() {
  let container = document.querySelector(".main-container");
  container.innerHTML = "";
  container.className = "main-container";
  let row = addElement(container, "div", { className: "row" });
  let leftCol = addElement(row, "div", { className: "col-4 left-col" });

  let albumCover = addElement(leftCol, "div", {
    className: "album-cover-container",
  });
  let albumCoverButton = addElement(albumCover, "button", {
    className: "controls-button",
  });
  let cover = addElement(albumCoverButton, "img", {
    src: album.cover,
    className: "album-cover",
    style: "object-fit:cover;width:80%;",
  });
  let albumTitle = addElement(leftCol, "h3", {
    innerText: album.name,
    style: "text-align:center;padding-top:60px;",
  });
  let artistButton = addElement(leftCol, "button", {
    className: "controls-button",
    onclick: function () {
      bandDetailPage();
    },
  });

  let artist = addElement(artistButton, "h6", {
    innerText: album.artist,
    style: "color:lightgrey;opacity:0.3",
  });
  let playButton = addElement(leftCol, "button", {
    className: "primary-button",
    innerText: "PLAY",
    style: "margin:20px 0px;",
    onclick: function () {
      play();
    },
  });

  let albumInfo = addElement(leftCol, "p", {
    innerText: `${album.release} . ${album.songs.length} SONGS`,
    style: "margin-bottom:15px;color:lightgrey;",
  });
  let buttonContainer = addElement(leftCol, "div", {
    className: "left-button-container",
  });
  let likeButton = addElement(buttonContainer, "button", {
    className: "controls-button",
  });
  let likeIcon = addElement(likeButton, "i", { className: icons.like });

  let moreButton = addElement(buttonContainer, "button", {
    className: "controls-button",
  });
  let moreIcon = addElement(moreButton, "i", { className: icons.more });

  let rightCol = addElement(row, "div", { className: "col-6 right-col" });
  for (let i = 0; i < album.songs.length; i++) {
    let song = album.songs[i];
    let songContainer = addElement(rightCol, "button", {
      className: "song-container",
      onclick: async function () {
        await switchSong(i);
        await switchSong(i);
      },
    });
    let div = addElement(songContainer, "div", { className: "song-left" });
    let icon = addElement(div, "i", { className: "fas fa-music" });
    let text = addElement(div, "div", { className: "song-info-text" });
    let songName = addElement(text, "div", {
      innerText: song.name,
    });
    let artistName = addElement(text, "button", {
      className: "controls-button",
      innerText: album.artist,
      style: "margin:0px;",
      onclick: function () {
        bandDetailPage();
      },
    });
    let duration = addElement(songContainer, "div", { innerText: song.length });
  }
}
function loginPage() {
  let root = document.querySelector("#root");
  root.innerHTML = "";
  let playerArea = document.querySelector("#player-area");
  playerArea.innerHTML = "";
  root.style = "background-color:#fff";
  let signUp = addElement(root, "div", { className: "signup" });
  let navBar = addElement(signUp, "div", { className: "navBar" });
  let logo = addElement(navBar, "img", {
    src: "./assets/brand/Spotify_Logo_RGB_Black.png",
    style: "height:60px;",
  });
  let form = addElement(signUp, "div", { className: "sign-up-form" });
  let instructions = addElement(form, "div", {
    innerText: "To continue, log in to Spotify.",
    style: "margin-top:50px;",
  });
  let fbButton = addElement(form, "button", {
    className: "primary-button",
    innerHTML: `<i style="margin-right:1em;" class="fab fa-facebook"></i> CONTINUE WITH FACEBOOK`,
    style:
      "background-color:#3b5999;width:450px;min-height:48px;margin-top:20px;",
  });
  let appleButton = addElement(form, "button", {
    className: "primary-button",
    innerHTML: `<i style="margin-right:1em;" class="fab fa-apple"></i> CONTINUE WITH APPLE`,
    style: "background-color:#000;width:450px;min-height:48px;margin-top:20px;",
  });

  let hrContainer = addElement(form, "hr", {
    className: "hr-container",
    style: "margin-top:40px",
  });
  let or = addElement(form, "div", {
    innerText: "OR",
    style: "position:relative;top:-30px;",
  });
  let emailInput = addElement(form, "input", {
    type: "text",
    placeholder: "Email address or username",
  });
  let passwordInput = addElement(form, "input", {
    type: "password",
    placeholder: "Password",
  });
  let buttonsContainer = addElement(form, "div", {
    className: "form-buttons-container",
  });

  let checkboxContainer = addElement(buttonsContainer, "label", {
    innerText: "Remember me",
    className: "checkbox-container",
  });
  let checkboxInput = addElement(checkboxContainer, "input", {
    type: "checkbox",
    checked: true,
  });

  let span = addElement(checkboxContainer, "span", { className: "checkmark" });
  let logInButton = addElement(buttonsContainer, "button", {
    className: "primary-button",
    innerText: "LOG IN",
    style: "margin:20px 0px;height:50px;width:200px;",
    onclick: function () {
      start();
    },
  });
  let forgot = addElement(form, "p", {
    innerText: "Forgot your password?",
    style: "color:#1ed760;text-align:center;",
  });
  addElement(form, "hr", { style: "margin:20px 0px;" });

  let dontHaveAccount = addElement(form, "div", {
    innerText: "Don't have an account?",
    style: "font-size:18px;",
  });
  let signUpButton = addElement(form, "button", {
    className: "secondary-button",
    innerText: "SIGN UP FOR SPOTIFY",
    style:
      "margin:20px 0px;height:46px;width:450px;background-color:white;border:1px solid black;color:black;",
    onclick: function () {
      start();
    },
  });
  addElement(form, "hr", { style: "margin:30px 0px;" });
  addElement(form, "div", {
    innerHTML: `If you click "Log in with Facebook" and are not a Spotify user, you will be registered and you agree to Spotify's <a href="#">Terms & Conditions</a> and <a href="#">Privacy Policy<a/>.`,
    style: "width:450px;font-size:10pt;",
  });
}
function bandDetailPage() {
  let container = document.querySelector(".main-container");
  container.innerHTML = "";
  container.className = "main-container";
  container.style = "margin:0px;padding:0px;";
  const backgroundStyle = `background:url(https://www.burnleyexpress.net/sttms.blob.core.windows.net/images/QVNIMTEzMjE5NjU3.jpg);min-height:600px;object-fit:center;background-position:20% 40%; background-repeat:no-repeat;background-size:cover;width:100%;`;

  let background = addElement(container, "div", {
    id: "band-background-image",
    style: backgroundStyle,
  });
  let overlay = addElement(container, "div", {
    className: "main-content-overlay",
  });

  let bandInfoContainer = addElement(container, "div", {
    className: "bandInfoContainer",
  });
  let followers = addElement(bandInfoContainer, "div", {
    innerText: `${Math.ceil(Math.random() * 99)},${Math.ceil(
      Math.random() * 999
    )} ,${Math.ceil(Math.random() * 999)} MONTHLY LISTENERS`,
    style: "color:white;font-size:12pt;",
  });
  let bandName = addElement(bandInfoContainer, "div", {
    innerText: album.artist,
    style: "color:white;font-size:60pt;",
  });
  let buttonContainer = addElement(bandInfoContainer, "div", {
    className: "left-button-container",
  });
  let playButton = addElement(buttonContainer, "button", {
    className: "primary-button",
    innerText: "PLAY",
    style: "margin:20px 0px;",
    onclick: function () {
      play();
    },
  });
  let followButton = addElement(buttonContainer, "button", {
    className: "secondary-button",
    innerText: "FOLLOW",
    style: "margin:20px;",
  });
  let moreButton = addElement(buttonContainer, "button", {
    className: "controls-button",
  });
  let moreIcon = addElement(moreButton, "i", { className: icons.more });

  overlay.addEventListener("scroll", function () {
    var a = overlay.scrollTop;
    var b = overlay.scrollHeight - overlay.clientHeight;
    var c = a / b;
    let percent = c * 100;
    let background = document.querySelector("#band-background-image");
    let bandInfoContainer = document.querySelector(".bandInfoContainer");
    let style = background.style;
    if (percent > 50) {
      background.style = "opacity:0;transition:0.2s;";
      bandInfoContainer.style = "opacity:0;transition:0.2s;";
    } else {
      background.style = backgroundStyle;
      bandInfoContainer.style = "opacity:1;transition:0.2s;";
    }
  });

  let tabs = ["OVERVIEW", "RELEATED ARTIST", "ABOUT"];
  createTab(overlay, tabs);
  let title = addElement(overlay, "h1", {
    innerText: "Albums",
    style: "margin:20px;",
  });
  let row = addElement(overlay, "div", { className: "row" });
  for (let i = 0; i < albums.length; i++) {
    let album = albums[i];
    let col = addElement(row, "div", { className: "col-2" });
    let albumCardContainer = addElement(col, "div", {
      className: "card-container",
    });
    let image = addElement(albumCardContainer, "img", {
      className: "album-cover",
      src: album.cover,
      style: "width:200px;object-fit:cover;height:200px;margin-bottom:50px;",
    });
    let text = addElement(albumCardContainer, "div", {
      innerText: album.name,
      style: "font-size:10pt;text-align:center;",
    });
  }
}
function createTab(root, tabs) {
  let tabsContainer = addElement(root, "div", { className: "tabs-container" });
  for (let i = 0; i < tabs.length; i++) {
    let tabContainer = addElement(tabsContainer, "div", {
      className: "tab-container",
    });
    let text = addElement(tabContainer, "div", { innerText: tabs[i] });
    i === 0
      ? addElement(tabContainer, "div", {
          style: "background-color:#1ed760;height:3px;width:40%;",
        })
      : addElement(tabContainer, "div", {
          style: "background-color:transparent;height:3px;width:40%;",
        });
  }
}
