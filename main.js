const pokedexContainer = document.getElementById('pokedex');

// List of first 10 pokemon to preload
const starterList = [
    "bulbasaur",
    "charmander",
    "squirtle",
    "pikachu",
    "azumarill",
    "ursaluna",
    "garchomp",
    "gardevoir",
    "lucario",
    "greninja"
];

async function fetchAndRender(name) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = await res.json();
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
            <h3>${pokemon.name.toUpperCase()}</h3>
            <p>${pokemon.types.map(t => t.type.name).join(' / ')}</p>
            <a href="pokemon.html?id=${pokemon.name}" class="details-link">View Details</a>
        `;
        pokedexContainer.appendChild(card);
    }
    
    catch (error) {
        console.error(`Failed to fetch ${name}:`, error);
    }
}

// Load starter pokemon on page load
starterList.forEach(name => fetchAndRender(name));