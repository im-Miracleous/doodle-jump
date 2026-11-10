export default class InputHandler {
    constructor() {
        this.keys = {
            left: false,
            right: false,
            space: false
        }

        this.direction = null;

        window.addEventListener('keydown', (e) => {
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.keys.right = true;
                this.direction = "right";
            } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.keys.left = true;
                this.direction = "left";
            } else if (e.code === "Space") {
                this.keys.space = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.keys.right = false;
                if (this.keys.left) {
                    this.direction = "left";
                }
            } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.keys.left = false;
                if (this.keys.right) {
                    this.direction = "right";
                }
            } else if (e.code === "Space") {
                this.keys.space = false;
            }
        });
    }
}