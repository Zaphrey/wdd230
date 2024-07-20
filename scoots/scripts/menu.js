const menuButton = document.querySelector("#menu-button");
const menuButtonImg = menuButton.querySelector("img");

let isNavHidden = false;

function toggleNav() {
    let navElements = document.querySelectorAll("nav>a");
    isNavHidden = !isNavHidden;

    let src = isNavHidden ? "images/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg" : "images/close_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
    menuButtonImg.setAttribute("src", src);

    navElements.forEach(element => {
        if (isNavHidden) {
            element.classList.add("hidden");
        }
        else {
            element.classList.remove("hidden");
        }
    });
}

menuButton.addEventListener("click", toggleNav);
toggleNav();