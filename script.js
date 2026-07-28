const fileInput = document.getElementById('audio-file');
const audio = document.getElementById('audio');
const progress = document.querySelector('input[name="progress"]');
const playPause = document.querySelector('.play-pause');
const songTitle = document.querySelector('.song-title');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const menuButton = document.querySelector('.menu');
const screenContent = document.querySelector('.screen-content');
const poster = document.getElementById("poster");

const backgrounds = [
  "Assets/bg-colorful-ribbon.png",
  "Assets/bg-sparkle-butterfly.gif",
  "Assets/bg-y2k-bubble.jpg"
];

const skins = [
  "Assets/BlackDiamonds.png",
  "Assets/BlackStar.png",
  "Assets/BrightSummer.png",
  "Assets/Floral.png",
  "Assets/Lace.png",
  "Assets/LeapordPrint.png",
  "Assets/Neopolitan.png",
  "Assets/PinkPlaid.png",
  "Assets/SwirlyBlue.png",
  "Assets/Y2KBubble.png",
  "Assets/Y2KFloral.png",
  "Assets/Y2KStars.png"
];

const menuItems = [
  "Themes",
  "Music",
  "Music Settings"
];

let selectMenu = 0;

let playlist = [];
let currentSong = 0;

let currentSkin = 0;
let currentBackground = 0;
let themeIndex = 0;
let menuOpen = false;

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

  screenContent.innerHTML = "";

  menuItems.forEach((item, index) => {

    const div = document.createElement("div");
    div.textContent = item;

    if(index === selectMenu){
      div.classList.add("selected");
    }

    screenContent.appendChild(div);
  });
}

function openThemes() {
  screenContent.innerHTML = `
    <div>Theme ${themeIndex}</div>
    <div>Press ▶ to change</div>
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
  if (menuOpen) {
    themeIndex++;

    if (themeIndex >= skins.length) {
      themeIndex = 0;
    }

    changeSkin(themeIndex);
    changeBackground(themeIndex % backgrounds.length);

    openThemes();
    return;
  }

  if (playlist.length === 0) return;

  currentSong++;

  if (currentSong >= playlist.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
});

previousButton.addEventListener('click', () => {
  if (playlist.length === 0) return;

  currentSong--;

  if (currentSong < 0) {
    currentSong = playlist.length - 1;
  }

  loadSong(currentSong);
});

menuButton.addEventListener('click', () => {
  if (!menuOpen) {
    openMenu();
  }
});