let songs = ["media/music1.mp3", "media/music2.mp3"];
let currentSong = 0;
let audio = document.getElementById("audio");

function togglePlay() {
    if (audio.paused) {
        audio.play();
        document.getElementById("play-pause").innerHTML = "Internal";
    } else {
        audio.pause();
        document.getElementById("play-pause").innerHTML = "▶";
    }
}

function nextTrack() {
    currentSong = (currentSong + 1) % songs.length;
    audio.src = songs[currentSong];
    audio.play();
    updateText();
}

function prevTrack() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    audio.src = songs[currentSong];
    audio.play();
    updateText();
}

function changeVolume(val) {
    audio.volume = val;
}

function updateText() {
    document.getElementById("now-playing").innerHTML = "NOW PLAYING: Music " + (currentSong + 1);
}


window.addEventListener('message', function(event) {
    if (event.data.eventName === 'loadProgress') {
        let progress = Math.round(event.data.loadFraction * 100);
        document.getElementById("progress-bar").style.width = progress + "%";
        document.getElementById("percent").innerHTML = progress;
    }
});
