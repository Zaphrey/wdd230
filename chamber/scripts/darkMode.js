const root = document.querySelector(":root");
const darkModeButton = document.querySelector("#dark-mode-button"); const body = document.querySelector("body");
const navA = document.querySelector("nav").querySelectorAll("a");
const h1 = document.querySelector("h1");

const darkModeKey = "is-dark-mode-ls";
let isDark = localStorage.getItem(darkModeKey) === "true";

function setDarkMode(setting = "on") {
    if (setting === "on") {
        root.classList.add("dark");

        body.querySelectorAll("*").forEach(element => {
            element.classList.add("dark")
        })
    }
    else if (setting === "off") {
        root.classList.remove("dark");

        body.querySelectorAll("*").forEach(element => {
            element.classList.remove("dark")
        })
    }
}

darkModeButton.addEventListener("click", () => {
    isDark = !isDark;
    localStorage.setItem(darkModeKey, String(isDark));

    setDarkMode(isDark ? "on" : "off");
})

if (isDark === true) {
    setDarkMode("on");
}