import { typeColors } from "./typeColors.js";

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

        // Creates visual for pokemon card dynamically based on primary type
        const primaryType = pokemon.types[0].type.name;
        const bgColor = typeColors[primaryType] || '#777';
        
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.innerHTML = `
            <div class="pokemon-card" style="background-color: ${bgColor}"> 
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
                <h3>${pokemon.name.toUpperCase()}</h3>
                <p>${pokemon.types.map(t => t.type.name).join(' / ')}</p>
                <a href="pokemon.html?id=${pokemon.name}" class="details-link">View Details</a>
            </div>
        `;
        pokedexContainer.appendChild(card);
    }
    
    catch (error) {
        console.error(`Failed to fetch ${name}:`, error);
    }
}

// Load starter pokemon on page load
starterList.forEach(name => fetchAndRender(name));