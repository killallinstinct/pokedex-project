import { typeColors } from "./typeColors.js";

export function renderTypeBadges(types) {
  return `
    <div class="type-badges">
      ${types.map(type => `
        <span class="type-badge" style="background-color: ${typeColors[type]};">
          ${type}
        </span>
      `).join('')}
    </div>
  `;
}