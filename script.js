// Read URL parameters
const params = new URLSearchParams(window.location.search);
const mode = params.get("mode");
const url = params.get("url");

const button = document.querySelector(".redirect-btn");
const title = document.querySelector(".site-title");

// If url is missing
if (!url) {
    title.innerText = "Error: No link provided!";
    button.style.display = "none";
}

// AUTO MODE
else if (mode === "auto") {
    button.style.display = "none"; // Hide button

    let count = 3;
    title.innerText = `Redirecting in ${count}...`;

    const timer = setInterval(() => {
        count--;
        title.innerText = `Redirecting in ${count}...`;

        if (count === 0) {
            clearInterval(timer);
            window.location.href = url;
        }
    }, 1000);
}

// BUTTON MODE
else if (mode === "button") {
    title.innerText = "JK Networks";
    button.innerText = "Click Me"; // Button label
    button.style.display = "inline-block";

    button.onclick = () => {
        window.location.href = url;
    };
}

// Invalid mode
else {
    title.innerText = "Invalid mode!";
    button.style.display = "none";
}
