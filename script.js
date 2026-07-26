const fileInput = document.getElementById('audio-file');
const audio = document.getElementById('audio');
const progress = document.querySelector('input[name="progress"]');
const playPause = document.querySelector('.play-pause');
const songTitle = document.querySelector('.song-title');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');

function loadSong(index) {
  const file = playlist[index];

  audio.src = URL.createObjectURL(file);
  songTitle.textContent = file.name.replace(/\.[^/.]+$/, '');
  audio.play();
}

//Playlist variables for multiple files
let playlist = [];
let currentSong = 0;

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
  if (playlist.length === 0) return;

  currentSong++;
if (currentSong >= playlist.length) {
  loadSong (currentSong) = 0;
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
