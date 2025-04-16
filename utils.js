export function calculateBST(stats) {
    return Object.values(stats).reduce((total, stat) => total + stat, 0);
}