const INTRO = "Hi, I'm Your Name, a passionate full-stack developer.";
const PROMPT = "Would you like to hear about me, my skills, my projects, or my career goals?";

let voices = [];

function initVoiceAssistant() {
    voices = speechSynthesis.getVoices();
    if (!voices.length) {
        speechSynthesis.onvoiceschanged = () => {
            voices = speechSynthesis.getVoices();
        };
    }
}

function speak(text, cb) {
    let utter = new SpeechSynthesisUtterance(text);
    utter.voice = voices.find(v => v.name.includes('Male')) || voices[0];
    utter.rate = 1;
    speechSynthesis.speak(utter);
    if (cb) utter.onend = cb;
}

// Event listeners
document.getElementById('start-voice').addEventListener('click', () => {
    speak(INTRO, () => speak(PROMPT));
});

document.getElementById('replay-intro').addEventListener('click', () => {
    speak(INTRO, () => speak(PROMPT));
});

document.getElementById('ask-question').addEventListener('click', () => {
    showToast("Listening for your question...");
});

window.addEventListener('DOMContentLoaded', initVoiceAssistant);
