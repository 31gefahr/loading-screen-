let currentProgress = 0;

function updateProgress(target) {
    let interval = setInterval(() => {
        if (currentProgress < target) {
            currentProgress++;
            document.querySelector('.loading-bar').style.width = currentProgress + '%';
            document.getElementById('progress-percent').innerHTML = currentProgress;
        } else {
            clearInterval(interval);
        }
    }, 20); 
}


setTimeout(() => updateProgress(50), 500);
setTimeout(() => updateProgress(65), 2500);
setTimeout(() => updateProgress(85), 5000);

window.addEventListener('message', function(event) {
    if (event.data.type === 'loadProgress') {
        let actualProgress = Math.round(event.data.loadFraction * 100);
        if (actualProgress > currentProgress) {
            updateProgress(actualProgress);
        }
    }
});
