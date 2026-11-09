import Platform from './platform.js';
import { CONFIG } from '../config.js';

export default class PlatformControl {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.platforms = [];
    }

    init() {
        this.platforms = [];

        const start = {
            x: Math.floor(Math.random() * (this.canvasWidth - CONFIG.PLATFORM.WIDTH)),
            y: this.canvasHeight - 50
        }
        this.platforms.push(new Platform(start.x, start.y));

        for (let i = 0; i < CONFIG.PLATFORM.COUNT; i++) {
            const x = Math.floor(Math.random() * (this.canvasWidth * 0.75));
            const y = this.canvasHeight - CONFIG.PLATFORM.GAP * i - 150;
            this.platforms.push(new Platform(x, y));
        }
    }

    draw(gfx) {
        for (let i = 0; i < this.platforms.length; i++) {
            this.platforms[i].draw(gfx);
        }
    }
}