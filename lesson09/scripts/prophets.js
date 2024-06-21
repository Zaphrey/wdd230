const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");

const getProphetData = async () => {
    let response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        displayProphets(data.prophets);
    }
}

const buildProphetCard = (prophet) => {
    let section = document.createElement("section");
    let fullName = document.createElement("h2");
    let dateOfBirth = document.createElement("p");
    let birthLocation = document.createElement("p");
    let portrait = document.createElement("img");

    section.classList.toggle("prophet-card");
    dateOfBirth.classList.toggle("date-of-birth");
    birthLocation.classList.toggle("birth-location");

    let prophetName = `${prophet.name} ${prophet.lastname}`;

    fullName.textContent = prophetName;
    dateOfBirth.textContent = `Date of birth: ${prophet.birthdate}`;
    birthLocation.textContent = `Place of birth: ${prophet.birthplace}`;

    portrait.setAttribute("src", prophet.imageurl)
    portrait.setAttribute("alt", `A portrait of prophet ${prophetName}`)
    portrait.setAttribute("loading", "lazy")
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440")

    section.appendChild(fullName);
    section.appendChild(dateOfBirth);
    section.appendChild(birthLocation);
    section.appendChild(portrait);
    cards.appendChild(section);
}

const displayProphets = (prophets) => {
    prophets.forEach(prophet => {
        buildProphetCard(prophet)
    })
}

getProphetData()