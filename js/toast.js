function showToast(message, duration = 3000) {
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, duration);
}

// Check if volume is muted
function checkVolume() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            let audioCtx = new AudioContext();
            let analyser = audioCtx.createAnalyser();
            let source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);

            // Try detecting low sound (fallback for actual system mute detection)
            if (audioCtx.state === 'suspended') {
                showToast("🔇 Please enable your sound for the voice assistant");
            }
        })
        .catch(() => {
            showToast("🔇 Sound is blocked or unavailable");
        });
}

// Run on load
window.addEventListener('DOMContentLoaded', checkVolume);