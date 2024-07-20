const rentalGallery = document.querySelector("#rental-gallery");
const rentalNext = rentalGallery.querySelector("#next");
const rentalPrev = rentalGallery.querySelector("#prev");
const rentalUrl = "https://zaphrey.github.io/wdd230/scoots/data/rentals.json";

let slides = [];

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

function createSlide(imageUrl, caption) {
    let container = document.createElement("div");
    container.classList.add("slide");

    let img = document.createElement("img");
    img.setAttribute("src", imageUrl);
    img.setAttribute("height", "500")

    let imgCaption = document.createElement("div");
    imgCaption.classList.add("caption");
    imgCaption.textContent = caption;

    if (slides.length === 0) {
        container.classList.add("active");
    }

    slides.push(container);

    container.appendChild(img);
    container.appendChild(imgCaption);
    rentalGallery.appendChild(container);
}

function populateSlides(data) {
    data.rentals.forEach(obj => {
        createSlide(obj.url, obj.type);
    })
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function incrementActiveSlide(increment) {
    // Find first active slide element:
    let slideLength = slides.length;
    let currentSlideIdx = slides.findIndex(element => element.classList.contains("active")) | 0;
    let newSlideIdx = mod(currentSlideIdx + increment, slideLength);

    slides[currentSlideIdx].classList.remove("active");
    slides[newSlideIdx].classList.add("active");
}

rentalNext.addEventListener("click", () => incrementActiveSlide(1));
rentalPrev.addEventListener("click", () => incrementActiveSlide(-1));

fetchData(rentalUrl);
