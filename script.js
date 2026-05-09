let songs = [
    { path: "media/music1.mp3", name: "YOUR MUSİC NAME" },
    { path: "media/music2.mp3", name: "YOUR MUSİC NAME" }
];
let currentSong = 0;
let audio = document.getElementById("audio");


audio.volume = 0.3;
audio.loop = false; 

function updateText() {
    const textElement = document.getElementById("now-playing");
    if (textElement) {
        textElement.innerHTML = "ŞU AN ÇALIYOR: " + songs[currentSong].name;
    }
}

function loadAndPlay() {
    audio.pause();
    audio.src = songs[currentSong].path;
    audio.load();
    updateText();

    
    let playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
           
            document.getElementById("play-pause").innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(error => {
            
            console.log("Oynatma bekliyor...");
        });
    }
}


setInterval(() => {
    if (audio.paused && !audio.ended) {
        audio.play().catch(() => {
            
        });
    }
}, 1000); 

function nextTrack() {
    currentSong = (currentSong + 1) % songs.length;
    loadAndPlay();
}

function prevTrack() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadAndPlay();
}

function togglePlay() {
    const btn = document.getElementById("play-pause");
    if (audio.paused) {
        audio.play();
        btn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        btn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function changeVolume(val) {
    audio.volume = val;
}


window.addEventListener('DOMContentLoaded', () => {
    loadAndPlay();
});


audio.onended = function() {
    nextTrack();
};


window.addEventListener('message', function(event) {
    if (event.data.eventName === 'loadProgress') {
        let progress = Math.round(event.data.loadFraction * 100);
        const bar = document.getElementById("progress-bar");
        const percentText = document.getElementById("percent");

        if (bar) bar.style.width = progress + "%";
        if (percentText) percentText.innerHTML = progress;
    }
});