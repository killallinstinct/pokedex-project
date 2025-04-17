import { renderTypeBadges } from "./renderTypeBadges.js";
import { typeColors } from "./typeColors.js";

const params = new URLSearchParams(window.location.search);
const pokemonID = params.get('id'); // example: "ursaluna"

// Function to fetch the data of the Pokemon whose name is passed through the param
async function fetchPokemonData(name) {

    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) throw new Error('Pokemon not found!');
    return await response.json();

}

// Function to fetch the data of the species whose name is passed through the param
async function fetchSpeciesData(name) {

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    if (!response.ok) throw new Error('Species not found!');
    return await response.json();

}

// Function to display fetched data of pokemon and species
async function displayPokemon() {
    try {
        const pokemon = await fetchPokemonData(pokemonID);
        const speciesName = pokemonID.includes('-') ? pokemonID.split('-')[0] : pokemonID;
        const species = await fetchSpeciesData(speciesName);

        // Correctly find the real national dex number for formes
        const nationalDexEntry = species.pokedex_numbers.find(
            entry => entry.pokedex.name === "national"
        );
        const nationalDexNumber = nationalDexEntry ? nationalDexEntry.entry_number : pokemon.id;

        // Fill name + number
        document.getElementById('pokemon-name').textContent = 
            `${formatDisplayName(pokemon)} (#${nationalDexNumber.toString().padStart(4, '0')})`;

        // Dynamically builds type badges
        const typeHTML = renderTypeBadges(pokemon.types);

        // Creates visual for pokemon card dynamically based on primary type
        const primaryType = pokemon.types[0].type.name;
        const bgColor = typeColors[primaryType] || '#777';

        const container = document.getElementById('pokemon-details');

        // Finds English flavor text
        const flavorEntry = species.flavor_text_entries.find(
            entry => entry.language.name === "en"
        );

        container.innerHTML = `
            <div class="pokemon-card" style="background-color: ${bgColor}">
                <div class="info-section">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}" />
                </div>

                <div class="info-section">
                    <h3><strong>Type</strong></h3>
                    ${typeHTML}
                </div>

                <div class="info-section">
                    <h3><strong>Abilities</strong></h3>
                    <div class="abilities-grid">
                        ${pokemon.abilities.map(a => `
                            <div class="ability-card ${a.is_hidden ? 'hidden-ability' : ''}">
                                ${capitalize(a.ability.name)}${a.is_hidden ? ' (Hidden Ability)' : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="info-section">
                    <h3><strong>Height / Weight</strong></h3>
                    <p>Height: ${(pokemon.height / 10).toFixed(1)} m</p>
                    <p>Weight: ${(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>

                <div class="info-section">
                    <h3><strong>Base Stats</strong></h3>
                    <ul>
                        ${pokemon.stats.map(s => `<li>${s.stat.name.toUpperCase()}: ${s.base_stat}</li>`).join('')}
                    </ul>
                </div>

                <div class="info-section">
                    <h3><strong>Flavor Text</strong></h3>
                    <p>${flavorEntry ? flavorEntry.flavor_text.replace(/\f|\n/g, ' ') : "No description available."}</p>
                </div>
            </div>
        `;
    }
    catch (error) {
        console.error(error);
        document.getElementById('pokemon-details').innerHTML = `<p>Failed to load Pokemon.</p>`;
    }
}
function formatDisplayName(pokemon) {
    const parts = pokemon.name.split('-');
    if (parts.length > 1) {
        const baseName = parts[0];
        const formName = parts.slice(1).join(' ');
        return `${capitalize(baseName)} (${capitalize(formName)} Form)`;
    }
    else {
        return capitalize(pokemon.name);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

displayPokemon();

const backButton = document.getElementById('back-button');
if (backButton) {
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html'
    });
}