const gridToggle = document.getElementById("grid-button");
const columnToggle = document.getElementById("column-button");
const cardContainer = document.getElementById("directory-cards");
const cardDirectory = document.getElementById("directory-card-container");

let gridKey = "use-grid-ls";
let gridEnabled = true;

gridToggle.classList.add("active-button");

const toggleGrid = () => {
    if (!gridEnabled) {
        gridEnabled = true;
        localStorage.setItem(gridKey, "true");

        updateNodes();
    }
}

const toggleColumn = () => {
    if (gridEnabled) {
        gridEnabled = false;
        localStorage.setItem(gridKey, "false");

        updateNodes();
    }
}

const updateNodes = () => {
    gridToggle.classList.toggle("active-button");
    columnToggle.classList.toggle("active-button");
    cardDirectory.classList.toggle("column");

    cardContainer.childNodes.forEach((node, index) => {
        if (index > 0) {
            node.classList.toggle("column");
        }
    });
}

gridToggle.addEventListener("click", toggleGrid);
columnToggle.addEventListener("click", toggleColumn);