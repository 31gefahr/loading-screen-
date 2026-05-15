let songs = [
    { path: "media/music1.mp3", name: "MUSIC 1" },
    { path: "media/music2.mp3", name: "MUSIC 2" }
];

let currentSong = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-pause");
const playIcon = document.getElementById("playIcon");
const volume = document.getElementById("volume");

audio.volume = 0.3;
audio.preload = "auto";


function formatTime(sec) {
    if (isNaN(sec)) return "0:00";
    let m = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    if (s < 10) s = "0" + s;
    return m + ":" + s;
}


function loadSong() {
    audio.src = songs[currentSong].path;
    document.getElementById("now-playing").innerText =
        "ŞU AN ÇALIYOR: " + songs[currentSong].name;
}


function playSong() {
    let p = audio.play();
    if (p) p.catch(() => {});
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
}


function pauseSong() {
    audio.pause();
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
}


function nextTrack() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong();
    playSong();
}


function prevTrack() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong();
    playSong();
}


function changeVolume(val) {
    audio.volume = val;
}


window.addEventListener("DOMContentLoaded", () => {
    loadSong();

    setTimeout(() => {
        playSong();
    }, 400);

    document.addEventListener("click", () => {
        playSong();
    }, { once: true });
});


playBtn.addEventListener("click", () => {
    if (audio.paused) playSong();
    else pauseSong();
});

document.getElementById("nextBtn").addEventListener("click", nextTrack);
document.getElementById("prevBtn").addEventListener("click", prevTrack);

volume.addEventListener("input", (e) => {
    changeVolume(e.target.value);
});


audio.addEventListener("ended", nextTrack);


audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    let current = audio.currentTime;
    let duration = audio.duration;

    let percent = (current / duration) * 100;

    document.getElementById("progress-bar").style.width = percent + "%";
    document.getElementById("current").innerText = formatTime(current);
    document.getElementById("total").innerText = formatTime(duration);
});


window.addEventListener("message", (event) => {
    if (!event.data) return;

    if (event.data.eventName === "loadProgress") {
        let p = Math.floor(event.data.loadFraction * 100);
        document.getElementById("percent").innerText = p;
    }
});