'use client';

import './page.css';

import GamePage from '@/components/GamePage/GamePage';
import { Layout } from '@/game/Layout';
import { AppLayout } from "@/game/AppLayout";
import { Application, Color, Rectangle } from 'pixi.js';

function init(app: Application) {
    /* CREATE LAYOUT */
    const appLayout = new AppLayout(app);
    
    const rootLayout = new Layout({
        anchors: new Rectangle(0, 0, 1, 1),
        color: new Color([0, 0, 0, 1])
    });

    const gameLayout = new Layout({
        anchors: new Rectangle(0, 0, 1, 0.8),
        color: new Color("#030F19")
    });
    
    const footerLayout = new Layout({
        anchors: new Rectangle(0, 0.8, 1, 1),
        color: new Color("#262830")
    });

    appLayout.addChild(rootLayout);
    rootLayout.addChild(gameLayout);
    rootLayout.addChild(footerLayout);
    /* [end] CREATE LAYOUT */
    
    app.stage.addChild(appLayout);
}

function tick(app: Application) {
    
}

function resize(app: Application) {

}

export default function Page() {
    return (
        <GamePage 
            title='Carousel'
            stats={false}
            init={init}
            tick={tick}
            resize={resize}
        />
    );
}