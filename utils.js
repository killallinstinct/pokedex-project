export function calculateBST(baseStats) {
    return Object.values(baseStats).reduce((total, stat) => total + stat, 0);
}
export function formatAbilities(abilities) {
    const entries = Object.entries(abilities);
    const label = Object.entries > 1 ? "Abilities" : "Ability";

    const formatted = entries
        .map(([key, ability]) =>
        key === "H" ? `${ability} (Hidden)` : ability
    )
    .join(", ");

    return `<p>${label}: ${formatted}</p>`;
}