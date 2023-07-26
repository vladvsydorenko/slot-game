import { solidColorShader } from "@/shaders/solid-color";
import { Color, Container, Filter, Rectangle, Sprite } from "pixi.js";

export  interface ILayoutProps {
    anchors: Rectangle;
    color?: Color;
}

export class Layout extends Container {
    protected _anchors: ILayoutProps["anchors"];

    protected _color: Color | null;
    protected _colorSprite: Sprite | null;

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    public constructor(props: ILayoutProps) {
        super();

        this._anchors = props.anchors;
        this._color = props.color || null;

        this.on("added", this.onAdded.bind(this));
        this.on("removed", this.onRemoved.bind(this));

        // Background color
        this._colorSprite = null;
        if (this._color){
            this._colorSprite = new Sprite();
            this._colorSprite.filters = [new Filter(undefined, solidColorShader, {
                uColor: this._color.toArray()
            })];
            this.addChild(this._colorSprite);    
        }
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        console.log("get bounds 2");

        var parentBounds = this.parent.getBounds();
        var bounds = parentBounds.clone();
        
        var offsetX = (this._anchors.x * parentBounds.width);
        var offsetY = (this._anchors.y * parentBounds.height);

        bounds.x += offsetX;
        bounds.y += offsetY;

        bounds.width = (this._anchors.width * parentBounds.width) - offsetX;
        bounds.height = (this._anchors.height * parentBounds.height) - offsetY;

        return bounds;
    }

    public layout() {
        console.log("Do layout");
        var bounds = this.getBounds();

        // Background color
        if (this._colorSprite != null) {
            this._colorSprite.x = bounds.x;
            this._colorSprite.y = bounds.y;
            this._colorSprite.width = bounds.width;
            this._colorSprite.height = bounds.height;    
        }
    }

    protected onAdded() {
        this.layout();
    }

    protected onRemoved() {
    }
}
