const featuredContainer = document.querySelector("#featured-games");

async function loadFeaturedGames() {
    try {
        const response = await fetch("data/games.json");
        const games = await response.json();

        // Pick 4 featured games (you can tweak this later)
        const featuredGames = games.slice(0, 4);

        featuredGames.forEach(game => {
            const card = document.createElement("div");
            card.classList.add("game-card");

            card.innerHTML = `
                <h3>${game.title}</h3>
                <p><strong>Genre:</strong> ${game.genre}</p>
                <p><strong>Platform:</strong> ${game.platform}</p>
                <p><strong>Difficulty:</strong> ${game.difficulty}</p>
                <p><strong>Rating:</strong> ${game.esrb}</p>
                <a href="${game.link}" target="_blank" rel="noopener noreferrer">
                    Visit Game Site
                </a>
            `;

            featuredContainer.appendChild(card);
        });
    } catch (error) {
        featuredContainer.innerHTML =
            "<p>Featured games could not be loaded.</p>";
        console.error(error);
    }
}

if (featuredContainer) {
    loadFeaturedGames();
}
