
const latitude = 20.513;
const longitude = -86.943;
const units = "imperial";
const key = "d053b06e5e0652fc9d6aaf3121f5c739";

// Construct API url
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`;
const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`;

async function weatherApiFetch(api, current = true) {
    try {
        let response = await fetch(api);

        if (response.ok) {
            let data = await response.json();
            //console.table(data);
            if (current) {
                displayResults(data);
            }
            else if (!current) {
                buildWeather(data);
            }
            else {
                return data;
            }
        }
        else {
            throw Error(await response.text());
        }
    }
    catch (error) {
        console.log(error);
    }
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

function getWeatherIcon(iconId) {
    return `https://openweathermap.org/img/wn/${iconId}.png`;
}

function buildWeatherRow(object) {
    let weatherDesc = document.querySelector("#weather-desc");
    let container = document.createElement("div");
    container.classList.add("weather-desc-item");

    let img = document.createElement("img");
    img.setAttribute("src", getWeatherIcon(object.icon));
    img.setAttribute("alt", "weather icon");
    img.setAttribute("height", "32");
    img.setAttribute("width", "32");

    let span = document.createElement("span");
    span.textContent = capitalize(object.description);

    container.appendChild(img);
    container.appendChild(span);
    weatherDesc.appendChild(container);
    //console.log(object)
}

function displayResults(data) {
    document.querySelector("#alert-temp").textContent = data.main.temp_max.toFixed(0);
    document.querySelector("#humidity").textContent = data.main.humidity;
    document.querySelector("#temperature").textContent = data.main.temp.toFixed(0);
    //console.table(data);

    data.weather.forEach(buildWeatherRow)
}

function buildWeather(data) {
    let tickDivider = (1000 * 60 * 60 * 24);
    let currentDate = new Date()
    let currentDay = currentDate.getDay()
    let tempMax = 0
    for (object of data.list) {
        let date = new Date(object.dt * 1000)
        if (date.getDay() != currentDay) {
            let newDate = new Date(object.dt_txt)
            let formattedTime = `${newDate.getHours().toString().padStart(2, "0")}:${newDate.getMinutes().toString().padStart(2, "0")}`;
            if (formattedTime === "15:00") {
                tempMax = object.main.temp_max;
                break
            }
        }
    }
    document.querySelector("#next-temp").textContent = tempMax.toFixed();
}

weatherApiFetch(fiveDayUrl, false);
weatherApiFetch(currentUrl, true);