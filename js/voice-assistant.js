const aiBtn = document.getElementById("ai-float-btn");
const aiStatus = document.getElementById("ai-status");
const voiceSection = document.getElementById("voice-assistant");

// ====== Status update function ======
function updateAIStatus(state) {
  aiStatus.textContent = state; // "Speaking", "Listening", "Idle", "Thinking..."
}

// ====== Intro and Static Data ======
// const INTRO = "Hi, I'm Paritosh Barman — an accomplished Full Stack Developer specializing in the MERN stack. I've built over 500 projects across Web, Python, and IoT, with a strong focus on clean, efficient, and scalable solutions. My work spans real-time tracking apps, civic engagement platforms, medical systems, and more.";
// // const PROMPT = "Would you like to know more about me, hear my skills, or learn about my projects? You can also ask how many projects I have built.";
// const PROMPT = "Would you like to know more about me, my skills or about projects? You can also ask any things.";

// const ABOUT = "About me: I am a passionate developer who loves building dynamic, interactive applications that solve real problems. My expertise includes the MERN stack — MongoDB, Express, React, and Node.js — as well as Django for backend services. I've developed production-ready solutions like a Smart Field Manager for real-time executive tracking, a Local Democracy Platform with real-time voting, and other custom applications including learning management systems and inventory platforms. My goal is to lead impactful projects, mentor other developers, and contribute to products that improve daily life. I value adaptability, problem-solving, and creating user experiences that feel seamless.";

// const SKILLS = "My technical skills include HTML5, CSS3, JavaScript, React, Redux, Node.js, Express, MongoDB, REST APIs, JWT authentication, responsive web design, Docker deployment, and cloud hosting. I also have experience with Python, Django, Leaflet maps, Socket.IO, and third-party API integrations. My soft skills include adaptability, time management, teamwork, and strong problem-solving.";
// ====== Intro and Static Data ======
// const INTRO =
//     "Hi, I'm Paritosh Barman — a passionate and accomplished Full Stack Developer specializing in the MERN stack. " +
//     "Over the years, I’ve built 500+ projects across Web, Python automation, and IoT — ranging from real-time tracking apps and ERP systems to civic engagement platforms, automation tools, and robotics. " +
//     "I love turning ideas into scalable, production-ready solutions that make a real impact.";

// const PROMPT =
//     "Would you like to know more about me, explore my skills, or hear about the projects I’ve built? " +
//     "You can also ask about my journey, freelancing experience, or even how I teach coding and guide others in their projects.";

// const ABOUT =
//     "About me: I am a self-made developer who discovered programming during my Diploma in Electrical Engineering, where I first learned C. " +
//     "Although I couldn’t complete the diploma due to Covid-19 and financial struggles, I kept learning and building projects on my own. " +
//     "Later, I mastered JavaScript, advanced React, backend systems, databases, and DSA at Prepleaf by Masai. " +
//     "Since then, I’ve freelanced for clients in Delhi, Rajasthan, and my hometown, while also working on personal automation and IoT projects. " +
//     "I enjoy teaching MERN stack development, helping others build their projects, and solving real-world problems. " +
//     "My goal is to lead impactful projects, mentor developers, and create products that improve daily life.";

// const SKILLS =
//     "Technical Skills: \n" +
//     "- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Redux, TailwindCSS, Chakra UI.\n" +
//     "- Backend: Node.js, Express.js, Django.\n" +
//     "- Database: MongoDB, PostgreSQL (basic).\n" +
//     "- Other: REST APIs, JWT authentication, Socket.IO, Leaflet maps, Docker, VPS/Cloud hosting (Render, Netlify).\n" +
//     "- Python: Automation with Selenium, OCR tools, Excel-based data handling.\n" +
//     "- Hardware/IoT: Arduino, ESP32, OpenCV, microcontroller programming.\n\n" +
//     "Soft Skills: Adaptability, problem-solving, teamwork, time management, leadership, and mentoring.";

