'use client';

import './page.css';

import GamePage from '@/components/GamePage/GamePage';
import { Layout } from '@/game/Layout';
import { AppLayout } from "@/game/AppLayout";
import { Application, Color, Rectangle, Sprite, Text, Texture } from 'pixi.js';
import { GameAssets } from '@/game/GameAssets';
import { Reel } from '@/game/Reel';

let appLayout: AppLayout;
const reels: Reel[] = [];

function init(app: Application) {
    /* CREATE LAYOUT */
    appLayout = new AppLayout(app);
    
    const rootLayout = new Layout({
        anchors: new Rectangle(0, 0, 1, 1),
        color: new Color([0, 0, 0, 1])
    });

    const headerLayout = new Layout({
        anchors: new Rectangle(0, 0, 1, 0.1),
        color: new Color("#373F47")
    });

    const gameLayout = new Layout({
        anchors: new Rectangle(0, 0, 1, 0.9),
        aspect: 3 / 2,
        color: new Color("#4683AF")
    });

    const footerLayout = new Layout({
        anchors: new Rectangle(0, 0.9, 1, 1),
        color: new Color("#373F47")
    });

    appLayout.addChild(rootLayout);

    rootLayout.addChild(gameLayout);
    // rootLayout.addChild(headerLayout);
    rootLayout.addChild(footerLayout);

    /* [end] CREATE LAYOUT */

    /* REEL LAYOUT */
    const reelLayout1 = new Layout({
        anchors: new Rectangle(0, 0, 0.33, 1),
        color: new Color("#8B8982")
    });
    const reelLayout2 = new Layout({
        anchors: new Rectangle(0.33, 0, 0.66, 1),
        color: new Color("#6C91C2")
    });
    const reelLayout3 = new Layout({
        anchors: new Rectangle(0.66, 0, 1, 1),
        color: new Color("#C3C9E9")
    });

    gameLayout.addChild(reelLayout1);
    gameLayout.addChild(reelLayout2);
    gameLayout.addChild(reelLayout3);
    /* [end] REEL LAYOUT */

    for (let i = 0; i < 9; i++) {
        const src = `/slot-game/images/slot-${i + 1}.png`;
        GameAssets.setTexture(src, Texture.from(src));
    }

    [reelLayout1, reelLayout2, reelLayout3].forEach((layout, index) => {
        const reel = new Reel({
            anchors: new Rectangle(0, 0, 1, 1),
            cells: 3,
            delay: index * 250,
            hiddenCells: 12,
        });
        reels.push(reel);
        layout.addChild(reel);    
    });

    appLayout.layout();

    /* REAL BUTTON */

    var buttonLayout = new Layout({
        anchors: new Rectangle(0, 0, 1, 1),
        aspect: 1
    });
    footerLayout.addChild(buttonLayout);

    const button = Sprite.from("/slot-game/images/repeat.png");
    button.interactive = true;
    // button.eventMode = "dynamic";
    button.on("pointerdown", () => {
        reels.forEach(reel => {
            reel.reset();
        });
    });
    button.width = buttonLayout.width;
    button.height = buttonLayout.height;
    buttonLayout.content.addChild(button);

    /* [end] REEL BUTTON */

    /* LAYOUT TEXTS */
    // headerLayout.content.addChild(new Text(`Burning Wins`, { fontSize: 20 }));
    // gameLayout.content.addChild(new Text(`Game, 3/2 aspect ratio`, { fontSize: 20 }));
    // footerLayout.content.addChild(new Text(`Spin to win!`, { fontSize: 20 }));
    /* [end] LAYOUT TEXTS */

    app.stage.addChild(appLayout);
}

function tick(app: Application) {
    reels.forEach(reel => reel.tick(app));
    appLayout.layout();
}

function resize(app: Application) {

}

export default function Page() {
    return (
        <GamePage 
            title='Reels'
            stats={false}
            init={init}
            tick={tick}
            resize={resize}
        />
    );
}