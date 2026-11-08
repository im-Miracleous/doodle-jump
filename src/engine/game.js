import Background from '../entities/Background.js';
import Player from '../entities/player.js';
import InputHandler from './inputHandler.js';
import { CONFIG } from '../config.js';

export default class Game {
    constructor(gfx) {
        this.gfx = gfx;
        this.width = CONFIG.CANVAS.WIDTH;
        this.height = CONFIG.CANVAS.HEIGHT;

        this.input = new InputHandler();

        this.background = new Background(gfx, this.width, this.height);
        this.player = new Player(this.width, this.height);
    }

    async init() {
        await this.background.load();
        await this.player.init();
        console.log("Initializing game...");
    }

    update(dt) {
        this.player.update(dt, this.input); 
    }

    render() {
        this.gfx.refresh();

        // Render imageData
        this.gfx.render();

        // Render background
        this.background.render();

        // Render player
        this.player.draw(this.gfx.ctx);
    }
}