const INTRO = "Hi, I'm [Your Name], a passionate full-stack developer and problem solver.";
const PROMPT = "Would you like to hear about me, my skills, my projects, or my career goals?";

const ABOUT = "I specialize in building interactive, scalable, and visually stunning web applications. My passion lies in creating seamless user experiences and efficient backend systems. Beyond coding, I enjoy learning new technologies, mentoring junior developers, and contributing to open-source projects.";

const SKILLS = "My key skills include HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Python, REST APIs, and cloud deployment. I also work with Git, Docker, and CI/CD pipelines.";

const GOALS = "My current goal is to work on innovative projects that merge technology with real-world problem solving. In the next five years, I aim to become a lead software architect, mentoring teams and building high-impact digital products.";

const PROJECTS = [
    { name: "Portfolio Website", detail: "A fully responsive and interactive portfolio built with HTML, CSS, JavaScript, and GSAP animations." },
    { name: "Task Manager App", detail: "A full-stack MERN application for task management with authentication and real-time updates." },
    { name: "E-Commerce Store", detail: "A React + Node.js store with product filtering, cart system, and secure payments integration." }
];

// Voice logic (using SpeechSynthesis)
let voices;
function initVoiceAssistant() {
    voices = speechSynthesis.getVoices();
    if (!voices.length) {
        speechSynthesis.onvoiceschanged = () => { voices = speechSynthesis.getVoices(); };
    }
    speak(INTRO, () => speak(PROMPT));
}

function speak(text, cb) {
    let utter = new SpeechSynthesisUtterance(text);
    utter.voice = voices.find(v => v.name.includes('Male')) || voices[0];
    utter.rate = 1;
    speechSynthesis.speak(utter);
    if (cb) utter.onend = cb;
}

// Example trigger
window.addEventListener('DOMContentLoaded', initVoiceAssistant);