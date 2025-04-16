fetch("pokemon.json")
    .then((res) => res.json())
    .then((pokemonList) => {
        const container = document.getElementById("pokedex");

        pokemonList.forEach((pokemon) => {
            const card = document.createElement("div");
            card.className = "pokemon-card";
            card.innerHTML = `
            <img src="${pokemon.sprite}" alt="${pokemon.name}" />
            <h2>${pokemon.name} (${pokemon.id})</h2
            <p>Type: $${pokemon.types.join(', ')}</p>
            <p>HP: ${pokemon.stats.hp}</p>
            <p>Attack: ${pokemon.stats.atk}</p>
            <p>Defense: ${pokemon.stats.def}</p>
            <p>Sp. Attack: ${pokemon.stats.spa}</p>
            <p>Sp. Defense: ${pokemon.stats.spd}</p>
            <p>Speed: ${pokemon.stats.spe}</p>
            `;
            container.appendChild(card);
        });
    })