import * as primitive from '../graphics/primitives/index.js';

export default class Graphics {
    constructor(canvas) {
        this.canvas = canvas;
    }

    test() {
        console.log(`width, height = ${this.canvas.width}, ${this.canvas.height}`);
    }

    getCoordinate() {
        this.canvas.addEventListener('click', (e) => {
            let rect = this.canvas.getBoundingClientRect();

            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            console.log(`(x, y) = ${x}, ${y}`);
        });
    }

    getMousePosition(e) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: Math.round(e.clientX - rect.left),
            y: Math.round(e.clientY - rect.top)
        };
    }

    getCentroid(points) {
        let x = 0;
        let y = 0;

        for (let point of points) {
            x += point.x;
            y += point.y;
        }

        return new primitive.Vector2(
            Math.round(x / points.length),
            Math.round(y / points.length)
        );
    }

    getScreenCentroid(w, h) {
        return new primitive.Vector2(
            Math.round(w / 2),
            Math.round(h / 2)
        );
    }

    async createAsset(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;

            img.onload = () => {
                const w = img.naturalWidth;
                const h = img.naturalHeight;

                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = w;
                tempCanvas.height = h;

                const ctx = tempCanvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const asset = {
                    width: w,
                    height: h,
                    data: ctx.getImageData(0, 0, w, h).data
                };

                resolve(asset);
            }

            img.onerror = (e) => {
                reject(new Error("Failed to load asset."))
            }
        });
    }
}