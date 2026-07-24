let music = document.querySelector('#mymusic');
let poster = document.querySelector('#poster');
let singer = document.querySelector('#singer');
let date = document.querySelector('#date');

let back = document.querySelector('.fa-fast-backward');
let play = document.querySelector('.fa-play');
let pause = document.querySelector('.fa-pause');
let next = document.querySelector('.fa-fast-forward');
let audioFile = document.querySelector('#audio-file');

audioFile.addEventListener('change', function () {
  let file = this.files[0];
  let reader = new FileReader();

  reader.onload = function (e) {
    music.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

let music = document.querySelector('#mymusic');
let upload = document.querySelector('#upload');

upload.addEventListener('change', function (event) {
  let file = event.target.files[0];

  if (file) {
    let songURL = URL.createObjectURL(file);
    music.src = songURL;
    music.play();
  }
});
 
let playButton = document.querySelector('.fa-play');
playButton.addEventListener('click', function () {
  music.play();

  if (music.paused) {
    music.play();
  } 
  else {
    music.pause();
  } 
});