import { typeColors } from "./typeColors";

export function renderTypeBadges(types) {
    return `
    <div class="type-container">
        ${types.map(type => `
            <span class="type-badge" style="background-color: ${typeColors[type]}; color: white;">
                ${type}
            </span>
        `).join('')}
    </div>
    `;
}