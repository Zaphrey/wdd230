const weatherCards = document.querySelector("#weather-card-container");
const latitude = 32.84;
const longitude = -83.62;
const units = "imperial";
const key = "d053b06e5e0652fc9d6aaf3121f5c739";

// Construct API url
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`;
const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${key}`;

async function apiFetch(api, current = true) {
    try {
        let response = await fetch(api);

        if (response.ok) {
            let data = await response.json();
            //console.table(data);
            if (current) {
                displayResults(data);
            }
            else if (!current) {
                displayCurrentWeather(data);
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

function computeWindChill(airTemp = 40, speed = 4) {
    if (airTemp <= 50 && speed > 3) {
        speed = Math.pow(speed, 0.16);
        return 35.74 + (0.6215 * airTemp) - (35.75 * speed) + (0.4275 * airTemp * speed);
    }
    else {
        return "N/A";
    }
}

function computeAverageWindValues(data, startIndex) {
    let windSpeed = 0;
    let windChill = 0;
    let increment = 6;
    let windChillIncrement = 0;

    for (let index = startIndex; index < startIndex + increment; index++) {
        windSpeed += data.list[index].wind.speed;

        let chill = computeWindChill(data.list[index].main.temp, data.list[index].wind.speed);

        if (chill !== "N/A") {
            windChill += chill;
            windChillIncrement += 1;
        }
    }

    windSpeed /= increment;

    if (windChill === 0) {
        windChill = "N/A";
    }
    else {
        windChill /= windChillIncrement;

    }

    return { speed: windSpeed.toFixed(1), chill: windChill }
}

function getDailyForecastFromHourly(data) {
    let info = [];
    let currentDate = new Date();

    let tickDivider = (1000 * 60 * 60 * 24);

    data.list.forEach((segment, index) => {
        let segmentDate = new Date(segment.dt_txt);
        let difference = segmentDate - currentDate;
        let dayNum = Math.floor(difference / tickDivider)

        if (info[dayNum] == null) {
            info[dayNum] = {};
        }

        if (info[dayNum].date == null) {
            info[dayNum].date = segmentDate;
        }

        if (info[dayNum].windAverage == null) {
            info[dayNum].windAverage = computeAverageWindValues(data, dayNum)
        }

        if (info[dayNum].icon == null) {
            info[dayNum].icon = getWeatherIcon(segment.weather[0].icon);
        }

        // Initialize high and low values:
        if (info[dayNum].high == null) {
            info[dayNum].high = 0;
        }

        if (info[dayNum].low == null) {
            info[dayNum].low = 1000;
        }

        info[dayNum].high = Math.max(segment.main.temp, info[dayNum].high);
        info[dayNum].low = Math.min(segment.main.temp, info[dayNum].low);
    })

    return info
}

function getWeatherIcon(iconId) {
    return `https://openweathermap.org/img/wn/${iconId}.png`;
}

function displayResults(data) {
    let forecastData = getDailyForecastFromHourly(data)

    for (let index = 1; index < 4; index++) {
        let forecastInfo = forecastData[index];

        let container = document.createElement("div");
        let date = document.createElement("div")
        let high = document.createElement("div");
        let low = document.createElement("div")
        let averageWindSpeed = document.createElement("div");
        let averageWindChill = document.createElement("div");
        let icon = document.createElement("img");

        let dateStr = forecastInfo.date.toLocaleDateString('en-US', { weekday: "long", month: "long", year: "numeric", day: "numeric" });

        container.classList.add("weather-card")
        date.textContent = dateStr;
        high.innerHTML = `High: ${forecastInfo.high.toFixed()}<strong>&deg;</strong>F`;
        low.innerHTML = `Low: ${forecastInfo.low.toFixed()}<strong>&deg;</strong>F`;
        averageWindSpeed.textContent = `Average Wind Speed: ${forecastInfo.windAverage.speed}mph`;
        averageWindChill.textContent = `Average Wind Chill: ${forecastInfo.windAverage.chill}`;

        icon.setAttribute("src", forecastInfo.icon);
        icon.setAttribute("alt", "Weather Icon");

        container.appendChild(date);
        container.appendChild(high);
        container.appendChild(low);
        container.appendChild(averageWindSpeed);
        container.appendChild(averageWindChill);
        container.appendChild(icon);
        weatherCards.appendChild(container);
    }
}

function displayCurrentWeather(data) {
    let container = document.querySelector("#daily-weather-info");
    let infoContainer = document.createElement("div");
    let currentTemp = document.createElement("div");
    let forecastDesc = document.createElement("div");
    let icon = document.createElement("img");

    let description = capitalize(data.weather[0].description);
    let temp = data.main.temp;
    let iconUrl = getWeatherIcon(data.weather[0].icon);

    currentTemp.innerHTML = `Temperature: ${temp.toFixed()}<strong>&deg;</strong>F`;
    forecastDesc.textContent = description;

    icon.setAttribute("src", iconUrl);
    icon.setAttribute("alt", "weather icon");

    infoContainer.classList.add("weather-card");

    infoContainer.appendChild(currentTemp);
    infoContainer.appendChild(forecastDesc);
    infoContainer.appendChild(icon);
    container.appendChild(infoContainer);
}

apiFetch(fiveDayUrl);
apiFetch(currentUrl, false);