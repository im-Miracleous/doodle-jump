export default class Curve {
    constructor(gfx) {
        this.gfx = gfx;
    }

    bezierDot(p0, p1, p2, t) {
        // p0 -> p1 Interpolation
        let xa = p0.x + t * (p1.x - p0.x);
        let ya = p0.y + t * (p1.y - p0.y);

        // p1 -> p2 Interpolation
        let xb = p1.x + t * (p2.x - p1.x);
        let yb = p1.y + t * (p2.y - p1.y);

        // pa -> pb Interpolation
        let x = xa + t * (xb - xa);
        let y = ya + t * (yb - ya);

        return {x: Math.round(x), y: Math.round(y)};
    }

    curvaBezier(p0, p1, p2, color) {
        for (let t = 0; t < 1; t += 0.001) {
            let points = this.bezierDot(p0, p1, p2, t);
            this.gfx.dot(points.x, points.y, color);
        }
    }
}