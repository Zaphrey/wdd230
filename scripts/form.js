const passwordField1 = document.querySelector("#password1");
const passwordField2 = document.querySelector("#password2");
const invalidAlert = document.querySelector("#invalid-password");
const pageRating = document.querySelector("#rating");
const ratingDisplay = document.querySelector("#rating-display");

passwordField2.addEventListener("focusout", checkSame);
pageRating.addEventListener("input", updatePageRating);
pageRating.addEventListener("change", updatePageRating)

function checkSame() {
    if (passwordField1.value != passwordField2.value) {
        invalidAlert.textContent = "Passwords do not match. Please try again.";
        passwordField2.style.backgroundColor = "#fff0f3";
        console.log(passwordField1.value);
        console.log(passwordField2.value)
    }
    else {
        invalidAlert.textContent = "";
        passwordField2.style.backgroundColor = "#fff";
    }
}

function updatePageRating() {
    ratingDisplay.textContent = pageRating.value;
}