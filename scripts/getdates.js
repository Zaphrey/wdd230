function updateFooterTime() {
    let currentDate = new Date();
    let footerInfoContent = `&copy${currentDate.getFullYear()}</br>Zachary William Humphreys</br>Georgia, USA 🇺🇸`;
    let footerTimeContent = `Last Modified: ${document.lastModified}`;

    document.querySelector("#footerInformation").innerHTML = footerInfoContent;
    document.querySelector("#lastModified").innerHTML = footerTimeContent;
}

updateFooterTime();