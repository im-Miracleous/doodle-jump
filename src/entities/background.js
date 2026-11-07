import Graphics from '../lib/utils/graphics.js';

export default class Background {
    constructor(gfx, width, height) {
        this.gfx = gfx;
        this.width = width;
        this.height = height;
        this.image = null;
    }

    async load() {
        const graphics = new Graphics(this.gfx.canvas);
        const asset = await graphics.createAsset(
            new URL('../../assets/doodlejumpbg.png', import.meta.url)
        );

        const src = document.createElement('canvas');
        src.width = asset.width;
        src.height = asset.height;

        const srcCtx = src.getContext('2d');
        const imageData = srcCtx.createImageData(asset.width, asset.height);
        imageData.data.set(asset.data);
        srcCtx.putImageData(imageData, 0, 0);

        this.image = document.createElement('canvas');
        this.image.width = this.width;
        this.image.height = this.height;

        const ctx = this.image.getContext('2d');
        ctx.drawImage(src, 0, 0, this.width, this.height);
    }

    render() {
        if (!this.image) {
            return;
        }

        this.gfx.ctx.drawImage(this.image, 0, 0);
    }
}