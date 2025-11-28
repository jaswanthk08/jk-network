/* ================================
    GET URL PARAMETERS
==================================*/
const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode");
let url = urlParams.get("url");

const title = document.getElementById("title");
const button = document.getElementById("redirectBtn");
const countdownEl = document.getElementById("countdown");

const previewBox = document.getElementById("preview-box");
const previewDomain = document.getElementById("preview-domain");
const continueBtn = document.getElementById("continueBtn");

const centerBox = document.querySelector(".center-box");

/* ================================
    FLOATING PARTICLES GENERATOR
==================================*/
function createParticles() {
    const container = document.getElementById("particles-container");
    for (let i = 0; i < 35; i++) {
        let particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.top = Math.random() * 100 + "%";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = (3 + Math.random() * 4) + "s";
        particle.style.animationDelay = Math.random() * 3 + "s";
        container.appendChild(particle);
    }
}
createParticles();

/* ================================
    EXTRACT CLEAN DOMAIN NAME
==================================*/
function getDomain(link) {
    try {
        let domain = new URL(link).hostname.replace("www.", "");
        return domain;
    } catch {
        return "Unknown";
    }
}

/* ================================
    SHOW PREVIEW SCREEN
==================================*/
function showPreview() {
    previewDomain.textContent = getDomain(url);

    // Hide main UI
    centerBox.style.display = "none";

    // Show preview box
    previewBox.classList.remove("hidden");
}

/* ================================
    START COUNTDOWN
==================================*/
function startCountdown() {
    previewBox.classList.add("hidden");  
    centerBox.style.display = "block";  

    let count = 3;
    countdownEl.innerText = `Redirecting in ${count}...`;

    let timer = setInterval(() => {
        count--;
        countdownEl.innerText = `Redirecting in ${count}...`;

        if (count === 0) {
            clearInterval(timer);
            window.location.href = url;
        }
    }, 1000);
}

/* ================================
    MAIN LOGIC
==================================*/

title.innerText = "JK Networks";

if (!url) {
    title.innerText = "Error: No link provided!";
    button.style.display = "none";
}

/* AUTO MODE → Skip Preview → Direct Countdown */
else if (mode === "auto") {
    button.style.display = "none";
    showPreview();

    // Auto press continue after 1.2 sec
    setTimeout(() => {
        startCountdown();
    }, 1200);
}

/* BUTTON MODE → Show preview → User clicks continue */
else if (mode === "button") {
    button.style.display = "none"; // hide old button
    showPreview();

    continueBtn.onclick = () => {
        startCountdown();
    };
}
