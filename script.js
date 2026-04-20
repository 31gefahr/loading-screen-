window.addEventListener('message', function(event) {
    if (event.data.type === 'loadProgress') {
        
        let percent = Math.round(event.data.loadFraction * 100);
        
        
        document.querySelector('.loading-bar-fill').style.width = percent + '%';
        document.getElementById('progress-percent').innerHTML = percent + '%';
    }
});


document.getElementById('music-name').innerHTML = "No Music";
document.getElementById('album-name').innerHTML = "TDS Sounds";
