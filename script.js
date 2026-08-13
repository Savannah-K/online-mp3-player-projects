const fileInput = document.getElementById('audio-file');
const audio = document.getElementById('audio');
const progress = document.querySelector('input[name="progress"]');
const playPause = document.querySelector('.play-pause');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const menuButton = document.querySelector('.menu');
const selectButton = document.querySelector('.select');
const screenContent = document.querySelector('.screen-content');
const poster = document.getElementById('poster');

let songTitle = document.querySelector('.song-title');
let currentSongText = songTitle ? songTitle.textContent : 'Song Title';

if (songTitle && songTitle.scrollWidth > songTitle.clientWidth) {
  songTitle.classList.add('scroll');
}

let currentScreen = 'player';
let menuOpen = false;
let shuffle = false;

const backgrounds = [
  //I worked very hard on these assets. And photopea is a pain
  'Assets/bg-black bg rainbow stars falling .gif',
  'Assets/bg-blue bunny head.png',
  'Assets/bg-blue dark night sky stars .gif',
  'Assets/bg-colorful-ribbon.png',
  'Assets/bg-green bunny head.png',
  'Assets/bg-green grass pixel .gif',
  'Assets/bg-hot pink blurry stars black bg .GIF',
  'Assets/bg-hot pink_magenta y2k stars .JPG',
  'Assets/bg-orange bunny head.png',
  'Assets/bg-purple_gray_grey bunny head.png',
  'Assets/bg-rainbow [flash] bubbles (transparent_overlay) .gif',
  'Assets/bg-rainbow confetti raining hearts (transparent_overlay) .GIF',
  'Assets/bg-rainbowflashscenecheckered1-ezgif.com-crop.gif',
  'Assets/bg-sparkle-butterfly.gif',
  'Assets/bg-y2k-bubble.jpg',
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
  'Assets/green-plain.png',
  'Assets/pink-plain.png',
  'Assets/purple-plain.png',
  'Assets/teal-plain.png',
];

const menuItems = ['Themes', 'Music Settings', 'Return'];

const defaultAlbumCovers = 'Assets/cat-profile.png';

let selectedMenu = 0;

let playlist = [];
let currentSong = 0;

let shuffleQueue = [];
let shuffleHistory = [];

let currentSkin = 0;
let currentBackground = 0;
let selectedThemeOption = 0;
const themeOptions = ['Background', 'Skin'];

function renderSongTitle(text) {
  currentSongText = text;
  screenContent.innerHTML = `
    <img src="${defaultAlbumCovers}" alt="Album covers" class="album-covers" />
    <div class="song-title">${text}</div>
  `;
  songTitle = screenContent.querySelector('.song-title');

  songTitle.classList.remove('scroll');
  if (songTitle.scrollWidth > songTitle.clientWidth) {
    songTitle.classList.add('scroll');
  }
}

function buildShuffleQueue() { //Prevents the same song from playing twice in a row when you enable shuffle

  shuffleQueue = playlist.map((_, i) => i).filter((i) => i !== currentSong);

  for (let i = shuffleQueue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffleQueue[i], shuffleQueue[j]] = [shuffleQueue[j], shuffleQueue[i]];
  }
}

function loadSong(index) {  //Adds song to index -> plays it + adds title info
  const file = playlist[index];

  audio.src = URL.createObjectURL(file);
  renderSongTitle(file.name.replace(/\.[^/.]+$/, ''));
  audio.play();
}

function changeSkin(index) {  //skins are added to an index
  poster.src = skins[index];
}

function changeBackground(index) {
  document.body.style.backgroundImage = `url("${backgrounds[index]}")`;
}

function openMenu() {  //Exactly what it says. Opens the menu
  menuOpen = true;
  currentScreen = 'menu';

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
  //themes menu, duh
  currentScreen = 'themes';

  screenContent.innerHTML = `
    <div class="${selectedThemeOption === 0 ? 'selected' : ''}">
      Background ${currentBackground + 1}
    </div>

    <div class="${selectedThemeOption === 1 ? 'selected' : ''}">
      Skin ${currentSkin + 1}
    </div>

    <div>▶ Change</div>
  `;
}

function openMusicSettings() {
  currentScreen = 'settings';

  screenContent.innerHTML = `
    <div class="selected">
      Shuffle: ${shuffle ? 'On' : 'Off'}
    </div>
  `;
}

function returnToPlayer() {
  currentScreen = 'player';
  menuOpen = false; //hehe. idk why but I love boolean terms
  renderSongTitle(currentSongText);
}

fileInput.addEventListener('change', () => {
  playlist = Array.from(fileInput.files);

  if (playlist.length === 0) return;

  currentSong = 0;
  shuffleQueue = [];
  shuffleHistory = [];
  loadSong(currentSong);

  if (shuffle) buildShuffleQueue();
});

playPause.addEventListener('click', () => {
  //Button-Time!
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

nextButton.addEventListener('click', () => {
  if (currentScreen === 'themes') {
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
    if (shuffleQueue.length === 0) {
      buildShuffleQueue();
    }

    shuffleHistory.push(currentSong);
    currentSong = shuffleQueue.shift();
  } else {
    currentSong = (currentSong + 1) % playlist.length;
  }

  loadSong(currentSong);
});

previousButton.addEventListener('click', () => {
  if (currentScreen === 'themes') {
    selectedThemeOption =
      selectedThemeOption === 0
        ? themeOptions.length - 1
        : selectedThemeOption - 1;
    openThemes();
    return;
  }

  if (menuOpen) {
    selectedMenu = selectedMenu === 0 ? menuItems.length - 1 : selectedMenu - 1;
    openMenu();
    return;
  }

  if (playlist.length === 0) return;

  if (shuffle) {
    if (shuffleHistory.length === 0) return;

    shuffleQueue.unshift(currentSong);
    currentSong = shuffleHistory.pop();
  } else {
    currentSong--;

    if (currentSong < 0) {
      currentSong = playlist.length - 1;
    }
  }

  loadSong(currentSong);
});

menuButton.addEventListener('click', () => {
  if (currentScreen === 'player') {
    openMenu();
  } else {
    returnToPlayer();
  }
});

selectButton.addEventListener('click', () => {
  if (currentScreen === 'themes') {
    if (selectedThemeOption === 0) {
      currentBackground++;

      if (currentBackground >= backgrounds.length) {
        currentBackground = 0;
      }

      changeBackground(currentBackground);
    } else {
      currentSkin++;

      if (currentSkin >= skins.length) {
        currentSkin = 0;
      }

      changeSkin(currentSkin);
    }

    openThemes();
    return;
  }

  if (currentScreen === 'settings') {
    shuffle = !shuffle;

    if (shuffle) {
      shuffleHistory = [];
      buildShuffleQueue();
    }

    openMusicSettings();
    return;
  }

  if (!menuOpen) return;

  if (selectedMenu === 0) {
    openThemes();
  } else if (selectedMenu === 1) {
    openMusicSettings();
  } else if (selectedMenu === 2) {
    returnToPlayer();
  }
});
