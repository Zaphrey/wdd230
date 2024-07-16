const rentalGallery = document.querySelector("#rental-gallery");
const rentalNext = rentalGallery.querySelector("#next");
const rentalPrev = rentalGallery.querySelector("#prev");
const url = "https://zaphrey.github.io/wdd230/scoots/data/rentals.json";

async function fetchData(url) {
    let request = await fetch(url);
    try {
        if (request.ok) {
            let data = await request.json();
            populateSlides(data);
        }
    }
    catch (error) {
        console.log(error);
    }
}

function createSlide(imageUrl) {
    let img = document.createElement("img");
    img.setAttribute("src", imageUrl);
    img.classList.add("slide");

    rentalGallery.appendChild(img);
}

function populateSlides(data) {
    data.rentals.forEach(obj => {
        createSlide(obj.url);
    })
}

fetchData(url);
