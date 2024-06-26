// API key: 178a77fd063cc258408b5efec1310295
// Trier, Germany geocoordinates: longitude: 49.75 latitude: 6.63
const currentTemp = document.querySelector("#current-temp");
const main = document.querySelector("div");

const latitude = 49.75;
const longitude = 6.63;
const units = "imperial";
const key = "d053b06e5e0652fc9d6aaf3121f5c739";

// Construct API url
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`;
console.log(url);

async function apiFetch(api) {
    try {
        let response = await fetch(api);

        if (response.ok) {
            let data = await response.json();
            //console.table(data);
            displayResults(data);
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
}

function displayResults(forecastData) {
    // Create new elements to display the weather versus grabbing them from the document:

    let weather = forecastData.weather;
    let temperature = forecastData.main.temp;

    currentTemp.textContent = `${temperature.toFixed()}°F`;

    weather.forEach(event => {
        let figure = document.createElement("figure");
        let caption = document.createElement("figcaption");
        let weatherIcon = document.createElement("img");

        let description = capitalize(event.description);
        let iconSource = `https://openweathermap.org/img/wn/${event.icon}.png`;

        weatherIcon.setAttribute("src", iconSource);
        caption.textContent = description

        figure.appendChild(weatherIcon);
        figure.appendChild(caption);

        main.appendChild(figure);
    })
}

function capitalize(str) {
    let words = str.split(" ");
    let capitalizedWord = "";

    words.forEach((word) => {
        capitalizedWord = `${capitalizedWord} ${word[0].toUpperCase()}${word.substring(1)}`;
    })

    capitalizedWord.trimStart();

    return capitalizedWord;
}

apiFetch(url);