import Background from '../entities/Background.js';
import PlatformControl from '../entities/PlatformControl.js';
import Player from '../entities/player.js';
import InputHandler from './inputHandler.js';
import { detectCollision } from './physics.js';
import { CONFIG } from '../config.js';

export default class Game {
    constructor(gfx) {
        this.gfx = gfx;
        this.width = CONFIG.CANVAS.WIDTH;
        this.height = CONFIG.CANVAS.HEIGHT;

        this.input = new InputHandler();

        this.background = new Background(gfx, this.width, this.height);
        this.platformControl = new PlatformControl(this.width, this.height);
        this.player = new Player(this.width, this.height);

        this.score = 0;
        this.scoreEl = document.getElementById("score");
    }

    async init() {
        await this.background.load();
        await this.platformControl.init();
        await this.player.init();
        console.log("Initializing game...");
    }

    update(dt) {
        this.player.update(dt, this.input);

        const threshold = this.height / 2;
        if (this.player.position.y < threshold && this.player.velocity.y < 0) {
            const dy = -this.player.velocity.y;
            this.platformControl.scroll(dy);
            this.player.position.y = threshold;

            this.updateScore(dy);
        }

        if (this.player.velocity.y > 0) {
            const feet = this.player.position.y + this.player.height;

            for (let p of this.platformControl.platforms) {
                if (detectCollision(this.player, p) && feet <= p.position.y + p.height) {
                    this.player.position.y = p.position.y - this.player.height;
                    this.player.jump();
                    break;
                };
            }
        }
    }

    updateScore(dy) {
        this.score += Math.floor(dy);

        if (this.scoreEl) {
            this.scoreEl.innerText = Math.floor(this.score).toString();
        }
    }

    render() {
        this.gfx.refresh();

        // Render background
        this.background.render();

        // Render platform
        this.platformControl.draw(this.gfx);

        // Render imageData
        this.gfx.render();

        // Render player
        this.player.draw(this.gfx.ctx);
    }
}