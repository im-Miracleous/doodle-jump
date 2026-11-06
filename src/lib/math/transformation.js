export default class Transformation {
    // For convenience, use below methods with the polygon() function to create shape

    translateDot(dot, T) {
        if (typeof T === "object") {
            return {
                x: dot.x + T.x,
                y: dot.y + T.y
            }
        }

        return {
            x: dot.x + T,
            y: dot.y + T
        }
    }

    scaleDot(dot, S) {
        if (typeof S === "object") {
            return {
                x: dot.x * S.x,
                y: dot.y * S.y
            }
        }

        return {
            x: dot.x * S,
            y: dot.y * S
        }
    }

    rotateDot(dot, theta) {
        return {
            x: dot.x * Math.cos(theta) - dot.y * Math.sin(theta),
            y: dot.x * Math.sin(theta) + dot.y * Math.cos(theta)
        }
    }

    translate(dotArray, translation) {
        let translated = [];

        for (let i = 0; i < dotArray.length; i++) {
            translated[i] = this.translateDot(dotArray[i], translation);
        }

        return translated;
    }

    scale(dotArray, anchor, multiplier) {
        let scaled = [];

        for (let i = 0; i < dotArray.length; i++) {
            let temp = this.translateDot(dotArray[i], {x: -anchor.x, y: -anchor.y});
            let processed = this.scaleDot(temp, multiplier);
            let result = this.translateDot(processed, {x: anchor.x, y: anchor.y});
            scaled.push(result);
        }

        return scaled;
    }

    rotate(dotArray, anchor, angle) {
        let rotated = [];

        for (let i = 0; i < dotArray.length; i++) {
            let temp = this.translateDot(dotArray[i], {x: -anchor.x, y: -anchor.y});
            let processed = this.rotateDot(temp, angle);
            let result = this.translateDot(processed, {x: anchor.x, y: anchor.y});
            rotated.push(result);
        }

        return rotated;
    }
}