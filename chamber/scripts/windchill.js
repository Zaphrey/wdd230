const weatherCards = document.querySelectorAll(".weather-card");

function computeWindChill(airTemp = 40, speed = 4) {
    if (airTemp <= 50 && speed > 3) {
        speed = Math.pow(speed, 0.16);
        return 35.74 + (0.6215 * airTemp) - (35.75 * speed) + (0.4275 * airTemp * speed);
    }
    else {
        return "N/A";
    }
}

weatherCards.forEach(container => {
    let information = container.querySelector(".weather-information");
    let windChill = information.querySelector("div .wind-chill");
    let windSpeed = information.querySelector("div .wind-speed");
    let temp = information.querySelector("div .temp");

    // Leave empty for now, add variables once we pull live weather data later.
    windChill.textContent = `Wind chill: ${computeWindChill().toFixed(0)}F`;
    windSpeed.textContent = "Wind speed: 4mph";
    temp.textContent = "Temp: 40°F";
})