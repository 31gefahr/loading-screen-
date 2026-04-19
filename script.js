window.addEventListener('message', function(event) {
    
    const music = document.getElementById('loading-music');
    if (music && music.paused) {
        music.play().catch(error => {
            console.log("Müzik otomatik başlatılamadı, kullanıcının bir işlem yapması gerekebilir.");
        });
    }

    
    if (event.data.type === 'loadProgress') {
        const percent = Math.round(event.data.loadFraction * 100);
        
        document.querySelector('.loading-bar').style.width = percent + '%';
        document.getElementById('progress-percent').innerHTML = percent;
    }
});
