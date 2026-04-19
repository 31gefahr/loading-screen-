window.addEventListener('message', function(event) {
    if (event.data.type === 'loadProgress') {
        const percent = Math.round(event.data.loadFraction * 100);
        
        
        document.querySelector('.loading-bar').style.width = percent + '%';
        document.getElementById('progress-percent').innerHTML = percent;
    }
});