const INTRO =
  "Hi, I'm Paritosh Barman — a Full Stack Developer specializing in the MERN stack and JavaScript ecosystem. " +
  "I build web applications, business management systems, CRM automation, and AI-powered solutions through Maglev Softwares. " +
  "My work also includes Maglev AI Vision, a computer vision platform focused on workplace safety, vehicle monitoring, and real-time video analytics. " +
  "I enjoy turning practical ideas into useful software products.";

const PROMPT =
  "Want to know more about my journey, technical skills, or projects? " +
  "Ask me about my MERN stack experience, Maglev Softwares, AI-powered CRM, or Maglev AI Vision. " +
  "You can also explore my freelance projects, automation tools, and IoT experiments. " +
  "If you want to contact me, just say 'I want to send a message' or 'drop a message', and I'll help you write and send it if the messaging feature is available. " +
  "Ask me anything, I’m listening...";

const ABOUT =
  "About me: I'm a self-taught developer who discovered programming while studying Diploma in Electrical Engineering, where I first learned C. " +
  "Although I couldn't complete the diploma due to COVID-19 and financial difficulties, I continued learning independently and building projects. " +
  "In August 2023, I joined Prepleaf by Masai, strengthening my JavaScript, React, backend development, databases, and problem-solving skills. " +
  "I later worked as a Full Stack Developer at DesignDot Technologies, building production-oriented web applications and backend services. " +
  "Through Maglev Softwares, I now work on full-stack applications, business software, AI-powered CRM workflows using Gemini API, and Maglev AI Vision for computer vision and safety monitoring. " +
  "I also build automation tools and experiment with Python, OpenCV, ESP32, Arduino, and IoT. " +
  "My goal is to build useful products, solve real-world problems, and continue growing as a software engineer.";

const SKILLS =
  "Technical Skills: \n" +
  "- Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, Next.js, TypeScript, Redux, Redux Toolkit, Tailwind CSS, Chakra UI.\n" +
  "- Backend: Node.js, Express.js, REST APIs, Django, authentication, JWT, and role-based access control (RBAC).\n" +
  "- Databases: MongoDB, Mongoose, PostgreSQL, MySQL, Prisma.\n" +
  "- AI & Automation: Gemini API integration, Python automation, Selenium, OCR, OpenCV, computer vision, and video analytics.\n" +
  "- Real-Time & Mapping: Socket.IO, Leaflet maps, event monitoring, and notifications.\n" +
  "- Cloud & Tools: Git, GitHub, AWS EC2, VPS hosting, Render, Netlify.\n" +
  "- Hardware & IoT: Arduino, ESP32, electronics, robotics, and microcontroller programming.\n\n" +
  "Core Strengths: Problem-solving, requirement analysis, debugging, adaptability, independent learning, collaboration, and end-to-end product development.";

// const PROJECTS = [
//     {
//         id: 1,
//         name: "Smart Field Manager",
//         short: "B2B web app for real-time executive tracking.",
//         detail:
//             "Built with React.js, Vite, Node.js, Express.js, and MongoDB. Features include JWT role-based access control, Leaflet maps for live location tracking, file uploads, and direct communication tools like calls and WhatsApp messaging."
//     },
//     {
//         id: 2,
//         name: "Local Democracy Platform",
//         short: "Full-stack civic engagement platform with real-time voting.",
//         detail:
//             "Developed with React, Redux Toolkit, Chakra UI, Node.js, Express.js, and MongoDB. Includes JWT authentication, role-based dashboards, real-time Socket.IO updates, and a fully responsive, accessible UI."
//     },
//     {
//         id: 3,
//         name: "ChemiBoost ERP",
//         short: "ERP software for pharmacies, chemical manufacturers, and hospitals.",
//         detail:
//             "Developed with MERN stack. Features include inventory management, sales tracking, marketing automation, and performance analytics. Designed for scalability and role-based access with real-time dashboards."
//     },
//     {
//         id: 4,
//         name: "Asso Pharmaceuticals Website",
//         short: "Website for a pharma company.",
//         detail:
//             "Developed using Django and MongoDB for Asso Pharmaceuticals, located in Jaipur and Gangapur, Rajasthan. The site features product listings, doctor directories, and automated WhatsApp messaging to customers. It also includes payment tracking with notifications for pending or missed payments, along with a blogging system, auto-slug SEO optimization, and user-based permissions for supervisors and content writers."
//     },
//     {
//         id: 5,
//         name: "Skill Book Institute Website",
//         short: "Educational institute website for skill-based courses.",
//         detail:
//             "Developed to showcase institute offerings such as Data Entry, AutoCAD, Graphic Designing, and other vocational courses. Located in Rohini Sec-6, Delhi, the institute highlights offline classroom training, guided mentorship, and career-oriented course structures to help students become job-ready."
//     }

