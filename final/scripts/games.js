const gamesContainer = document.getElementById('games-container');
const genreSelect = document.getElementById('filter-genre');
const platformSelect = document.getElementById('filter-platform');
const ratingSelect = document.getElementById('filter-rating');
const difficultySelect = document.getElementById('filter-difficulty');
const sortSelect = document.getElementById('sort-year');

let gamesData = [];


async function fetchGames() {
    try {
        const response = await fetch('data/games.json');
        if (!response.ok) throw new Error('Failed to load JSON');
        const data = await response.json();
        gamesData = data;
        populateFilters();
        renderGames(gamesData);
    } catch (error) {
        console.error('Error fetching games:', error);
        gamesContainer.innerHTML = '<p>Failed to load games.</p>';
    }
}


function populateFilters() {
    const genres = new Set();
    const platforms = new Set();

    gamesData.forEach(game => {
        genres.add(game.genre);
        game.platform.forEach(p => platforms.add(p));
    });

    genres.forEach(g => {
        const option = document.createElement('option');
        option.value = g;
        option.textContent = g;
        genreSelect.appendChild(option);
    });

    platforms.forEach(p => {
        const option = document.createElement('option');
        option.value = p;
        option.textContent = p;
        platformSelect.appendChild(option);
    });
}


function renderGames(list) {
    gamesContainer.innerHTML = '';

    if (list.length === 0) {
        gamesContainer.innerHTML = '<p>No games match the filters.</p>';
        return;
    }

    list.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('game-card');
        card.innerHTML = `
            <h3>${game.title}</h3>
            <p><strong>Genre:</strong> ${game.genre}</p>
            <p><strong>Platform:</strong> ${game.platform.join(', ')}</p>
            <p><strong>Difficulty:</strong> ${game.difficulty}</p>
            <p><strong>Rating:</strong> ${game.rating}</p>
            <p><strong>Release Year:</strong> ${game.releaseYear}</p>
            <a href="${game.link}" target="_blank">More Info</a>
        `;
        gamesContainer.appendChild(card);
    });
}


function applyFilters() {
    let filtered = [...gamesData];

    const genre = genreSelect.value;
    const platform = platformSelect.value;
    const rating = ratingSelect.value;
    const difficulty = difficultySelect.value;
    const sort = sortSelect.value;

    if (genre !== 'all') filtered = filtered.filter(g => g.genre === genre);
    if (platform !== 'all') filtered = filtered.filter(g => g.platform.includes(platform));
    if (rating !== 'all') filtered = filtered.filter(g => g.rating === rating);
    if (difficulty !== 'all') filtered = filtered.filter(g => g.difficulty === difficulty);

    filtered.sort((a, b) => sort === 'asc' ? a.releaseYear - b.releaseYear : b.releaseYear - a.releaseYear);

    renderGames(filtered);
}


[genreSelect, platformSelect, ratingSelect, difficultySelect, sortSelect].forEach(select => {
    select.addEventListener('change', applyFilters);
});


fetchGames();
