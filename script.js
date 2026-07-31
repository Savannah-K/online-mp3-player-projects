const fileInput = document.getElementById('audio-file');
const audio = document.getElementById('audio');
const progress = document.querySelector('input[name="progress"]');
const playPause = document.querySelector('.play-pause');
const songTitle = document.querySelector('.song-title');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const menuButton = document.querySelector('.menu');
const selectButton = document.querySelector('.select');
const screenContent = document.querySelector('.screen-content');
const poster = document.getElementById('poster');

let currentScreen = "player";
let menuOpen = false;
let shuffle = false;

const backgrounds = [
  'Assets/bg-colorful-ribbon.png',
  'Assets/bg-sparkle-butterfly.gif',
  'Assets/bg-y2k-bubble.jpg',
  'Assets/bg-black bg rainbow stars falling .gif',
  'Assets/bg-blue bunny head.png',
  'Assets/bg-blue dark night sky stars .gif',
  'Assets/bg-green bunny head.png',
  'Assets/bg-green grass pixel .gif',
  'Assets/bg-hot pink blurry stars black bg .GIF',
  'Assets/bg-hot pink_magenta y2k stars .JPG',
  'Assets/bg-orange bunny head.png',
  'Assets/bg-purple_gray_grey bunny head.png',
  'Assets/bg-rainbow [flash] bubbles (transparent_overlay) .gif',
  'Assets/bg-rainbow confetti raining hearts (transparent_overlay) .GIF',
  'Assets/bg-rainbowflashscenecheckered1-ezgif.com-crop.gif',
];

const skins = [
  'Assets/BlackDiamonds.png',
  'Assets/BlackStar.png',
  'Assets/BrightSummer.png',
  'Assets/Floral.png',
  'Assets/Lace.png',
  'Assets/LeapordPrint.png',
  'Assets/Neopolitan.png',
  'Assets/PinkPlaid.png',
  'Assets/SwirlyBlue.png',
  'Assets/Y2KBubble.png',
  'Assets/Y2KFloral.png',
  'Assets/Y2KStars.png',
];

const menuItems = ['Themes', 'Music', 'Music Settings'];

let selectedMenu = 0;

let playlist = [];
let currentSong = 0;

let currentSkin = 0;
let currentBackground = 0;
let selectedThemeOption = 0;
const themeOptions = ["Background", "Skin"];

function loadSong(index) {
  const file = playlist[index];

  audio.src = URL.createObjectURL(file);
  songTitle.textContent = file.name.replace(/\.[^/.]+$/, '');
  audio.play();
}

function changeSkin(index) {
  poster.src = skins[index];
}

function changeBackground(index) {
  document.body.style.backgroundImage = `url("${backgrounds[index]}")`;
}

function openMenu() {
  menuOpen = true;
  currentScreen = "menu";

  screenContent.innerHTML = '';

  menuItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.textContent = item;

    if (index === selectedMenu) {
      div.classList.add('selected');
    }

    screenContent.appendChild(div);
  });
}

function openThemes() {
  currentScreen = "themes";

  screenContent.innerHTML = `
    <div class="${selectedThemeOption === 0 ? "selected" : ""}">
      Background ${currentBackground + 1}
    </div>

    <div class="${selectedThemeOption === 1 ? "selected" : ""}">
      Skin ${currentSkin + 1}
    </div>

    <div>▶ Change</div>
  `;
}

function openMusicSettings() {
  currentScreen = "settings";

  screenContent.innerHTML = `
    <div class="selected">
      Shuffle: ${shuffle ? "On" : "Off"}
    </div>
  `;
}

fileInput.addEventListener('change', () => {
  playlist = Array.from(fileInput.files);

  if (playlist.length === 0) return;

  currentSong = 0;
  loadSong(currentSong);
});

playPause.addEventListener('click', () => {
  if (!audio.src) return;

  if (audio.paused) audio.play();
  else audio.pause();
});

audio.addEventListener('loadedmetadata', () => {
  progress.max = audio.duration;
});

audio.addEventListener('timeupdate', () => {
  progress.value = audio.currentTime;
});

progress.addEventListener('input', () => {
  audio.currentTime = progress.value;
});

audio.addEventListener('play', () => {
  playPause.textContent = '❚❚';
});

audio.addEventListener('pause', () => {
  playPause.textContent = '▶';
});

if (songTitle.scrollWidth > songTitle.clientWidth) {
  songTitle.classList.add('scroll');
}

nextButton.addEventListener('click', () => {

  if (currentScreen === "themes") {
    selectedThemeOption = (selectedThemeOption + 1) % themeOptions.length;
    openThemes();
    return;
  }

  if (menuOpen) {
    selectedMenu = (selectedMenu + 1) % menuItems.length;
    openMenu();
    return;
  }

  if (playlist.length === 0) return;

  if (shuffle) {
    currentSong = Math.floor(Math.random() * playlist.length);
  } else {
    currentSong = (currentSong + 1) % playlist.length;
  }

  loadSong(currentSong);
});

previousButton.addEventListener('click', () => {

  if (currentScreen === "themes") {
    selectedThemeOption = selectedThemeOption === 0 ? themeOptions.length - 1 : selectedThemeOption - 1;
    openThemes();
    return;
  }

  if (menuOpen) {
    selectedMenu = selectedMenu === 0 ? menuItems.length - 1 : selectedMenu - 1;
    openMenu();
    return;
  }

  if (playlist.length === 0) return;

  currentSong--;

  if (currentSong < 0) {
    currentSong = playlist.length - 1;
  }

  loadSong(currentSong);
});

menuButton.addEventListener("click", () => {
  if (currentScreen === "player") {
    openMenu();
  } else {
    currentScreen = "player";
    menuOpen = false; //hehe. idk why but I love boolean terms
    screenContent.innerHTML = "";
  }
});

selectButton.addEventListener("click", () => {

  if (currentScreen === "themes") {

    if (selectedThemeOption === 0) {

      currentBackground++;

      if (currentBackground >= backgrounds.length) {
        currentBackground = 0;
      }

      changeBackground(currentBackground);
    }

    else {

      currentSkin++;

      if (currentSkin >= skins.length) {
        currentSkin = 0;
      }

      changeSkin(currentSkin);
    }

    openThemes();
    return;
  }

  if (currentScreen === "settings") {
    shuffle = !shuffle;
    openMusicSettings();
    return;
  }

  if (!menuOpen) return;

  if (selectedMenu === 0) {
    openThemes();
  }

  else if (selectedMenu === 1) {
    currentScreen = "music";
    screenContent.innerHTML = `
      <div>Music</div>
      <div>Your Songs</div>`;
  }

  else if (selectedMenu === 2) {
    openMusicSettings();
  }
});
