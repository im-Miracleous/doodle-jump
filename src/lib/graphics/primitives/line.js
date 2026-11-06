export default class Line {
    constructor(gfx) {
        this.gfx = gfx;
    }

    ddaLine(x1, y1, x2, y2, color) {
        let dx = x2 - x1;
        let dy = y2 - y1;

        if (Math.abs(dx) > Math.abs(dy)) {
            // Berjalan di x
            if (x2 > x1) {
                // Ke kanan
                let y = y1;
                for (let x = x1; x < x2; x++) {
                    y += dy/Math.abs(dx); // 1/m
                    this.gfx.dot(Math.round(x), Math.round(y), color);
                }
            } else { // x2 < x1
                // Ke kiri
                let y = y1;
                for (let x = x1; x > x2; x--) {
                    y += dy/Math.abs(dx); // 1/m
                    this.gfx.dot(Math.round(x), Math.round(y), color);
                }
            }
        } else {
            // Berjalan di y
            if (y2 > y1) {
                // Ke kanan
                let x = x1;
                for (let y = y1; y < y2; y++) {
                    x += dx/Math.abs(dy); // m
                    this.gfx.dot(Math.round(x), Math.round(y), color);
                }
            } else { // x2 < x1
                // Ke kiri
                let x = x1;
                for (let y = y1; y > y2; y--) {
                    x += dx/Math.abs(dy); // m
                    this.gfx.dot(Math.round(x), Math.round(y), color);
                }
            }
        }
    }
}