export default class Shapes {
    constructor(gfx) {
        this.gfx = gfx;
    }

    square(xc, yc, side, color) {
        let half = Math.floor(side / 2);
        let xMin = xc - half;
        let xMax = xc + half;
        let yMin = yc - half;
        let yMax = yc + half;

        for (let i = 0; i < side * 4; i++) {
            let x, y, step = i % side;

            if (i < side) {
                x = xMin + step;
                y = yMin;
            } else if (i < side * 2) {
                x = xMax;
                y = yMin + step;
            } else if (i < side * 3) {
                x = xMax - step;
                y = yMax;
            } else {
                x = xMin;
                y = yMax - step;
            }

            this.gfx.dot.dot(x, y, color);
        }
    }

    naiveCircle(xc, yc, radius, color) {
        for (let x = xc - radius; x <= xc + radius; x++) {
            let y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.gfx.dot.dot(Math.ceil(x), Math.ceil(y), color);

            y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.gfx.dot.dot(Math.ceil(x), Math.ceil(y), color);
        }

        for (let x = xc - radius; x <= xc + radius; x++) {
            let y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.gfx.dot.dot(Math.ceil(y), Math.ceil(x), color);

            y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.gfx.dot.dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    polarCircle(xc, yc, radius, color) {
        for (let theta = 0; theta <= Math.PI * 2; theta += 0.01) {
            let x = xc + radius * Math.cos(theta);
            let y = yc + radius * Math.sin(theta);

            this.gfx.dot.dot(Math.round(x), Math.round(y), color);
        }
    }

    ellipse(xc, yc, radiusX, radiusY, color) {
        for (let theta = 0; theta <= Math.PI * 2; theta += 0.01) {
            let x = xc + radiusX * Math.cos(theta);
            let y = yc + radiusY * Math.sin(theta);

            this.gfx.dot.dot(Math.round(x), Math.round(y), color);
        }
    }

    spiral(xc, yc, gap, lambda, color) {
        for (let theta = 0; theta <= Math.PI * (lambda * 2); theta += 0.01) {
            let x = xc + gap * theta * Math.cos(theta);
            let y = yc + gap * theta * Math.sin(theta);

            this.gfx.dot.dot(Math.round(x), Math.round(y), color);
        }
    }

    // WARNING NOTES: Petal masih ada yg belum sesuai beberapa (mis. kalau n = 6, n = 10, dlsb)
    flower(xc, yc, radius, n, color) {
        if (n % 2 === 0) {
            Math.floor(n /= 2);
        }

        for (let theta = 0; theta <= Math.PI * 2; theta += 0.01) {
            let x = xc + radius * Math.cos(n * theta) * Math.cos(theta);
            let y = yc + radius * Math.cos(n * theta) * Math.sin(theta);

            this.gfx.dot.dot(Math.round(x), Math.round(y), color);
        }
    }

    cardiod(xc, yc, radius, color) {
        for (let theta = 0; theta <= Math.PI * 2; theta += 0.01) {
            let x = xc + (radius + radius * Math.sin(theta)) * Math.cos(theta);
            let y = yc + (radius + radius * Math.sin(theta)) * Math.sin(theta);

            this.gfx.dot.dot(Math.round(x), Math.round(y), color);
        }
    }

    gear(xc, yc, radius, spike, amplitude, color) {
        let phi = 0;
        for (let theta = 0; theta <= Math.PI * 2; theta += 1/radius) {
            let x = xc + (radius + amplitude * Math.sin(phi)) * Math.cos(theta);
            let y = yc + (radius + amplitude * Math.sin(phi)) * Math.sin(theta);

            this.gfx.dot.dot(Math.round(x), Math.round(y), color);

            phi += spike / radius;
        }
    }

    clover(xc, yc, radius, spike, amplitude, color) {
        let phi = 0;
        for (let theta = 0; theta <= Math.PI * 2; theta += 1/radius) {
            let x = xc + (radius * Math.cos(2 * theta) + amplitude * Math.sin(phi)) * Math.cos(theta);
            let y = yc + (radius * Math.cos(2 * theta) + amplitude * Math.sin(phi)) * Math.sin(theta);

            this.gfx.dot.dot(Math.round(x), Math.round(y), color);

            phi += spike / radius;
        }
    }

    polygon(dotArray, color) {
        for (let i = 0; i < dotArray.length; i++) {
            this.gfx.line.ddaLine(
                dotArray[i].x,
                dotArray[i].y,
                dotArray[(i + 1) % dotArray.length].x,
                dotArray[(i + 1) % dotArray.length].y,
                color
            )
        }
    }
}