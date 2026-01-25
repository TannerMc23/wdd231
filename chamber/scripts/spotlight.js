document.addEventListener("DOMContentLoaded", () => {
const spotlightContainer = document.querySelector(".spotlight-cards");

async function loadSpotlights() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();

        const qualified = data.companies.filter(
            member => member.membership_level === 2 || member.membership_level === 3
        );

        const shuffled = qualified.sort(() => 0.5 - Math.random());

        const count = Math.floor(Math.random() * 2) + 2;
        const selected = shuffled.slice(0, count);

        displaySpotlights(selected);
    } catch (error) {
        console.error('Error loading spotlights:', error);
    }
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        card.innerHTML = `
        <img src="images/${member.image_file}" alt="${member.company_name} logo" loading="lazy">
            <div>
                <h4>${member.company_name}</h4>
                <p>${member.company_address}</p>
                <p>${member.phone_number}</p>
                <a href="${member.website_url}" target="_blank">Visit Website</a>
                <p><strong>Membership:</strong> ${member.membership_level === 3 ? 'Gold' : 'Silver'}</p>
            </div>
        `;

        spotlightContainer.appendChild(card);
    });
}

loadSpotlights();
});