// ];

const PROJECTS = [
  {
    id: 1,
    name: "Maglev AI Vision",
    short:
      "AI-powered computer vision platform for industrial safety and real-time video analytics.",
    detail:
      "Developed an AI-powered vision platform focused on industrial safety, workplace monitoring, and intelligent video analytics. Features include helmet and PPE detection, red-light violations, triple riding detection, vehicle monitoring, crane safety monitoring, animal detection, fire and smoke detection, and restricted-zone monitoring. Supports event snapshots, real-time alerts, and edge-based video processing. The platform follows a Detect, Decide, and Act approach to help identify hazards and trigger configured alerts or actions.",
  },
  {
    id: 2,
    name: "AI-Powered CRM & Business Automation",
    short:
      "Intelligent CRM workflows for business research and personalized customer outreach.",
    detail:
      "Building an AI-powered CRM through Maglev Softwares using the Google Gemini API. The system researches businesses, analyzes business profiles and potential customer needs, and helps generate personalized outreach emails. Designed to support smarter lead research, customer communication, and business development workflows.",
  },
  {
    id: 3,
    name: "Smart Field Manager",
    short:
      "B2B web app for real-time executive tracking and field-team management.",
    detail:
      "Built with React.js, Vite, Node.js, Express.js, and MongoDB. Features include JWT authentication, role-based access control, Leaflet maps for live location tracking, file uploads, and communication tools such as calls and WhatsApp messaging.",
  },
  {
    id: 4,
    name: "Local Democracy Platform",
    short:
      "Full-stack civic engagement platform with real-time voting and feedback.",
    detail:
      "Developed with React, Redux Toolkit, Chakra UI, Node.js, Express.js, MongoDB, and Socket.IO. Includes JWT authentication, role-based dashboards, real-time voting updates, notifications, feedback features, and a responsive user interface.",
  },
  {
    id: 5,
    name: "ChemiBoost ERP",
    short:
      "ERP software for pharmacies, chemical manufacturers, and hospitals.",
    detail:
      "Developed using the MERN stack. Features include inventory management, sales tracking, marketing automation, performance analytics, role-based access, and dashboards for managing business operations.",
  },
  {
    id: 6,
    name: "Asso Pharmaceuticals Website",
    short:
      "Business website and management features for a pharmaceutical company.",
    detail:
      "Developed using Django and MongoDB for Asso Pharmaceuticals in Rajasthan. Includes product listings, doctor directories, WhatsApp messaging, payment reminders for pending invoices, and a blogging system with automatic SEO-friendly slug generation. Also includes supervisor and content-writer permission controls.",
  },
  {
    id: 7,
    name: "Skill Book Institute Website",
    short:
      "Educational website for vocational training and skill-based courses.",
    detail:
      "Developed a website showcasing courses such as Data Entry, AutoCAD, Graphic Designing, and other vocational programs. Designed to present the institute's classroom training, mentorship, and career-oriented learning opportunities.",
  },
  {
    id: 8,
    name: "Cyber Cafe Auto Form Filler",
    short: "Python automation software for repetitive form-filling tasks.",
    detail:
      "Built a Python-based automation system that uses Excel data to fill government and business forms automatically. Helps reduce repetitive manual work and improve efficiency for cyber cafe operations.",
  },
  {
    id: 9,
    name: "Document OCR & Data Extractor",
    short:
      "Automated text and data extraction from identity documents and QR codes.",
    detail:
      "Built Python-based OCR and automation tools to extract information from scanned Aadhaar cards, Voter ID documents, and Aadhaar QR codes. Extracted data can be organized in Excel and used by automated form-filling workflows.",
  },
  {
    id: 10,
    name: "Tatkal Train Ticket Automation",
    short: "Python and Selenium-based browser automation project.",
    detail:
      "Developed a browser automation workflow using Python and Selenium, with VPS/RDP and supporting automation tools. Explored automated form handling, OTP retrieval, and booking-related workflows.",
  },
  {
    id: 11,
    name: "Drone & Robotics Automation",
    short:
      "Hardware and software projects involving robotics and embedded systems.",
    detail:
      "Developed robotics and automation projects using Arduino, ESP32, OpenCV, and electronic components. Projects included gesture-controlled robots, automation tasks, microcontroller programming, and small drone prototypes.",
  },
  {
    id: 12,
    name: "Maglev IoT Alert Device",
    short:
      "ESP32-based alert device with LED indicators and display integration.",
    detail:
      "Developed an ESP32-based IoT prototype with serial command handling, LED control, and support for integrating an OLED display and relay-based control hardware. Designed as part of Maglev Softwares' hardware automation experiments.",
  },
];

