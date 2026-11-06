export default class Matrix {
    identity() {
        return [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];
    }

    multiply(m1, m2) {
        let result = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    result[i][k] += m1[i][j] * m2[j][k];
                }
            }
        }

        return result;
    }

    createTranslation(Tx, Ty) {
        return [
            [1, 0, Tx],
            [0, 1, Ty],
            [0, 0, 1]
        ];
    }

    createScale(Sx, Sy) {
        return [
            [Sx, 0, 0],
            [0, Sy, 0],
            [0, 0, 1]
        ];
    }

    createRotation(theta) {
        return [
            [Math.cos(theta), -Math.sin(theta), 0],
            [Math.sin(theta), Math.cos(theta), 0],
            [0, 0, 1]
        ];
    }

    scaleFP(xc, yc, Sx, Sy) {
        let m1 = this.createTranslation(-xc, -yc);
        let m2 = this.createScale(Sx, Sy);
        let m3 = this.createTranslation(xc, yc);

        let result;
        result = this.multiply(m3, m2);
        result = this.multiply(result, m1);
        return result;
    }

    rotationFP(xc, yc, theta) {
        let m1 = this.createTranslation(-xc, -yc);
        let m2 = this.createRotation(theta);
        let m3 = this.createTranslation(xc, yc);

        let result;
        result = this.multiply(m3, m2);
        result = this.multiply(result, m1);
        return result;
    }

    transformDot(dot, m) {
        return {
            x: m[0][0] * dot.x + m[0][1] * dot.y + m[0][2] * 1,
            y: m[1][0] * dot.x + m[1][1] * dot.y + m[1][2] * 1
        }
    }

    transformArray(dotArray, m) {
        let result = [];

        for (let i = 0; i < dotArray.length; i++) {
            let dotResult;
            dotResult = this.transformDot(dotArray[i], m);
            result.push(dotResult);
        }

        return result;
    }
}