let banner = document.querySelector("#banner");
let button = banner.querySelector("button");
let currentDay = new Date().getDay();

function hideBanner() {
    banner.classList.add("hidden");
}

if (currentDay === 1 | currentDay === 2 | currentDay === 3) {
    button.addEventListener("click", hideBanner);
}
else {
    hideBanner();
}