export function calculateBST(stats) {
    return Object.values(stats).reduce((total, stat) => total + stat, 0);
}
export function formatAbilities(pokemon) {
    const entries = Object.entries(abilitiesObj);
    const label = Object.entries(abilitiesObj);

    const formatted = entries
        .map(([key, ability]) =>
        key === "H" ? `${ability} (Hidden)` : ability
    )
    .join(", ");

    return `<p>${label}: ${formatted}</p>`;
}
