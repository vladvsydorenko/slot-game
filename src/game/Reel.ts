import { Application, Color, Rectangle, Texture } from "pixi.js";
import { ILayoutProps, Layout } from "./Layout";
import { ReelCellAsset } from "./ReelCellAsset";
import { GameAssets } from "./GameAssets";

export interface IReelProps extends ILayoutProps {
    cells: number;
    delay: number;
    hiddenCells: number;
};

export class Reel extends Layout {
    private _cellsCount: number;
    private _hiddenCellsCount: number;
    private _cells: ReelCellAsset[];
    private _layouts: Layout[];

    private _startTime = 0;
    private _time = 0;
    private _delay = 0;
    private _speed = 0.04;

    public constructor(props: IReelProps) {
        super(props);

        this._cells = [];
        this._layouts = [];
        this._delay = props.delay;

        this._cellsCount = props.cells;
        this._hiddenCellsCount = props.hiddenCells;

        this.on("added", this.onAdd);
        this.on("removed", this.onRemove);
    }

    public layout(): void {
        super.layout();

        for (let i = 0; i < this._layouts.length; i++) {
            const layout = this._layouts[i];
            const cell = this._cells[i];

            const offset = layout.width / 10;
            cell.sprite.x = offset;
            cell.sprite.y = offset;
            cell.sprite.width = layout.width - offset;
            cell.sprite.height = layout.height - offset;
        }
    }
    public reset() {
        this._time = 0;
        this._startTime = Date.now();

        // HACK
        const last = (this._cellsCount + this._hiddenCellsCount) - this._cellsCount;
        for (let i = 0; i < this._cellsCount; i++) {
            const cell = this._cells[i];
            const lastCell = this._cells[last + i];

            // const texture = cell.sprite.texture;
            cell.sprite.texture = lastCell.sprite.texture;
            // lastCell.sprite.texture = texture;
        }

        const count = this._cellsCount + this._hiddenCellsCount;
        for (let i = this._cellsCount; i < count; i++) {
            const cell = this._cells[i];
            cell.sprite.texture = GameAssets.getTexture(ReelCellAsset.getRandomName());
        }

        this._anchors.y = 0;
        this._anchors.height = 1;
        // [end] HACK
    }

    public tick(app: Application) {
        this._time += app.ticker.deltaMS;
        if (this._time < this._delay) return;

        const maxOffset = (1 / this._cellsCount) * (this._hiddenCellsCount);

        if (Math.abs(this._anchors.y) <= maxOffset) {
            this._anchors.y -= this._speed * app.ticker.deltaTime;
            this._anchors.height -= this._speed * app.ticker.deltaTime;                
        }
    }

    private onAdd() {
        const yStep = 1 / this._cellsCount;
        const count = this._cellsCount + this._hiddenCellsCount;
        for (let i = 0; i < count; i++) {
            const cell = ReelCellAsset.create(ReelCellAsset.getRandomName());
            this._cells.push(cell);

            const y = i * yStep;
            const layout = new Layout({
                anchors: new Rectangle(
                    0,
                    y,
                    1,
                    y + yStep
                ),
                aspect: 1,
                // color: new Color([ Math.random(), Math.random(), Math.random(), 1 ]),
            });
            this._layouts.push(layout);
            
            cell.sprite.x = 0;
            cell.sprite.y = 0;
            cell.sprite.width = layout.width;
            cell.sprite.height = layout.height;
            layout.content.addChild(cell.sprite);

            this.addChild(layout);
        }
    }

    private onRemove() {

    }
}