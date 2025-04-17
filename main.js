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

            // Dynamic gradient base on types
            const type1Color = typeColors[pokemon.types[0]];
            const type2Color = pokemon.types[1] ? typeColors[pokemon.types[1]] : type1Color;

            const headerStyle = `background: linear-gradient(to right, ${type1Color}, ${type2Color});`;

            // Displays pokemon data in form of a card
            card.innerHTML = `
            <div class="infobox">
                <div class="infobox-header" style="${headerStyle}">
                ${pokemon.name} (#${pokemon.num})
                </div>

                <div class="infobox-image">
                <img src="${pokemon.sprite}" alt="${pokemon.name}">
                </div>

                <div class="infobox-section">
                <div class="infobox-subtitle">Type</div>
                <div class="type-badges">
                    ${pokemon.types.map(type => `<span class="type-badge ${type.toLowerCase()}">${type}</span>`).join("")}
                </div>
                </div>

                <div class="infobox-section">
                <div class="infobox-subtitle">Abilities</div>
                ${Object.entries(pokemon.abilities).map(([key, ability]) => {
                    if (key === "H") {
                    return `<div class="data-pair"><span>${ability}</span><span style="font-size: 11px; color: #666;">(Hidden Ability)</span></div>`;
                    } else {
                    return `<div class="data-pair"><span>${ability}</span><span></span></div>`;
                    }
                }).join("")}
                </div>

                <div class="infobox-section">
                <div class="infobox-subtitle">Height / Weight</div>
                <div class="data-pair"><span>Height</span><span>${pokemon.heightm} m</span></div>
                <div class="data-pair"><span>Weight</span><span>${pokemon.weightkg} kg</span></div>
                </div>

                <div class="infobox-section">
                <div class="infobox-subtitle">Base Stats</div>
                <table class="stats-table">
                    ${Object.entries(pokemon.baseStats).map(([stat, val]) => `
                    <tr>
                        <td class="stat-label">${stat.toUpperCase()}</td>
                        <td>${val}</td>
                        <td>
                        <div class="stat-bar-container">
                            <div class="stat-bar stat-${stat}" style="width: ${(val / 255) * 100}%"></div>
                        </div>
                        </td>
                    </tr>`).join("")}
                </table>
                <p><strong>Total: ${bst}</strong></p>
                </div>
            </div>
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