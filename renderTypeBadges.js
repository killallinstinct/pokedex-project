import { typeColors } from './typeColors.js';

export function renderTypeBadges(types) {
    return `
    <div class="type-badges">
      ${types.map(t => `
        <span class="type-badge" style="background-color: ${typeColors[t.type.name] || '#777'};">
          ${t.type.name.toUpperCase()}
        </span>
      `).join('')}
    </div>
    `;
}