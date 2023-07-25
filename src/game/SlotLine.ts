import { Texture, Sprite, Application, Container } from "pixi.js";

export class GameAssets {
    private _textures: {
        [name: string]: Texture;
    } = {

    };

    private _sprites: {
        [name: string]: Sprite[];
    } = {};

    /**
     * Set a texture by cell name.
     * @param cellName Cell unique name.
     * @param texture Texture instance.
     */
    public setTexture(cellName: string, texture: Texture) {
        this._textures[cellName] = texture;
    }

    /**
     * Get texture by cell name if was set before.
     * @param cellName Cell unique name.
     * @returns Texture or undefined if texture with such name wasn't set.
     */
    public getTexture(cellName: string): Texture {
        return this._textures[cellName];
    }

    /**
     * Get sprite by cell name from pool or create new one.
     * @param cellName Cell unique name.
     * @returns Sprite from pool or newly created.
     */
    public getSprite(cellName: string): Sprite {
        let sprites = this._sprites[cellName];
        
        if (!sprites) {
            sprites = [];
            this._sprites[cellName] = sprites;
        }

        if (sprites.length > 0) {
            return sprites.pop() as Sprite;
        }

        return new Sprite();
    }

    /**
     * Add sprite by cell name to the sprite pool.
     * @param cellName Cell unique name.
     * @param sprite Sprite to be added to the pool.
     */
    public addSprite(cellName: string, sprite: Sprite) {
        let sprites = this._sprites[cellName];
        
        if (!sprites) {
            sprites = [];
            this._sprites[cellName] = sprites;
        }

        sprites.push(sprite);
    }
}

export interface IGameData {
    app: Application;
}

export class CellCarousel {
    private cells = [
        1,
        2,

        3,
        4,
        5,

        6,
        7,
        8,
        9
    ];

    // how much cells are visible
    private _visibleCells = 3;

    // current cell offset counting from top
    private _offset = 0;

    // target cell offset counting from top
    private _targetOffset = 5;

    // speed in cells per second
    private _spinSpeed = 1;

    // container where cells are rendered
    // container is of a size of all visible cells
    private _container: Container | null = null;

    public update(data: IGameData) {
        const dt = data.app.ticker.deltaTime;
    }
}
