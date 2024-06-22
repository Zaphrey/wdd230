const directoryContainer = document.getElementById("directory-cards");
const mainURL = "https://zaphrey.github.io/wdd230/chamber/";
const dataUrl = "https://zaphrey.github.io/wdd230/chamber/data/members.json";

const getMembers = async (url) => {
    let response = await fetch(url)

    if (response.ok) {
        let members = await response.json;
        populateDirectory(members);
    }
}

const populateDirectory = (members) => {
    members.forEach(member => {
        let card = document.createElement("div");
        let icon = document.createElement("img");
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let contact = document.createElement("p");
        let url = document.createElement("a");
        let membership = document.createElement("p");

        // Icon:
        icon.setAttribute("src", member.url);
        icon.setAttribute("width", 100);
        icon.setAttribute("height", 50);
        card.appendChild(icon);

        name.textContent = member.name;
        card.appendChild(name);

        address.textContent = member.address;
        card.appendChild(address);

        url.setAttribute("href", member.url);
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

        membership.textContent = member.membership;
        card.appendChild(membership);
    });
}

getMembers(dataUrl);