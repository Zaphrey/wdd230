function updateFooterTime() {
    let footerTimeContent = `Last Modified: ${document.lastModified}`

    document.querySelector("#footer-name").innerHTML = `&copy${(new Date()).getFullYear()} Zachary William Humphreys`;
    document.querySelector("#last-modified").innerHTML = footerTimeContent;
}

updateFooterTime();