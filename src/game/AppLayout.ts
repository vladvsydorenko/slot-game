import { Application, Container, Rectangle } from "pixi.js";
import { Layout } from "./Layout";

export class AppLayout extends Container {
    private _app: Application;
    private _layoutListener: () => void;

    public get width() {
        return this._app.view.width;
    }

    public get height() {
        return this._app.view.height;
    }

    public constructor(app: Application) {
        super();
        this._app = app;
        this._layoutListener = this.layout.bind(this);

        this.on("added", this.onAdded.bind(this));
        this.on("removed", this.onRemoved.bind(this));
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        console.log("get bounds");
        return new Rectangle(0, 0, this._app.view.width, this._app.view.height);
    }

    protected layoutChildren(container: Container) {
        for (const child of container.children) {
            if (child instanceof Layout) {
                child.layout();
            }

            // If the child is another container, recursively traverse its children
            if (child instanceof Container) {
                this.layoutChildren(child);
            }
        }
    }

    protected layout() {
        this.layoutChildren(this);
    }

    protected onAdded() {
        this._app.renderer.addListener("resize", this._layoutListener);
        window.addEventListener("resize", this._layoutListener);
    }

    protected onRemoved() {
        this._app.renderer.removeListener("resize", this._layoutListener);
        window.removeEventListener("resize", this._layoutListener);
    }
}
