const activityNav = document.getElementById("activity-nav");
const baseLink = "https://zaphrey.github.io/wdd230/";
const linksUrl = "https://zaphrey.github.io/wdd230/data/links.json";

const getLinks = async (url) => {
    let response = await fetch(url);

    if (response.ok) {
        let data = await response.json();
        displayLinks(data.lessons);
    }
}

const displayLinks = (lessons) => {
    lessons.forEach(lessonData => {
        let li = document.createElement("li");
        li.textContent = `${lessonData.lesson}: `;

        lessonData.links.forEach((link, index) => {
            let anchor = document.createElement("a");
            anchor.setAttribute("href", link.url);
            anchor.textContent = link.title;

            li.appendChild(anchor);

            if (index + 1 < lessonData.links.length) {
                li.innerHTML = `${li.innerHTML} | `;
            }
        })

        activityNav.appendChild(li);
    })
}

getLinks(linksUrl);