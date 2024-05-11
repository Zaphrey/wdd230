// Used this resource to figure out how to convert rgb color spaces to hex color spaces:
// https://learnersbucket.com/examples/interview/convert-rgb-to-hex-color-in-javascript/

const getRGBValuesFromString = (s) => {
    let matches = s.match(/\d+/g);
    return [parseInt(matches[0]), parseInt(matches[1]), parseInt(matches[2])];
}

const convertToHex = (c) => {
    let hex = c.toString(16);
    return hex.Length == 1 ? "0" + hex : hex;
}

const rgbToHex = (r, g, b) => {
    return `#${convertToHex(r).toUpperCase()}${convertToHex(g).toUpperCase()}${convertToHex(b).toUpperCase()}`;
}

const colorContainerHolder = document.querySelector("#color-containers");

colorContainerHolder.childNodes.forEach(child => {
    if (child.nodeName == "DIV") {
        let color = window.getComputedStyle(child).backgroundColor;
        let rgb = getRGBValuesFromString(color);

        child.textContent = `${child.textContent}: ${rgbToHex(rgb[0], rgb[1], rgb[2])}`;
        child.style.color = rgbToHex(255 - rgb[0], 255 - rgb[1], 255 - rgb[2]);
    }
})