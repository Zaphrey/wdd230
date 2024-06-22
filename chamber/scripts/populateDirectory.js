const directoryContainer = document.getElementById("directory-cards");
const mainURL = "https://zaphrey.github.io/wdd230/chamber/";
const dataUrl = "https://zaphrey.github.io/wdd230/chamber/data/members.json";

const getMembers = async (url) => {
    let response = await fetch(url)

    if (response.ok) {
        let members = await response.json();
        populateDirectory(members.companies);
    }
}

const populateDirectory = (members) => {
    members.forEach((member, index) => {
        buildCompanyCard(member, index)
    });
}

const buildCompanyCard = (member, index = 0) => {
    let card = document.createElement("div");
    let icon = document.createElement("img");
    let name = document.createElement("h2");
    let address = document.createElement("p");
    let contact = document.createElement("p");
    let url = document.createElement("a");
    let membership = document.createElement("p");

    // Icon:
    icon.setAttribute("src", member.icon);
    icon.setAttribute("alt", `${member.name} logo`);
    icon.setAttribute("width", 150);
    icon.setAttribute("height", 100);

    // Apply lazy loading to images with an order greater than 3:
    if (index > 3) {
        icon.setAttribute("loading", "lazy");
    }

    card.appendChild(icon);

    name.textContent = member.name;
    card.appendChild(name);

    address.textContent = member.address;
    card.appendChild(address);

    url.setAttribute("href", member.url);
    url.textContent = member.url;
    card.appendChild(url);

    // If phone number isn't found, load email in instead.
    // Not all objects have an email associated with them,
    // so make sure that the ones without numbers have emails.
    if (member.phone !== "") {
        contact.textContent = member.phone;
    }
    else {
        contact.textContent = member.email;
    }

    card.appendChild(contact);

    membership.textContent = `Status: ${member.membership}`;
    card.appendChild(membership);

    card.classList.toggle("directory-card")
    directoryContainer.appendChild(card);
}

getMembers(dataUrl);