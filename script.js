// Accessing DOM Elements
const audio = document.querySelector("#audio-player");
const playBtn = document.querySelector("#play-btn");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const titleEl = document.querySelector("#title");
const artistEl = document.querySelector("#artist");
const coverImg = document.querySelector(".covers img");
const progressBar = document.querySelector("#progress-bar");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");

// Songs Array
const songs = [
  {
    title: "Hope",
    artist: "XXXTENTACION",
    src: "songs/song1.mp3",
    cover: "covers/cover1.jpg",
  },
  {
    title: "Montagem Coma",
    artist: "Andromeda, Elysian",
    src: "songs/song2.mp3",
    cover: "covers/cover2.jpg",
  },
  {
    title: "Sempero",
    artist: "QMIIR",
    src: "songs/song3.mp3",
    cover: "covers/cover3.jpg",
  },
  {
    title: "Khayal",
    artist: "Talwiinder",
    src: "songs/song4.mp3",
    cover: "covers/cover4.jpg",
  },
  {
    title: "Passo Bem Solto",
    artist: "ATLXS",
    src: "songs/song5.mp3",
    cover: "covers/cover5.jpg",
  },
  {
    title: "Pal Pal",
    artist: "AFUSIC",
    src: "songs/song6.mp3",
    cover: "covers/cover6.jpg",
  },
];

let songIndex = 0;
let isPlaying = false;

// Function that load song
function loadSongs(song) {
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  coverImg.src = song.cover;
  audio.src = song.src;
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  progress.style.width = `0%`;
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    audio.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

playBtn.addEventListener("click", togglePlay);

prevBtn.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSongs(songs[songIndex]);
  togglePlay();
});

nextBtn.addEventListener("click", () => {
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSongs(songs[songIndex]);
  togglePlay();
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

loadSongs(songs[songIndex]);
