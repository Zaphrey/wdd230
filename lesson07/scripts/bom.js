const input = document.querySelector("input");
const button = document.querySelector("button");
const list = document.querySelector("ul");

let chaptersArray = getChapterList() || [];

function displayList(item) {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");

    li.textContent = item;
    deleteButton.textContent = "❌";
    deleteButton.ariaLabel = `Remove ${item}`;

    li.appendChild(deleteButton);
    list.appendChild(li);

    deleteButton.addEventListener("click", () => {
        list.removeChild(li);
        deleteChapter(li.textContent);
        input.focus();
    });
}

function setChapterList() {
    window.localStorage.setItem("FavBOM-ls", JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(window.localStorage.getItem("FavBOM-ls"));
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length - 1);
    chaptersArray = chaptersArray.filter(item => item !== chapter);
    setChapterList();
}

chaptersArray.forEach(chapter => {
    displayList(chapter);
});

button.addEventListener("click", () => {
    if (input.value != "") {
        displayList(input.value);
        chaptersArray.push(input.value);
        setChapterList();
        input.value = "";
        input.focus();
    }
    else {
        input.focus();
    }
});
