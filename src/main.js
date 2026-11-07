import Graphics from './lib/graphics/graphicsLib.js';
import Game from './engine/game.js';
import GameLoop from './engine/gameLoop.js';
import { CONFIG } from './config.js';

window.addEventListener('DOMContentLoaded', async () => {
    const canvas = document.getElementById('board');

    if (!canvas) {
        console.error("No canvas loaded.");
        return;
    }

    // Canvas size
    canvas.width = CONFIG.CANVAS.WIDTH;
    canvas.height = CONFIG.CANVAS.HEIGHT;

    const gfx = new Graphics(canvas);

    const game = new Game(gfx);
    await game.init();

    const loop = new GameLoop(
        (dt) => game.update(dt),
        () => game.render(),
    );

    loop.start();
})