window.addEventListener('message', function(event) {
    if (event.data.type === 'loadProgress') {
        let progress = Math.round(event.data.loadFraction * 100);
        
        document.getElementById('progress-bar').style.width = progress + '%';
        document.getElementById('percent').innerText = progress + '%';

        if (progress >= 100) {
            setTimeout(() => {
                
                if (typeof invokeNative !== 'undefined') {
                    invokeNative('shutdownLoadingScreen');
                }
            }, 500);
        }
    }
});
