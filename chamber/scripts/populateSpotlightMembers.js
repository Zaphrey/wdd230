const memberCardContainer = document.querySelector("#member-card-container");
const memberUrl = "https://zaphrey.github.io/wdd230/chamber/data/members.json";

async function fetchMembers(memberUrl) {
    let response = await fetch(memberUrl);

    if (response.ok) {
        let data = await response.json();
        buildSpotlightCards(data.companies);
    }
}

function buildSpotlightCards(cardData) {
    // Sort out members by subscription status:
    let members = [
        cardData.filter(card => card.membership === "Gold"),
        cardData.filter(card => card.membership === "Silver")
    ]

    let addedObjects = [];

    // Build a card for the first member of each membership
    let addedMembers = 0
    while (addedMembers < 2) {
        let randomStatusIndex = getRandom(members);
        let randomCard = getRandom(randomStatusIndex);

        if (!addedObjects.includes(randomCard)) {
            addedObjects.push(randomCard);
            buildCard(randomCard);

            addedMembers++;
        }
    }
}

function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function buildCard(cardData) {
    let memberCard = document.createElement("div");
    memberCard.classList.add("card");
    memberCard.classList.add("member-card");

    let companyLogo = document.createElement("img");
    companyLogo.setAttribute("src", cardData.icon);
    companyLogo.setAttribute("alt", `${cardData.name} logo`);
    companyLogo.setAttribute("loading", "lazy");

    let companyName = document.createElement("p");
    companyName.innerText = cardData.name;

    let membershipStatus = document.createElement("p");
    membershipStatus.innerText = cardData.membership;

    if (isDark) {
        memberCard.classList.add("dark");
        companyLogo.classList.add("dark");
        companyName.classList.add("dark");
        membershipStatus.classList.add("dark");
    }

    memberCard.appendChild(companyLogo);
    memberCard.appendChild(companyName);
    memberCard.appendChild(membershipStatus);

    memberCardContainer.appendChild(memberCard);
}

fetchMembers(memberUrl);