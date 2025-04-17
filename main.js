import { calculateBST, formatAbilities } from "./utils.js";
import { typeColors } from "./typeColors.js";
import { renderTypeBadges } from "./renderTypeBadges.js";

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

            // Adjust type badges for formatting
            const typeHTML = renderTypeBadges(pokemon.types);

            // Displays pokemon data in form of a card
            card.innerHTML = `
            <img src="${pokemon.sprite}" alt="${pokemon.name}" />
            <h2>${pokemon.name} (${pokemon.num})</h2>
            ${typeHTML}
            ${abilityHTML}
            <p>Height: ${pokemon.heightm} m</p>
            <p>Weight: ${pokemon.weightkg} kg</p>

            <table class="stats-table">
                <tr>
                    <td class="stat-label">HP</td>
                    <td>${pokemon.baseStats.hp}</td>
                    <td>
                        <div class="stat-bar-container">
                            <div class="stat-bar stat-hp" style="width: ${(pokemon.baseStats.hp / 255) * 100}%"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="stat-label">Attack</td>
                    <td>${pokemon.baseStats.atk}</td>
                    <td>
                        <div class="stat-bar-container">
                            <div class="stat-bar stat-atk" style="width: ${(pokemon.baseStats.atk / 255) * 100}%"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="stat-label">Defense</td>
                    <td>${pokemon.baseStats.def}</td>
                    <td>
                        <div class="stat-bar-container">
                            <div class="stat-bar stat-def" style="width: ${(pokemon.baseStats.def / 255) * 100}%"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="stat-label">Sp. Atk</td>
                    <td>${pokemon.baseStats.spa}</td>
                    <td>
                        <div class="stat-bar-container">
                            <div class="stat-bar stat-spa" style="width: ${(pokemon.baseStats.spa / 255) * 100}%"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="stat-label">Sp. Def</td>
                    <td>${pokemon.baseStats.spd}</td>
                    <td>
                        <div class="stat-bar-container">
                            <div class="stat-bar stat-spd" style="width: ${(pokemon.baseStats.spd / 255) * 100}%"></div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="stat-label">Speed</td>
                    <td>${pokemon.baseStats.spe}</td>
                    <td>
                        <div class="stat-bar-container">
                            <div class="stat-bar stat-spe" style="width: ${(pokemon.baseStats.spe / 255) * 100}%"></div>
                        </div>
                    </td>
                </tr>
            </table>

            <p><strong>Total: ${bst}</strong></p>
            `;
            container.appendChild(card);
        });
    })

    /*
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
        */