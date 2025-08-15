// ====== Content you can customize ======
const INTRO = "Hi, I'm Paritosh Barman. I'm a MERN stack developer who loves building interactive web apps, crafting clean APIs, and solving DSA problems.";
const PROMPT = "Would you like to know more about me, hear my skills, or learn about my projects? You can also say: how many projects have I built.";

const ABOUT = "About me: I enjoy full‑stack development with React, Node, Express, and MongoDB. I like clean UI, accessible design, and robust backend architecture.";
const SKILLS = "My core skills include HTML, CSS, JavaScript, React, Redux, Node, Express, MongoDB, REST APIs, authentication, and deployment with Docker and cloud.";

const PROJECTS = [
    { id: 1, name: "Daily Planner", short: "Task manager with search debounce and persistent storage.", detail: "A daily planner web app with task CRUD, debounce search, local persistence, and optional scroll‑to‑top and category filters. Built with React and modern hooks." },
    { id: 2, name: "MERN Notes App", short: "Secure notes with auth and CRUD.", detail: "A MERN stack app featuring JWT auth, role‑based access, and notes management. Chakra UI v3 on the frontend, Express + MongoDB on the backend." },
    { id: 3, name: "Product Store", short: "Catalog with sorting, filtering, and details.", detail: "A React storefront consuming the DummyJSON API with pagination, filters, and a product detail page. Emphasis on reusable components and state management." }
];

// ====== Voice + STT plumbing (no backend) ======
const synth = window.speechSynthesis;
let recog; // webkitSpeechRecognition instance
let maleVoice = null;
let voicesReady = false;

function pickMaleVoice() {
    const voices = synth.getVoices();
    // Try explicit male names, or best English fallback
    maleVoice = voices.find(v => /male/i.test(v.name))
        || voices.find(v => /(David|Mark|Alex|John|George|Matthew|Guy|Daniel)/i.test(v.name))
        || voices.find(v => /English/i.test(v.lang))
        || voices[0] || null;
    document.querySelector('#voiceName em').textContent = maleVoice ? maleVoice.name : 'default';
}

function speak(text, cb) {
    if (!text) return cb && cb();
    const u = new SpeechSynthesisUtterance(text);
    if (maleVoice) u.voice = maleVoice;
    u.rate = 1; u.pitch = 1; u.volume = 1;
    u.onstart = () => setCaption(text);
    u.onend = () => cb && cb();
    synth.cancel(); // stop anything pending before speaking fresh
    synth.speak(u);
}

function setCaption(t) {
    document.getElementById('caption').textContent = t;
}

function setStatus(t) {
    document.getElementById('status').textContent = t || '';
}

function showViz(on) {
    document.getElementById('viz').style.visibility = on ? 'visible' : 'hidden';
}

function ensureRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        setStatus('Speech recognition not supported in this browser.');
        return null;
    }
    const r = new webkitSpeechRecognition();
    r.lang = 'en-US';
    r.continuous = false; r.interimResults = false;
    r.maxAlternatives = 1;
    return r;
}

function listenOnce(onResult) {
    const r = ensureRecognition();
    if (!r) return;
    recog = r;
    showViz(true);
    setCaption('Listening… you can say: about me, skills, projects, how many projects, or project name.');
    r.onresult = (e) => {
        showViz(false);
        const said = e.results[0][0].transcript.toLowerCase();
        setStatus('You said: "' + said + '"');
        onResult(said);
    };
    r.onerror = (e) => { showViz(false); setStatus('Mic error: ' + (e.error || 'unknown')); speak("Sorry, I couldn't hear that.", promptNext); };
    r.onend = () => { showViz(false); /* if ended with no result, we can reprompt */ };
    r.start();
}

// ====== Dialogue management ======
function promptNext() {
    speak(PROMPT, () => listenOnce(routeIntent));
}

function startIntro() {
    // Intro → options
    speak(INTRO, () => speak(PROMPT, () => listenOnce(routeIntent)));
}

function routeIntent(utter) {
    // Basic routing by keywords
    if (/(about|yourself|who are you|more about)/i.test(utter)) {
        speak(ABOUT, promptNext);
        return;
    }
    if (/(skill|skills|tech|stack|technology)/i.test(utter)) {
        speak(SKILLS, promptNext);
        return;
    }
    if (/(project|projects)/i.test(utter)) {
        if (/(how many|count|number)/i.test(utter)) {
            speak(`I have built ${PROJECTS.length} projects. Do you want the list?`, () => listenOnce(say => {
                if (/yes|yeah|sure|ok|okay/i.test(say)) listProjects(); else promptNext();
            }));
            return;
        }
        // If user mentions a project by name or number
        const idx = parseProjectIndex(utter);
        if (idx !== -1) {
            speakProjectDetail(idx);
            return;
        }
        // Otherwise give the list first
        listProjects();
        return;
    }
    if (/(repeat|again|replay|intro)/i.test(utter)) {
        startIntro();
        return;
    }
    // If user says a known project name directly
    const idx2 = parseProjectIndex(utter);
    if (idx2 !== -1) { speakProjectDetail(idx2); return; }

    // Fallback
    speak("Sorry, I didn't catch that. You can say: about me, skills, projects, or a project name like Daily Planner.", promptNext);
}

function listProjects() {
    const names = PROJECTS.map(p => p.name).join(', ');
    speak(`Here are my projects: ${names}. You can say a project name to hear more.`, () => listenOnce(utter => {
        const i = parseProjectIndex(utter);
        if (i !== -1) speakProjectDetail(i); else promptNext();
    }));
}

function speakProjectDetail(i) {
    const p = PROJECTS[i];
    const lines = `${p.name}. ${p.short} ${p.detail}`;
    speak(lines, promptNext);
}

function parseProjectIndex(utter) {
    // by explicit name
    let i = PROJECTS.findIndex(p => utter.includes(p.name.toLowerCase()));
    if (i !== -1) return i;
    // by ordinal/number
    if (/(first|one|1)/i.test(utter)) return 0;
    if (/(second|two|2)/i.test(utter)) return Math.min(1, PROJECTS.length - 1);
    if (/(third|three|3)/i.test(utter)) return Math.min(2, PROJECTS.length - 1);
    return -1;
}

// ====== Autoplay handling ======
function tryAutoplay() {
    // Some browsers require a user gesture; we attempt once, else show gate
    if (!voicesReady) { pickMaleVoice(); }
    // If speech is blocked, speaking may be ignored; we detect by timeout
    let started = false;
    const origSpeak = synth.speak;
    // just attempt to speak intro; if after 800ms nothing spoke, show gate
    const u = new SpeechSynthesisUtterance(''); // flush
    synth.speak(u);
    setTimeout(() => {
        // try real intro
        const check = new SpeechSynthesisUtterance('');
        check.onstart = () => started = true;
        synth.speak(check);
        setTimeout(() => {
            if (!started) {
                document.getElementById('gate').style.display = 'grid';
            } else {
                startIntro();
            }
        }, 400);
    }, 200);
}

// ====== Wiring ======
// Voices can load asynchronously
speechSynthesis.onvoiceschanged = () => { voicesReady = true; pickMaleVoice(); };

// UI buttons
document.getElementById('restart').addEventListener('click', () => startIntro());

document.getElementById('ask').addEventListener('click', () => listenOnce(routeIntent));

document.getElementById('unlock').addEventListener('click', () => {
    document.getElementById('gate').style.display = 'none';
    startIntro();
});

// Start automatically when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    setCaption('Initializing voice…');
    // Give voices a moment to populate then attempt autoplay
    setTimeout(tryAutoplay, 350);
});