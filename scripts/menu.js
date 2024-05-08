const hamburgerElement = document.querySelector("#hamburger-button");
const navigatorElement = document.querySelector(".navigation");

hamburgerElement.addEventListener("click", () => {
    hamburgerElement.classList.toggle("closed");
    navigatorElement.classList.toggle("closed");
});