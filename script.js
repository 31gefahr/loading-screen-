let songs = ["media/music1.mp3", "media/music2.mp3"];
let currentSong = 0;
let audio = document.getElementById("audio");


audio.volume = 0.5;

function togglePlay() {
    if (audio.paused) {
        audio.play();
        document.getElementById("play-pause").innerHTML = "⏸"; 
    } else {
        audio.pause();
        document.getElementById("play-pause").innerHTML = "▶"; 
    }
}

function nextTrack() {
    currentSong = (currentSong + 1) % songs.length;
    audio.src = songs[currentSong];
    audio.play().catch(e => console.log("Hata:", e));
    updateText();
}

function prevTrack() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    audio.src = songs[currentSong];
    audio.play().catch(e => console.log("Hata:", e));
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
        
        const progressBar = document.getElementById("progress-bar");
        const percentText = document.getElementById("percent");

        if (progressBar) progressBar.style.width = progress + "%";
        if (percentText) percentText.innerHTML = progress;
    }
});


window.addEventListener('load', () => {
   
    document.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                document.getElementById("play-pause").innerHTML = "⏸";
            }).catch(error => {
                console.log("Müzik çalma hatası:", error);
            });
        }
    }, { once: true }); 
});
