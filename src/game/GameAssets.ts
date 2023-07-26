import { Texture, Sprite } from "pixi.js";

export class GameAssets {
    private static _textures: {
        [name: string]: Texture;
    } = {};

    private static _sprites: {
        [name: string]: Sprite[];
    } = {};

    /**
     * Set a texture by cell name.
     * @param cellName Cell unique name.
     * @param texture Texture instance.
     */
    public static setTexture(cellName: string, texture: Texture) {
        this._textures[cellName] = texture;
    }

    /**
     * Get texture by cell name if was set before.
     * @param cellName Cell unique name.
     * @returns Texture or undefined if texture with such name wasn't set.
     */
    public static getTexture(cellName: string): Texture {
        return this._textures[cellName];
    }

    /**
     * Get sprite by cell name from pool or create new one.
     * @param cellName Cell unique name.
     * @returns Sprite from pool or newly created.
     */
    public static getSprite(cellName: string): Sprite {
        let sprites = this._sprites[cellName];

        if (!sprites) {
            sprites = [];
            this._sprites[cellName] = sprites;
        }

        if (sprites.length > 0) {
            return sprites.pop() as Sprite;
        }

        var texture = this.getTexture(cellName);
        return new Sprite(texture);
    }

    /**
     * Add sprite by cell name to the sprite pool.
     * @param cellName Cell unique name.
     * @param sprite Sprite to be added to the pool.
     */
    public static addSprite(cellName: string, sprite: Sprite) {
        let sprites = this._sprites[cellName];

        if (!sprites) {
            sprites = [];
            this._sprites[cellName] = sprites;
        }

        sprites.push(sprite);
    }
}
