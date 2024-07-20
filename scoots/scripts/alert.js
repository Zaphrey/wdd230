const alert = document.querySelector("#heat-advisory");
const button = alert.querySelector("button");

button.addEventListener("click", () => {
    document.querySelector("#advisory-container").removeChild(alert);
})