// ====== History for AI ======
let chatHistory = []; // {role: "user"|"model", content: "..."}

// ====== Backend Query ======
async function queryBackend(userText) {
  updateAIStatus("Thinking...");
  setCaption("Processing your request…");

  try {
    const res = await fetch(
      "https://ai-backend-by-paritosh-barman.onrender.com/chat",
      {
        // const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: chatHistory,
        }),
      },
    );

    const data = await res.json();

    // if (data.reply) {
    const reply = data.reply || "Sorry, I couldn’t generate a response.";

    // Save history
    chatHistory.push({ role: "user", content: userText });
    chatHistory.push({ role: "model", content: reply });

    speak(reply, promptNext);
    // } else {
    //     console.log('Enter in here..')
    //     routeIntent(userText)
    // }
  } catch (err) {
    console.error("Backend error:", err);
    speak("Sorry, my AI brain is having trouble connecting.", promptNext);
  } finally {
    updateAIStatus("AI");
  }
}

// ====== Voice + STT ======
const synth = window.speechSynthesis;
let recog;
let maleVoice = null;
let voicesReady = false;

function pickMaleVoice() {
  const voices = synth.getVoices();
  console.log(voices);
  maleVoice =
    voices.find((v) => /male/i.test(v.name)) ||
    voices.find((v) => /male/i.test(v.name)) ||
    voices.find((v) => /(Ravi|Male)/i.test(v.name)) ||
    voices.find((v) => /\bMale\b/i.test(v.name)) ||
    voices.find((v) =>
      /(David|Mark|Alex|John|George|Matthew|Guy|Daniel)/i.test(v.name),
    ) ||
    voices.find((v) => /English/i.test(v.lang)) ||
    voices[0] ||
    null;
  document.querySelector("#voiceName em").textContent = maleVoice
    ? maleVoice.name
    : "default";
}

function speak(text, cb) {
  if (!text) return cb && cb();
  const u = new SpeechSynthesisUtterance(text);
  console.log(maleVoice.name);
  if (maleVoice) u.voice = maleVoice;
  u.rate = 1;
  u.pitch = 0.7;
  u.volume = 1;
  u.onstart = () => {
    updateAIStatus("Speaking...");
    setCaption(text);
  };
  u.onend = () => cb && cb();
  synth.cancel();
  synth.speak(u);
}

// // ====== Voice + STT ======
// const synth = window.speechSynthesis;
// let recog;
// let maleVoice = null;

// // ✅ Load voices properly
// function pickMaleVoice() {
//     const voices = synth.getVoices();
//     console.log("Available voices:", voices);

