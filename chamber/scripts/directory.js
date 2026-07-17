const url = "data/members.json";
const cards = document.querySelector("#members");

async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        displayMembers(data.members);

    } catch (error) {
        console.error("Unable to fetch member data:", error);
    }
}

function displayMembers(members) {

    cards.innerHTML = "";

    members.forEach(member => {

        const section = document.createElement("section");

        const image = document.createElement("img");
        const name = document.createElement("h2");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const website = document.createElement("a");
        const level = document.createElement("p");

        image.src = `images/${member.image}`;
        image.alt = member.name;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        name.textContent = member.name;

        address.textContent = member.address;

        phone.textContent = member.phone;

        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";

        let membership = "";

        switch (member.membership) {

            case 1:
                membership = "Member";
                break;

            case 2:
                membership = "Silver Member";
                break;

            case 3:
                membership = "Gold Member";
                break;
        }

        level.textContent = membership;

        section.appendChild(image);
        section.appendChild(name);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(website);
        section.appendChild(level);

        cards.appendChild(section);

    });

}

getMembers();

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

gridButton.addEventListener("click", () => {

    cards.classList.add("grid");
    cards.classList.remove("list");

});

listButton.addEventListener("click", () => {

    cards.classList.add("list");
    cards.classList.remove("grid");

});