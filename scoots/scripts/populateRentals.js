const rentalTable = document.querySelector("#rental-table");
const url = "https://zaphrey.github.io/wdd230/scoots/data/rentals.json";

async function fetchData(url) {
    let request = await fetch(url);
    try {
        if (request.ok) {
            let data = await request.json();
            populateTable(data);
        }
    }
    catch (error) {
        console.log(error);
    }
}

function createRentalCell(content, row) {
    let rentalCell = document.createElement("td");
    rentalCell.setAttribute("scope", "row");
    rentalCell.textContent = content;
    row.appendChild(rentalCell);

    return rentalCell
}

function buildTableRow(obj) {
    let row = document.createElement("tr");
    let type = createRentalCell(obj.type, row);
    let max = createRentalCell(obj.maxPersons, row);
    let resHalf = createRentalCell(obj.reservation.halfDay, row);
    let resFull = createRentalCell(obj.reservation.fullDay, row);
    let walkHalf = createRentalCell(obj.walkIn.halfDay, row);
    let walkFull = createRentalCell(obj.walkIn.fullDay, row);

    rentalTable.appendChild(row);
}

function populateTable(data) {
    data.rentals.forEach(obj => {
        buildTableRow(obj)
    });
}

fetchData(url);