//     maleVoice =
//         voices.find(v => /male/i.test(v.name)) ||
//         voices.find(v => /(Ravi|Male)/i.test(v.name)) ||
//         voices.find(v => /\bMale\b/i.test(v.name)) ||
//         voices.find(v => /(David|Mark|Alex|John|George|Matthew|Guy|Daniel|James|Paul)/i.test(v.name)) ||
//         voices.find(v => v.lang === "en-US" && /Google US English/i.test(v.name)) ||
//         voices.find(v => /English/i.test(v.lang)) ||
//         voices[0] || null;

//     if (document.querySelector('#voiceName em')) {
//         document.querySelector('#voiceName em').textContent = maleVoice
//             ? maleVoice.name
//             : "default";
//     }
// }

// // ✅ Run once voices are available
// synth.onvoiceschanged = pickMaleVoice;

// // ====== Speak function ======
// function speak(text, cb) {
//     if (!text) return cb && cb();

//     const u = new SpeechSynthesisUtterance(text);
//     if (maleVoice) u.voice = maleVoice;

//     u.rate = 1;
//     u.pitch = 0.6;   // ⚡ lower pitch for more "male" tone
//     u.volume = 1;

//     u.onstart = () => {
//         updateAIStatus("Speaking...");
//         setCaption(text);
//     };
//     u.onend = () => cb && cb();

//     synth.cancel(); // stop any ongoing speech
//     synth.speak(u);
// }

// const synth = window.speechSynthesis;
// let maleVoice = null;

// function pickMaleVoice() {
//     const voices = synth.getVoices();
//     console.log("Available voices:", voices.map(v => v.name));

//     // 1️⃣ Try to pick a known male voice
//     maleVoice =
//         voices.find(v => /(Ravi|Male)/i.test(v.name)) ||
//         voices.find(v => /\bMale\b/i.test(v.name)) ||
//         voices.find(v => /(David|Mark|Alex|John|George|Matthew|Guy|Daniel|James|Paul|Mike|Sam)/i.test(v.name)) ||
//         voices.find(v => /(India)/i.test(v.name)) ||
//         voices.find(v => /Google US English/i.test(v.name)) ||
//         voices.find(v => /English/i.test(v.lang)) ||
//         voices[0] || null;

//     if (maleVoice) {
//         console.log("✅ Selected voice:", maleVoice.name);
//     } else {
//         console.warn("⚠ No male voice found, using default voice.");
//     }

//     if (document.querySelector('#voiceName em')) {
//         document.querySelector('#voiceName em').textContent = maleVoice
//             ? maleVoice.name
//             : "default";
//     }
// }

// // Wait until voices are loaded
// synth.onvoiceschanged = pickMaleVoice;

// function speak(text, cb) {
//     if (!text) return cb && cb();

//     const u = new SpeechSynthesisUtterance(text);

//     // ✅ Force voice
//     console.log('Hellooooooo', maleVoice)
//     if (maleVoice) {
//         u.voice = maleVoice;
//     }

//     // ✅ Adjust pitch/rate for male tone
//     u.rate = 1;
//     u.pitch = 1;  // lower pitch → deeper male-like
//     u.volume = 1;

//     u.onstart = () => {
//         updateAIStatus("Speaking...");
//         setCaption(text);
//     };
//     u.onend = () => cb && cb();

//     synth.cancel();
//     synth.speak(u);
// }

function setCaption(t) {
  document.getElementById("caption").textContent = t;
}
function setStatus(t) {
  document.getElementById("status").textContent = t || "";
}
function showViz(on) {
  document.getElementById("viz").style.visibility = on ? "visible" : "hidden";
}

function ensureRecognition() {
  if (!("webkitSpeechRecognition" in window)) {
    setStatus("Speech recognition not supported in this browser.");
    return null;
  }
  const r = new webkitSpeechRecognition();
  r.lang = "en-US";
  r.continuous = false;
  r.interimResults = false;
  r.maxAlternatives = 1;
  return r;
}

