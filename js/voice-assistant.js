const aiBtn = document.getElementById("ai-float-btn");
const aiStatus = document.getElementById("ai-status");
const voiceSection = document.getElementById("voice-assistant");

// ====== Status update function ======
function updateAIStatus(state) {
    aiStatus.textContent = state; // "Speaking", "Listening", "Idle", "Thinking..."
}

// ====== Intro and Static Data ======
const INTRO = "Hi, I'm Paritosh Barman — an accomplished Full Stack Developer specializing in the MERN stack. I've built over 500 projects across web, Python, and IoT, with a strong focus on clean, efficient, and scalable solutions. My work spans real-time tracking apps, civic engagement platforms, medical systems, and more.";
// const PROMPT = "Would you like to know more about me, hear my skills, or learn about my projects? You can also ask how many projects I have built.";
const PROMPT = "Would you like to know more about me, my skills or about projects? You can also ask any things.";

const ABOUT = "About me: I am a passionate developer who loves building dynamic, interactive applications that solve real problems. My expertise includes the MERN stack — MongoDB, Express, React, and Node.js — as well as Django for backend services. I've developed production-ready solutions like a Smart Field Manager for real-time executive tracking, a Local Democracy Platform with real-time voting, and other custom applications including learning management systems and inventory platforms. My goal is to lead impactful projects, mentor other developers, and contribute to products that improve daily life. I value adaptability, problem-solving, and creating user experiences that feel seamless.";

const SKILLS = "My technical skills include HTML5, CSS3, JavaScript, React, Redux, Node.js, Express, MongoDB, REST APIs, JWT authentication, responsive web design, Docker deployment, and cloud hosting. I also have experience with Python, Django, Leaflet maps, Socket.IO, and third-party API integrations. My soft skills include adaptability, time management, teamwork, and strong problem-solving.";

const PROJECTS = [
    { id: 1, name: "Smart Field Manager", short: "B2B web app for real-time executive tracking.", detail: "Built with React.js, Vite, Node.js, Express.js, and MongoDB. Features include JWT role-based access control, Leaflet maps for live location tracking, file uploads, and direct communication tools like calls and WhatsApp messaging." },
    { id: 2, name: "Local Democracy Platform", short: "Full-stack civic engagement platform with real-time voting.", detail: "Developed with React, Redux Toolkit, Chakra UI, Node.js, Express.js, and MongoDB. Includes JWT authentication, role-based dashboards, real-time Socket.IO updates, and a fully responsive, accessible UI." },
    { id: 3, name: "MERN Notes App", short: "Secure notes app with authentication and CRUD.", detail: "MERN stack application featuring JWT auth, role-based access, and notes management. Frontend built with Chakra UI v3, backend powered by Express and MongoDB." },
    { id: 4, name: "Daily Planner", short: "Task manager with search debounce and persistent storage.", detail: "React-based planner app with task CRUD, debounce search, local persistence, and optional scroll-to-top and category filters." },
    { id: 5, name: "Product Store", short: "E-commerce style product catalog.", detail: "React storefront consuming DummyJSON API with pagination, filters, and detailed product pages, focusing on reusable components and state management." }
];

// ====== History for AI ======
let chatHistory = []; // {role: "user"|"model", content: "..."}

// ====== Backend Query ======
async function queryBackend(userText) {
    updateAIStatus("Thinking...");
    setCaption("Processing your request…");

    try {
        const res = await fetch("https://ai-backend-by-paritosh-barman.onrender.com/chat", {
        // const res = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userText,
                history: chatHistory
            })
        });

        const data = await res.json();
        console.log(data)
        const reply = data.reply || "Sorry, I couldn’t generate a response.";

        // Save history
        chatHistory.push({ role: "user", content: userText });
        chatHistory.push({ role: "model", content: reply });

        speak(reply, promptNext);
    } catch (err) {
        console.error("Backend error:", err);
        speak("Sorry, my AI brain is having trouble connecting.", promptNext);
    } finally {
        updateAIStatus("Idle");
    }
}

// ====== Voice + STT ======
const synth = window.speechSynthesis;
let recog;
let maleVoice = null;
let voicesReady = false;

function pickMaleVoice() {
    const voices = synth.getVoices();
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
    u.onstart = () => {
        updateAIStatus("Speaking...");
        setCaption(text);
    }
    u.onend = () => cb && cb();
    synth.cancel();
    synth.speak(u);
}

function setCaption(t) { document.getElementById('caption').textContent = t; }
function setStatus(t) { document.getElementById('status').textContent = t || ''; }
function showViz(on) { document.getElementById('viz').style.visibility = on ? 'visible' : 'hidden'; }

function ensureRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        setStatus('Speech recognition not supported in this browser.');
        return null;
    }
    const r = new webkitSpeechRecognition();
    r.lang = 'en-US';
    r.continuous = false; r.interimResults = false; r.maxAlternatives = 1;
    return r;
}

function listenOnce(onResult) {
    const r = ensureRecognition();
    if (!r) return;
    recog = r;
    showViz(true);
    updateAIStatus("Listening...");
    setCaption('Listening… You can say: about me, skills, projects, or ask any other question.');
    r.onresult = (e) => {
        showViz(false);
        updateAIStatus("Idle");
        const said = e.results[0][0].transcript.toLowerCase();
        setStatus('You said: "' + said + '"');
        onResult(said);
    };
    r.onerror = (e) => { showViz(false); updateAIStatus("Idle"); setStatus('Mic error: ' + (e.error || 'unknown')); speak("Sorry, I couldn't hear that.", promptNext); };
    r.onend = () => { showViz(false); updateAIStatus("Idle"); };
    r.start();
}

// ====== Dialogue Management ======
function promptNext() { speak(PROMPT, () => listenOnce(routeIntent)); }
function startIntro() {
    speak(INTRO, () => {
        chatHistory.push({ role: "model", content: INTRO });
        speak(PROMPT, () => listenOnce(routeIntent));
    });
}

function routeIntent(utter) {
    // if (/(about|yourself|who are you|more about)/i.test(utter)) {
    //     speak(ABOUT, promptNext);
    //     return;
    // }
    // if (/(skill|skills|tech|stack|technology)/i.test(utter)) {
    //     speak(SKILLS, promptNext);
    //     return;
    // }
    // if (/(project|projects)/i.test(utter)) {
    //     if (/(how many|count|number)/i.test(utter)) {
    //         speak(`I have built over 50 projects. Do you want the list?`, () =>
    //             listenOnce(say => {
    //                 if (/yes|yeah|sure|ok|okay/i.test(say)) listProjects();
    //                 else promptNext();
    //             })
    //         );
    //         return;
    //     }
    //     const idx = parseProjectIndex(utter);
    //     if (idx !== -1) { speakProjectDetail(idx); return; }
    //     listProjects(); return;
    // }
    if (/(repeat|again|replay|intro)/i.test(utter)) { startIntro(); return; }
    const idx2 = parseProjectIndex(utter);
    if (idx2 !== -1) { speakProjectDetail(idx2); return; }

    // 🔹 NEW: Fallback to AI backend
    queryBackend(utter);
}

function listProjects() {
    const names = PROJECTS.map(p => p.name).join(', ');
    speak(`Here are my projects: ${names}. You can say a project name to hear more.`, () =>
        listenOnce(utter => {
            const i = parseProjectIndex(utter);
            if (i !== -1) speakProjectDetail(i); else promptNext();
        })
    );
}

function speakProjectDetail(i) {
    const p = PROJECTS[i];
    const lines = `${p.name}. ${p.short} ${p.detail}`;
    speak(lines, promptNext);
}

function parseProjectIndex(utter) {
    let i = PROJECTS.findIndex(p => utter.includes(p.name.toLowerCase()));
    if (i !== -1) return i;
    if (/(first|one|1)/i.test(utter)) return 0;
    if (/(second|two|2)/i.test(utter)) return Math.min(1, PROJECTS.length - 1);
    if (/(third|three|3)/i.test(utter)) return Math.min(2, PROJECTS.length - 1);
    return -1;
}

// ====== Autoplay Handling ======
function tryAutoplay() {
    if (!voicesReady) { pickMaleVoice(); }
    let started = false;
    const u = new SpeechSynthesisUtterance('');
    synth.speak(u);
    setTimeout(() => {
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
speechSynthesis.onvoiceschanged = () => { voicesReady = true; pickMaleVoice(); };
document.getElementById('restart').addEventListener('click', () => startIntro());
document.getElementById('ask').addEventListener('click', () => listenOnce(routeIntent));
document.getElementById('unlock').addEventListener('click', () => {
    document.getElementById('gate').style.display = 'none';
    startIntro();
});

// Start automatically
window.addEventListener('DOMContentLoaded', () => {
    setCaption('Initializing voice…');
    // Wake up backend
    fetch("https://ai-backend-by-paritosh-barman.onrender.com/")
        .then(() => console.log("Backend wake-up ping sent"))
        .catch(err => console.log("Backend wake-up failed:", err));
    setTimeout(tryAutoplay, 350);
});
