export default class Dot {
    constructor(gfx) {
        this.gfx = gfx;
    }

    dot(x, y, color) {
        if (x < 0 || x >= this.gfx.canvasWidth || y < 0 || y >= this.gfx.canvasHeight) {
            return;
        }

        let index = (Math.ceil(x) + (Math.ceil(y) * this.gfx.canvasWidth)) * 4;
        this.gfx.imageData.data[index] = color.r;
        this.gfx.imageData.data[index + 1] = color.g;
        this.gfx.imageData.data[index + 2] = color.b;
        this.gfx.imageData.data[index + 3] = 255;
    }
}