function listenOnce(onResult) {
  const r = ensureRecognition();
  if (!r) return;
  recog = r;
  showViz(true);
  updateAIStatus("Listening...");
  setCaption(
    "Listening… You can say: about me, skills, projects, or ask any other question.",
  );
  r.onresult = (e) => {
    showViz(false);
    updateAIStatus("AI");
    const said = e.results[0][0].transcript.toLowerCase();
    setStatus('You said: "' + said + '"');
    onResult(said);
  };
  r.onerror = (e) => {
    showViz(false);
    updateAIStatus("AI");
    setStatus("Mic error: " + (e.error || "unknown"));
    speak("Sorry, I couldn't hear that.", promptNext);
  };
  r.onend = () => {
    showViz(false);
    updateAIStatus("AI");
  };
  r.start();
}

// ====== Dialogue Management ======
// function promptNext() { speak(PROMPT, () => listenOnce(routeIntent)); }
function promptNext() {
  speak("Ask me anything, I’m listening...", () => listenOnce(routeIntent));
}
// function promptNext() { speak(PROMPT, () => listenOnce(queryBackend)); }
function startIntro() {
  speak(INTRO, () => {
    chatHistory.push({ role: "model", content: INTRO });
    speak(PROMPT, () => listenOnce(routeIntent));
    // speak(PROMPT, () => listenOnce(queryBackend));
  });
}

function sendMessageToBackend(message) {
  fetch("https://ai-backend-by-paritosh-barman.onrender.com/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        speak(
          "Your message has been sent successfully. Thank you! Let's go next.",
          promptNext,
        );
      } else {
        speak("Sorry, I couldn’t send your message right now.", promptNext);
      }
    })
    .catch((err) => {
      console.error("❌ Message sending failed:", err);
      speak("There was an error sending your message.", promptNext);
    });
}

function routeIntent(utter) {
  if (/(tell me about yourself|who are you|more about you)/i.test(utter)) {
    speak(ABOUT, promptNext);
    return;
  }
  if (
    /(tell me about your skill|tell me about your skills|tell me about your tech stack|tell about your skill|tell about your skills|tell about your tech stack)/i.test(
      utter,
    )
  ) {
    speak(SKILLS, promptNext);
    return;
  }
  if (
    /(tell me about your project|tell me about your projects|tell about your project|tell about your projects)/i.test(
      utter,
    )
  ) {
    if (/(how many|count|number)/i.test(utter)) {
      speak(
        `I have built over 500 projects across Web, Python, and IoT. Do you want me to share some of the key ones?`,
        () =>
          listenOnce((say) => {
            if (/yes|yeah|sure|ok|okay/i.test(say)) listProjects();
            else promptNext();
          }),
      );
      return;
    }
    const idx = parseProjectIndex(utter);
    if (idx !== -1) {
      speakProjectDetail(idx);
      return;
    }
    listProjects();
    return;
  }
  if (/(repeat your intro|again your intro|replay your intro)/i.test(utter)) {
    startIntro();
    return;
  }
  const idx2 = parseProjectIndex(utter);
  if (idx2 !== -1) {
    speakProjectDetail(idx2);
    return;
  }

  if (
    /(send a message|leave a message|i want to message|drop a message)/i.test(
      utter,
    )
  ) {
    speak(
      "Sure! What message would you like to send? Just say it out loud. You can also mention your name if you’d like.",
      () => {
        listenOnce((msg) => {
          sendMessageToBackend(msg);
        });
      },
    );
    return;
  }

  // Fallback to AI backend
  queryBackend(utter);
}

function listProjects() {
  const names = PROJECTS.map((p) => p.name).join(", ");
  speak(
    `Here are my some projects: ${names}. You can say a project name to hear more.`,
    () =>
      listenOnce((utter) => {
        const i = parseProjectIndex(utter);
        if (i !== -1) speakProjectDetail(i);
        else promptNext();
      }),
  );
}

function speakProjectDetail(i) {
  const p = PROJECTS[i];
  const lines = `${p.name}. ${p.short} ${p.detail}`;
  speak(lines, promptNext);
}

