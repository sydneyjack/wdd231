const apiKey = "6e76fa2678835a850156d56037568c99";
const lat = 4.8156;
const lon = 7.0498;

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Weather data not available");

        const data = await response.json();

        displayCurrentWeather(data);
        displayForecast(data);

    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {

    const current = data.list[0];

    document.querySelector("#current-weather").innerHTML = `
        <p><strong>${Math.round(current.main.temp)}°C</strong></p>
        <p>${current.weather[0].description}</p>
    `;
}

function displayForecast(data) {

    const forecast = document.querySelector("#forecast");
    forecast.innerHTML = "<h3>3-Day Forecast</h3>";

    const days = [8, 16, 24];

    days.forEach(index => {

        const item = data.list[index];

        if (item) {

            const date = new Date(item.dt_txt);

            forecast.innerHTML += `
                <p>
                    ${date.toLocaleDateString("en-US", {
                        weekday: "short"
                    })}: ${Math.round(item.main.temp)}°C
                </p>
            `;
        }
    });
}

getWeather();