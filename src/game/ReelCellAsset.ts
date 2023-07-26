import { Sprite } from "pixi.js";
import { GameAssets } from "./GameAssets";


export class ReelCellAsset {
    private _name: string;
    private _sprite: Sprite;

    private static _pools: {
        [name: string]: ReelCellAsset[];
    } = {};

    public get sprite() {
        return this._sprite;
    }

    public constructor(name: string, sprite: Sprite) {
        this._name = name;
        this._sprite = sprite;
    }

    public static create(name: string) {
        const cells = this._pools[name];

        if (cells != undefined && cells.length > 0) {
            return cells.pop() as ReelCellAsset;
        }

        return new ReelCellAsset(name, GameAssets.getSprite(name));
    }

    public static free(asset: ReelCellAsset) {
        let cells = this._pools[asset._name];

        if (cells == undefined) {
            cells = [];
            this._pools[asset._name] = cells;
        }

        if (!cells.includes(asset)) {
            cells.push(asset);
        }
    }

    public static destroy(asset: ReelCellAsset) {
        const pool = this._pools[asset._name];

        if (pool != undefined && pool.includes(asset)) {
            pool.splice(pool.indexOf(asset), 1);
        }

        // return sprite to global pool
        GameAssets.addSprite(asset._name, asset._sprite);
    }

    public static getRandomName() {
        const randomCell = Math.floor(Math.random() * 8) + 1;
        return `/slot-game/images/slot-${randomCell}.png`;
    }
}