function parseProjectIndex(utter) {
  let i = PROJECTS.findIndex((p) => utter.includes(p.name.toLowerCase()));
  if (i !== -1) return i;
  if (/(first|one|1)/i.test(utter)) return 0;
  if (/(second|two|2)/i.test(utter)) return Math.min(1, PROJECTS.length - 1);
  if (/(third|three|3)/i.test(utter)) return Math.min(2, PROJECTS.length - 1);
  return -1;
}

// ====== Autoplay Handling ======
function tryAutoplay() {
  if (!voicesReady) {
    pickMaleVoice();
  }
  let started = false;
  const u = new SpeechSynthesisUtterance("");
  synth.speak(u);
  setTimeout(() => {
    const check = new SpeechSynthesisUtterance("");
    check.onstart = () => (started = true);
    synth.speak(check);
    setTimeout(() => {
      if (!started) {
        document.getElementById("gate").style.display = "grid";
      } else {
        startIntro();
      }
    }, 400);
  }, 200);
}

// ====== Wiring ======
speechSynthesis.onvoiceschanged = () => {
  voicesReady = true;
  pickMaleVoice();
};
document.getElementById("restart").addEventListener("click", () => {
  if (recog) {
    recog.stop();
  }
  synth.cancel();
  startIntro();
});
document.getElementById("ask").addEventListener("click", () => {
  synth.cancel();
  listenOnce(routeIntent);
});

document.getElementById("stop").addEventListener("click", () => {
  // Stop speaking
  synth.cancel();

  // Stop listening
  if (recog) {
    recog.stop();
  }

  updateAIStatus("Stopped");
  setCaption("AI Assistant stopped. Click Replay or Ask to continue.");
  setTimeout(() => {
    updateAIStatus("AI");
  }, 5000);
});

// for call ai first
// document.getElementById('ask').addEventListener('click', () => listenOnce(queryBackend));
document.getElementById("unlock").addEventListener("click", () => {
  document.getElementById("gate").style.display = "none";
  if (!voicesReady) {
    pickMaleVoice();
  }
  setTimeout(() => {
    startIntro();
  }, 2000);
});

// Start automatically
window.addEventListener("DOMContentLoaded", () => {
  setCaption("Initializing voice…");
  // Wake up backend
  fetch("https://ai-backend-by-paritosh-barman.onrender.com/")
    .then(() => {
      console.log("Backend wake-up ping sent");
      trackVisitor();
    })
    .catch((err) => {
      console.log("Backend wake-up failed:", err);
      trackVisitor();
    });
  setTimeout(tryAutoplay, 350);
});

async function trackVisitor() {
  const visitorId = localStorage.getItem("visitorId");

  // Default payload
  const payload = { visitorId };

  // Try to get location from browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // Call Nominatim reverse geocoding directly in browser
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
            {
              headers: {
                Accept: "application/json",
                "User-Agent": "YourAppName/1.0", // required by Nominatim
              },
            },
          );
          const place = await res.json();

          payload.location = {
            lat,
            lon,
            displayName: place.display_name || null,
            country: place.address?.country || null,
            state: place.address?.state || null,
            city:
              place.address?.city || place.address?.town || place.name || null,
            postcode: place.address?.postcode || null,
          };
        } catch (err) {
          console.warn("⚠️ Reverse geocoding failed:", err);
          payload.location = { lat, lon }; // fallback
        }

        sendToServer(payload);
      },
      (err) => {
        console.warn("⚠️ Location permission denied or error:", err);
        payload.location = null; // fallback
        sendToServer(payload);
      },
    );
  } else {
    console.warn("❌ Geolocation not supported in this browser");
    payload.location = null;
    sendToServer(payload);
  }
}

function sendToServer(payload) {
  fetch("https://ai-backend-by-paritosh-barman.onrender.com/track", {
    // relative path (works on localhost + Render)
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.id) {
        localStorage.setItem("visitorId", data.id);
      }
    })
    .catch((err) => console.error("❌ Visitor tracking failed:", err));
}
