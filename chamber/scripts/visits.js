const welcomeMessage = document.querySelector("#welcome-message");

let lastVisitedKey = "last-visited-ls";
let lastVisited = Number(window.localStorage.getItem(lastVisitedKey)) || 0;

if (lastVisited !== 0) {
    let currentDate = new Date();
    let lastDate = new Date(lastVisited);
    let daysBetween = (currentDate - lastDate) / (1000 * 60 * 60 * 24);

    if (daysBetween >= 1) {
        welcomeMessage.textContent = `You last visited ${Math.floor(daysBetween)} days ago.`;
    }
    else {
        welcomeMessage.textContent = "Back so soon! Awesome!";
    }
}
else {
    welcomeMessage.textContent = "Welcome! Let us know if you have any questions.";
}

window.localStorage.setItem(lastVisitedKey, Date.now());