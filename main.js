import { calculateBST, formatAbilities } from "./utils.js";
import { typeColors } from "./typeColors.js";

fetch("pokemon.json")
    .then((res) => res.json())
    .then((pokemonList) => {
        const container = document.getElementById("pokedex");

        pokemonList.forEach((pokemon) => {
            // Create card visual
            const card = document.createElement("div");
            card.className = "pokemon-card";

            // Calculate and store the BST on the object
            const bst = calculateBST(pokemon.baseStats);

            // Display bool for the abilities on the object
            const abilityHTML = formatAbilities(pokemon.abilities);

            // Adds background color to pokemon card based 
            // on their primary type
            
            const primaryType = pokemon.types[0];
            const bgColor = typeColors[primaryType] || "#777"   // fallback
            card.style.backgroundColor = bgColor;

            // Displays pokemon data in form of a card
            card.innerHTML = `
            <img src="${pokemon.sprite}" alt="${pokemon.name}" />
            <h2>${pokemon.name} (${pokemon.num})</h2>
            <p>Type: ${pokemon.types.join(', ')}</p>
            ${abilityHTML}
            <p>Height: ${pokemon.heightm} m</p>
            <p>Weight: ${pokemon.weightkg} kg</p>

            <p>HP: ${pokemon.baseStats.hp}
                <div class="stat-bar-container">
                    <div class="stat-bar" style="width: ${(pokemon.baseStats.hp / 255) * 100}%;"></div>
                </div>
            </p>

            <p>Attack: ${pokemon.baseStats.atk}</p>
            <p>Defense: ${pokemon.baseStats.def}</p>
            <p>Sp. Attack: ${pokemon.baseStats.spa}</p>
            <p>Sp. Defense: ${pokemon.baseStats.spd}</p>
            <p>Speed: ${pokemon.baseStats.spe}</p>
            <p><strong>Total: ${bst}</strong></p>
            `;
            container.appendChild(card);
        });
    })