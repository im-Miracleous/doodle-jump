export default class GameLoop {
    constructor(update, render) {
        this.update = update;
        this.render = render;
        this.lastTime = 0;
        this.isRunning = false;
        this.rafId = null;

        this.loop = this.loop.bind(this);
    }

    start() {
        if (this.isRunning) {
            return;
        }

        this.isRunning = true;
        this.lastTime = performance.now();
        this.rafId = requestAnimationFrame(this.loop);
    }

    stop() {
        this.isRunning = false;
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
    }

    loop(currentTime) {
        if (!this.isRunning) {
            return;
        }

        const delta = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        this.update(delta);
        this.render();

        this.rafId = requestAnimationFrame(this.loop);
    }
}