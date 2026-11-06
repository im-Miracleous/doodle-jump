export default class Coloring {
    constructor(gfx) {
        this.gfx = gfx;
    }

    getColor(x, y) {
        let index = 4 * (x + y * this.gfx.canvasWidth);

        return {
            r: this.gfx.imageData.data[index],
            g: this.gfx.imageData.data[index + 1],
            b: this.gfx.imageData.data[index + 2],
        };
    }

    floodFillNaive(canvas, x, y, toFlood, color) {
        let index = 4 * (x + y * this.gfx.canvasWidth);

        let currentColor = {
            r: this.gfx.getColor(x,y).r,
            g: this.gfx.getColor(x,y).g,
            b: this.gfx.getColor(x,y).b
        };

        if ((currentColor.r === toFlood.r) && (currentColor.g === toFlood.g) && (currentColor.b === toFlood.b)) {
            this.gfx.imageData.data[index] = color.r;
            this.gfx.imageData.data[index + 1] = color.g;
            this.gfx.imageData.data[index + 2] = color.b;
            this.gfx.imageData.data[index + 3] = 255;

            this.gfx.floodFillNaive(canvas, x+1, y, toFlood, color);
            this.gfx.floodFillNaive(canvas, x, y+1, toFlood, color);
            this.gfx.floodFillNaive(canvas, x-1, y, toFlood, color);
            this.gfx.floodFillNaive(canvas, x, y-1, toFlood, color);
        }
    }

    floodFillStack(canvas, x0, y0, toFlood, color) {
        let stack = [];
        stack.push({x: x0, y: y0});

        while (stack.length > 0) {
            let currentDot = stack.pop();
            let currentIndex = 4 * (currentDot.x + currentDot.y * this.gfx.canvasWidth);

            let currentColor = {
                r: this.gfx.imageData.data[currentIndex],
                g: this.gfx.imageData.data[currentIndex + 1],
                b: this.gfx.imageData.data[currentIndex + 2],
            }

            if ((currentColor.r === toFlood.r) && (currentColor.g === toFlood.g) && (currentColor.b === toFlood.b)) {
                this.gfx.imageData.data[currentIndex] = color.r;
                this.gfx.imageData.data[currentIndex + 1] = color.g;
                this.gfx.imageData.data[currentIndex + 2] = color.b;
                this.gfx.imageData.data[currentIndex + 3] = 255;

                stack.push({x: currentDot.x+1, y: currentDot.y});
                stack.push({x: currentDot.x-1, y: currentDot.y});
                stack.push({x: currentDot.x, y: currentDot.y+1});
                stack.push({x: currentDot.x, y: currentDot.y-1});
            }
        }
    }
}