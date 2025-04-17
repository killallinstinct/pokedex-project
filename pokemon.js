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
        const species = await fetchSpeciesData(pokemonID);

        // Fill name + number
        document.getElementById('pokemon-name').textContent = 
            `${pokemon.name.toUpperCase()} (#${pokemon.id.toString().padStart(4, '0')})`;

        const container = document.getElementById('pokemon-details');

        // Finds English flavor text
        const flavorEntry = species.flavor_text_entries.find(
            entry => entry.language.name === "en"
        );

        container.innerHTML = `
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" width="200" />
            
            <h3>Type</h3>
            <p>${pokemon.types.map(t => t.type.name).join(' / ')}</p>
            
            <h3>Abilities<h/3>
            <ul>
                ${pokemon.abilities.map(a => `<li>${a.ability.name}${a.is_hidden ? ' (Hidden Ability)' : ''}</li>`).join('')}
            </ul>
            
            <h3>Height / Weight</h3>
            <p>Height: ${(pokemon.height / 10).toFixed(1)} m</p>
            <p>Weight: ${(pokemon.weight / 10).toFixed(1)} kg</p>
            
            <h3>Base Stats</h3>
            <u1>
                ${pokemon.stats.map(s => `<li>${s.stat.name.toUpperCase()}: ${s.base_stat}</li>`).join('')}
            </ul>

            <h3>Flavor Text</h3>
            <p>${flavorEntry ? flavorEntry.flavor_text.replace(/\f|\n/g, ' ') : "No description available."}</p>
        `;
    }
    catch (error) {
        console.error(error);
        document.getElementById('pokemon-details').innerHTML = `<p>Failed to load Pokemon.</p>`;
    }
}

displayPokemon();