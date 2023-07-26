import { Application, Container, DisplayObjectEvents } from "pixi.js";

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
