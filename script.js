const urlParams = new URLSearchParams(window.location.search);
const mode = urlParams.get("mode");
let url = urlParams.get("url");

const title = document.getElementById("title");
const button = document.getElementById("redirectBtn");
const countdownEl = document.getElementById("countdown");

// Default
title.innerText = "JK Networks";

if (!url) {
    title.innerText = "Error: No link provided!";
    button.style.display = "none";
} 

// AUTO MODE
else if (mode === "auto") {
    title.innerText = "JK Networks";

    button.style.display = "none";

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

// BUTTON MODE
else if (mode === "button") {
    title.innerText = "JK Networks";

    button.style.display = "inline-block";
    countdownEl.innerText = "";

    button.onclick = () => {
        window.location.href = url;
    };
}
