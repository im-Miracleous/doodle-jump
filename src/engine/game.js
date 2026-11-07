import Background from '../entities/Background.js';
import { CONFIG } from '../config.js';

export default class Game {
    constructor(gfx) {
        this.gfx = gfx;
        this.width = CONFIG.CANVAS.WIDTH;
        this.height = CONFIG.CANVAS.HEIGHT;

        this.background = new Background(gfx, this.width, this.height);

        this.isGameOver = false;
        this.score = 0;
    }

    async init() {
        await this.background.load();
        console.log("Initializing game...");
    }

    update(dt) {

    }

    render() {
        this.gfx.refresh();

        // Render imageData
        this.gfx.render();

        // Render background
        this.background.render();
    }
}