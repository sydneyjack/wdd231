const spotlightContainer = document.querySelector("#spotlight-container");

async function getSpotlights() {

    const response = await fetch("data/members.json");
    const members = await response.json();

    const premiumMembers = members.filter(member =>
        member.membership === 2 || member.membership === 3
    );

    shuffle(premiumMembers);

    const selected = premiumMembers.slice(0, 3);

    displaySpotlights(selected);
}

function displaySpotlights(members) {

    spotlightContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <a href="${member.website}" target="_blank">
                Visit Website
            </a>

            <p>${
                member.membership === 3
                    ? "Gold Member"
                    : "Silver Member"
            }</p>
        `;

        spotlightContainer.appendChild(card);

    });

}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

}

getSpotlights();