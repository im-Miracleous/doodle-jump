import Dot from './primitives/dot.js';
import Line from './primitives/line.js';
import Curve from './primitives/curve.js';
import Shapes from './shapes.js';
import Coloring from './coloring.js';

export default class GraphicsLib {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

        this.dot = new Dot(this);
        this.line = new Line(this);
        this.curve = new Curve(this);
        this.shapes = new Shapes(this);
        this.coloring = new Coloring(this);
    }

    test() {
        console.log(`width, height = ${this.canvasWidth}, ${this.canvasHeight}`);
    }

    refresh() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        for (let i = 0; i < this.imageData.data.length; i++) {
            this.imageData.data[i] = 0;
        }
    }

    render() {
        this.ctx.putImageData(this.imageData, 0, 0);
    }
}