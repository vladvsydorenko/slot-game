'use client';

import './page.css';

import GamePage from '@/components/GamePage/GamePage';
import { Layout } from '@/game/Layout';
import { AppLayout } from "@/game/AppLayout";
import { Application, Color, Rectangle, Text } from 'pixi.js';

function init(app: Application) {
    /* CREATE LAYOUT */
    const appLayout = new AppLayout(app);
    
    const rootLayout = new Layout({
        anchors: new Rectangle(0, 0, 1, 1),
        color: new Color([0, 0, 0, 1])
    });

    const headerLayout = new Layout({
        anchors: new Rectangle(0, 0, 1, 0.1),
        color: new Color("#ECC8AF")
    });

    const gameLayout = new Layout({
        anchors: new Rectangle(0, 0.1, 1, 0.8),
        aspect: 3 / 2,
        color: new Color("#4683AF")
    });

    const footerLayout = new Layout({
        anchors: new Rectangle(0, 0.8, 1, 1),
        color: new Color("#C18C5D")
    });

    appLayout.addChild(rootLayout);

    rootLayout.addChild(headerLayout);
    rootLayout.addChild(footerLayout);
    rootLayout.addChild(gameLayout);

    /* [end] CREATE LAYOUT */

    /* LAYOUT TEXTS */
    headerLayout.content.addChild(new Text(`Header, anchors: (0,0,1,0.1)`, { fontSize: 20 }));
    gameLayout.content.addChild(new Text(`Game, 3/2 aspect ratio`, { fontSize: 20 }));
    footerLayout.content.addChild(new Text(`Footer, anchors: (0,0.8,1,1)`, { fontSize: 20 }));
    /* [end] LAYOUT TEXTS */

    app.stage.addChild(appLayout);
}

function tick(app: Application) {
    
}

function resize(app: Application) {

}

export default function Page() {
    return (
        <GamePage 
            title='Layout'
            stats={false}
            init={init}
            tick={tick}
            resize={resize}
        />
    );
}