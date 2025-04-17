export function calculateBST(baseStats) {
    return Object.values(baseStats).reduce((total, stat) => total + stat, 0);
}
export function formatAbilities(abilities) {
    const entries = Object.entries(abilities);
    const label = entries.length > 1 ? "Abilities" : "Ability";

    const formatted = `
        <div class="abilities-grid">
        ${entries
            .map(([key, ability]) =>
            key === "H"
                ? `<div class="ability hidden-ability">${ability}<br><span class="sub-label">(Hidden Ability)</span></div>`
                : `<div class="ability normal-ability">${ability}</div>`
            )
            .join("")}
        </div>
    `;
        
    return `
        <div class="section-title">${label}</div>
        <div class="info-section">${formatted}</div>
        `;
}