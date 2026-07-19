const weatherURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=4.8156&lon=7.0498&units=metric&appid=6e76fa2678835a850156d56037568c99";

const spotlightURL = "data/members.json";

const currentWeather = document.querySelector("#current-weather");
const forecast = document.querySelector("#forecast");
const spotlightContainer = document.querySelector("#spotlights");

/* ===========================
   Weather
=========================== */

async function getWeather() {
    try {
        const response = await fetch(weatherURL);

        if (!response.ok) throw new Error("Weather data not found.");

        const data = await response.json();

        displayWeather(data);

    } catch (error) {
        console.error(error);
    }
}

function displayWeather(data) {

    const current = data.list[0];

    currentWeather.innerHTML = `
        <p><strong>${Math.round(current.main.temp)}°C</strong></p>
        <p>${current.weather[0].description}</p>
    `;

    forecast.innerHTML = "";

    const noonForecasts = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    noonForecasts.slice(0, 3).forEach(day => {

        const date = new Date(day.dt_txt);

        const card = document.createElement("div");

        card.innerHTML = `
            <strong>${date.toLocaleDateString("en-US",{weekday:"short"})}</strong>
            <p>${Math.round(day.main.temp)}°C</p>
        `;

        forecast.appendChild(card);

    });

}

/* ===========================
   Spotlights
=========================== */

async function getSpotlights() {

    try {

        const response = await fetch(spotlightURL);

        if (!response.ok) throw new Error("Member data not found.");

        const members = await response.json();

        displaySpotlights(members);

    } catch (error) {

        console.error(error);

    }

}

function displaySpotlights(members) {

    const qualified = members.filter(member =>
        member.membership >= 2
    );

    qualified.sort(() => Math.random() - 0.5);

    const selected = qualified.slice(0, 3);

    spotlightContainer.innerHTML = "";

    selected.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight");

        card.innerHTML = `
            <h2>${member.name}</h2>

            <img src="images/${member.image}"
                 alt="${member.name} Logo"
                 loading="lazy">

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p>
                <a href="${member.website}"
                   target="_blank">
                   Visit Website
                </a>
            </p>

            <p>
                ${
                    member.membership === 3
                    ? "Gold Member"
                    : "Silver Member"
                }
            </p>
        `;

        spotlightContainer.appendChild(card);

    });

}

getWeather();

getSpotlights();