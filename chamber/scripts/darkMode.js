const root = document.querySelector(":root");
const darkModeButton = document.querySelector("#dark-mode-button"); const body = document.querySelector("body");
const navA = document.querySelector("nav").querySelectorAll("a");
const h1 = document.querySelector("h1");

const darkModeKey = "is-dark-mode-ls";
let isDark = localStorage.getItem(darkModeKey) === "true";

function toggleDarkMode() {
    root.classList.toggle("dark");

    body.querySelectorAll("*").forEach(element => {
        element.classList.toggle("dark")
    })
}

darkModeButton.addEventListener("click", () => {
    isDark = !isDark;
    localStorage.setItem(darkModeKey, String(isDark));

    toggleDarkMode();
})

if (isDark === true) {
    toggleDarkMode();
}