const hamburgerButton = document.querySelector("#menu-button");
const menuItems = document.querySelector("nav")

hamburgerButton.addEventListener("click", () => {
    menuItems.classList.toggle("open");
    hamburgerButton.classList.toggle("open");
});