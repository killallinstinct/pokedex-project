import { typeColors } from "./typeColors.js";

const searchBar = document.getElementById('search-bar');
const suggestionsContainer = document.getElementById('suggestions');
const pokedexContainer = document.getElementById('pokedex');

let allPokemonData = [];    // store list of all pokemon names and urls
let pokemonCache = {};      // cache full details: {name: data}

// Debounce helper
function debounce(func, delay = 300) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Fetch all pokemon names + url at once
async function fetchAllPokemonNames() {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
    const data = await res.json();
    allPokemonData = data.results;
}

// Fetch full Pokemon data
async function fetchPokemonDetails(name) {
    if (pokemonCache[name]) {
        return pokemonCache[name];
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemon = await res.json();

    // Fetch species separately
    const speciesName = name.includes('-') ? name.split('-')[0] : name;
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${speciesName}`);
    const species = await speciesRes.json();

    // Correctly find the real national dex number for formes
    const nationalDexEntry = species.pokedex_numbers.find(
        entry => entry.pokedex.name === "national"
    );
    const nationalDexNumber = nationalDexEntry ? nationalDexEntry.entry_number : pokemon.id;

    pokemonCache[name] = { ...pokemon, nationalDexNumber};
    return pokemonCache[name];
}

// Live search
const handleSearch = debounce(async () => {
    const query = searchBar.value.toLowerCase();

    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    if (query.length === 0) {
        return;
    }

    const matches = allPokemonData.filter(p => p.name.startsWith(query)).slice(0, 10);

    if (matches.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = 'no-results';
        noResult.textContent = 'No Pokemon found.';
        suggestionsContainer.appendChild(noResult);
        return;
    }

    for (const match of matches) {
        const pokemon = await fetchPokemonDetails(match.name);

        const link = document.createElement('a');
        link.href = `pokemon.html?id=${pokemon.name}`;
        link.className = 'suggestion-link';
        link.innerHTML = `
            <div class="suggestion">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}" class="suggestion-sprite">
                <span class="dex-number">#${pokemon.nationalDexNumber.toString().padStart(4, '0')}</span>
                <span class="name">${pokemon.name.toUpperCase()}</span>
            </div>
        `;

        suggestionsContainer.appendChild(link);
    }
}, 300);

// Show suggestions while typing
searchBar.addEventListener('input', handleSearch);

// Initialize
fetchAllPokemonNames();