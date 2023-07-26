import { solidColorShader } from "@/shaders/solid-color";
import { Color, Container, DisplayObject, Filter, Point, Rectangle, Sprite } from "pixi.js";

export  interface ILayoutProps {
    anchors: Rectangle;
    aspect?: number;
    color?: Color;
}

export class Layout extends Container {
    protected _anchors: ILayoutProps["anchors"];
    protected _aspect: ILayoutProps["aspect"] | null;

    protected _color: Color | null;
    protected _colorSprite: Sprite | null;

    // !hack!, real container to add children
    // todo: fix bounds calculation to avoid additional container
    protected _content: Container;

    // !hack!, real container to add children
    // todo: fix bounds calculation to avoid additional container
    public get content() {
        return this._content;
    }

    public get x() {
        return this.getBounds().x;
    }

    public get y() {
        return this.getBounds().y;
    }

    public get width() {
        return this._width;
    }

    public get height() {
        return this._height;
    }

    public constructor(props: ILayoutProps) {
        super();

        this._anchors = props.anchors;
        this._aspect = props.aspect || null;
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

        this._content = new Container();
        this.addChild(this._content);
    }

    public getBounds(skipUpdate?: boolean | undefined, rect?: Rectangle | undefined): Rectangle {
        var parentBounds = this.parent.getBounds();
        var bounds = parentBounds.clone();
        
        var offsetX = (this._anchors.x * parentBounds.width);
        var offsetY = (this._anchors.y * parentBounds.height);

        bounds.x += offsetX;
        bounds.y += offsetY;

        bounds.width = (this._anchors.width * parentBounds.width) - offsetX;
        bounds.height = (this._anchors.height * parentBounds.height) - offsetY;

        if (this._aspect != null) {
            bounds = Layout.calculateAspectedBounds(bounds, this._aspect);
        }

        return bounds;
    }

    public layout() {
        var bounds = this.getBounds();

        // this.x = bounds.x;
        // this.y = bounds.y;
        this._width = bounds.width;
        this._height = bounds.height;

        this._content.x = bounds.x;
        this._content.y = bounds.y;
        // this._content.width = bounds.width;
        // this._content.height = bounds.height;

        // Background color
        if (this._colorSprite != null) {
            this._colorSprite.x = bounds.x;
            this._colorSprite.y = bounds.y;
            this._colorSprite.width = bounds.width;
            this._colorSprite.height = bounds.height;    
        }
    }

    /* HACK with content container */
    // public getChildAt(index: number): DisplayObject {
    //     return this._content.getChildAt(index);
    // }

    // public getChildByName<T extends DisplayObject = DisplayObject>(name: string, deep?: boolean | undefined): T | null {
    //     return this._content.getChildByName(name, deep);
    // }

    // public getChildIndex(child: DisplayObject): number {
    //     return this._content.getChildIndex(child);
    // }

    // public addChild<U extends DisplayObject[]>(...children: U): U[0] {
    //     return this._content.addChild(...children);
    // }

    // public addChildAt<U extends DisplayObject>(child: U, index: number): U {
    //     return this._content.addChildAt(child, index);
    // }

    // public removeChild<U extends DisplayObject[]>(...children: U): U[0] {
    //     return this._content.removeChild(...children);        
    // }

    // public removeChildAt(index: number): DisplayObject {
    //     return this._content.removeChildAt(index);
    // }
    /* [end] HACK with content container */

    protected onAdded() {
        this.layout();
    }

    protected onRemoved() {
    }

    private static calculateAspectedBounds(bounds: Rectangle, aspectRatio: number) {
        const aspectedBounds = bounds.clone();
        const { width, height } = aspectedBounds;
        const currentAspectRatio = width / height;

        // console.log(currentAspectRatio, aspectRatio);
      
        if (currentAspectRatio > aspectRatio) {
            const newHeight = width / aspectRatio;
            if (newHeight > height) {
                var scale = height / newHeight;
                
                aspectedBounds.width = width * scale;
                aspectedBounds.height = newHeight * scale;
            }
            else {
                aspectedBounds.width = width;
                aspectedBounds.height = newHeight;
            }
        } else {
            const newWidth = height * aspectRatio;
            
            if (newWidth > height) {
                var scale = width / newWidth;
                
                aspectedBounds.width = newWidth * scale;
                aspectedBounds.height = height * scale;
            }
            else {
                aspectedBounds.width = newWidth;
                aspectedBounds.height = height;
            }
        }

        aspectedBounds.x += (bounds.width - aspectedBounds.width) / 2;
        aspectedBounds.y += (bounds.height - aspectedBounds.height) / 2;

        return aspectedBounds;
    }      
}