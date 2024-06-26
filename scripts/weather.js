// API key: 178a77fd063cc258408b5efec1310295
// Macon-Bibb GA geolocation: lat: 32.84, lon: -83.62
const weatherIcon = document.querySelector("#weather-icon");
const weatherDesc = document.querySelector("#weather");

const latitude = 32.84;
const longitude = -83.62;
const units = "imperial";
const key = "d053b06e5e0652fc9d6aaf3121f5c739";

// Construct API url
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`;

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

function displayResults(weatherData) {
    let weatherIconId = weatherData.weather[0].icon;
    let weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconId}.png`;
    let weatherDescription = capitalize(weatherData.weather[0].description);

    weatherIcon.setAttribute("src", weatherIconUrl);
    weatherDesc.innerHTML = `${weatherData.main.temp.toFixed()}<strong>&deg;</strong>F - ${weatherDescription}`
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

apiFetch(url)