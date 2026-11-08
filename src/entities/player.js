import { createAsset } from '../lib/utils/graphics.js';
import Vector2 from '../lib/graphics/primitives/Vector2.js';

export default class Player {
    constructor(canvasWidth, canvasHeight) {
        this.width = 46;
        this.height = 46;

        this.position = new Vector2(
            canvasWidth / 2 - this.width / 2,
            canvasHeight * 7 / 8 - this.height
        );

        this.velocity = new Vector2(0, 0);

        // Doodler sprite
        this.spriteRight = null;
        this.spriteLeft = null;
        this.facing = "right";
    }

    async init() {
        const right = await createAsset(new URL('../../assets/doodler-right.png', import.meta.url));
        const left = await createAsset(new URL('../../assets/doodler-left.png', import.meta.url));

        this.spriteRight = this.createSprite(right);
        this.spriteLeft = this.createSprite(left);
    }

    createSprite(asset) {
        const img = document.createElement('canvas');
        img.width = asset.width;
        img.height = asset.height;

        const ctx = img.getContext('2d');
        const imageData = ctx.createImageData(asset.width, asset.height);

        imageData.data.set(asset.data);
        ctx.putImageData(imageData, 0, 0);

        return { img, width: asset.width, height: asset.height };
    }

    setDirection(dir) {
        if (dir === "left" || dir === "right") {
            this.facing = dir;
        }
    }

    update(dt) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(ctx) {
        let sprite;

        if (this.facing === "left") {
            sprite = this.spriteLeft;
        } else {
            sprite = this.spriteRight;
        }

        if (sprite && sprite.img) {
            ctx.drawImage(sprite.img, this.position.x, this.position.y, this.width, this.height);
        }
    }
}