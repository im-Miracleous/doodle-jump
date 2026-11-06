export default class Color {
    constructor(r = 0, g = 0, b = 0, a = 255) {
        // Memastikan nilai berada di rentang 0 - 255 dan bilangan bulat
        this.r = Math.min(255, Math.max(0, Math.round(r)));
        this.g = Math.min(255, Math.max(0, Math.round(g)));
        this.b = Math.min(255, Math.max(0, Math.round(b)));
        this.a = Math.min(255, Math.max(0, Math.round(a)));
    }

    equals(other) {
        if (!other) {
            return false;
        }
        return this.r === other.r &&
            this.g === other.g &&
            this.b === other.b;
    }

    static fromHex(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return new Color(r, g, b);
    }
}