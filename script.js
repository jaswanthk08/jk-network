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

const previewIcon = document.getElementById("preview-icon");
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
    GET CLEAN DOMAIN NAME
==================================*/
function getDomain(link) {
    try {
        return new URL(link).hostname.replace("www.", "");
    } catch {
        return "Unknown";
    }
}


/* ================================
    LOAD FAVICON (TRANSPARENT IF POSSIBLE)
==================================*/
function loadFavicon(domain) {
    if (!previewIcon) return;

    const iconURL = `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

    previewIcon.src = iconURL;
    previewIcon.style.display = "block";
}


/* ================================
    SHOW PREVIEW BOX
==================================*/
function showPreview() {
    const domain = getDomain(url);

    previewDomain.textContent = domain;
    loadFavicon(domain);

    // Always show main branding box
    centerBox.style.display = "block";

    // Show preview modal
    previewBox.classList.remove("hidden");
}


/* ================================
    COUNTDOWN START (AUTO MODE)
==================================*/
function startCountdown() {

    let count = 3;

    // Initial print
    countdownEl.innerHTML = `
        <div>Opening JK Networks Secure Gateway</div>
        <div style="margin-top:6px;">Launching in ${count}…</div>
    `;

    const timer = setInterval(() => {
        count--;

        countdownEl.innerHTML = `
            <div>Opening JK Networks Secure Gateway</div>
            <div style="margin-top:6px;">Launching in ${count}…</div>
        `;

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


/* -------- AUTO MODE -------- */
else if (mode === "auto") {

    continueBtn.style.display = "none"; // hide button
    button.style.display = "none";      // hide old click btn

    showPreview();

    setTimeout(() => {
        startCountdown();
    }, 1200);
}


/* -------- BUTTON MODE -------- */
else if (mode === "button") {

    button.style.display = "none"; 
    showPreview();

    continueBtn.onclick = () => {
        window.location.href = url;
    };
}
