const root = document.querySelector(":root");
const darkModeButton = document.querySelector("#dark-mode-button"); const body = document.querySelector("body");
const navA = document.querySelector("nav").querySelectorAll("a");
const h1 = document.querySelector("h1");

darkModeButton.addEventListener("click", () => {
    root.classList.toggle("dark");

    body.querySelectorAll("*").forEach(element => {
        element.classList.toggle("dark")
    })
})