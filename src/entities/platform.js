import Vector2 from '../lib/graphics/primitives/Vector2.js';
import Color from '../lib/graphics/primitives/Color.js';
import { CONFIG } from '../config.js';

export default class Platform {
    constructor(x, y) {
        this.width = CONFIG.PLATFORM.WIDTH;
        this.height = CONFIG.PLATFORM.HEIGHT;
        this.position = new Vector2(x, y);

        // Platform color
        this.outlineColor = new Color(67, 124, 20);
        this.fillColor = new Color(149, 213, 68);
    }

    draw(gfx) {
        const x1 = Math.round(this.position.x);
        const y1 = Math.round(this.position.y);
        const x2 = x1 + this.width;
        const y2 = y1 + this.height;

        const vertices = [
            new Vector2(x1, y1),
            new Vector2(x2, y1),
            new Vector2(x2, y2),
            new Vector2(x1, y2)
        ];

        for (let y = y1; y < y2; y++) {
            gfx.line.ddaLine(x1 + 1, y, x2 - 1, y, this.fillColor);
        }

        gfx.shapes.polygon(vertices, this.outlineColor);
    }
}