'use client';

import './GamePage.css';

import { useEffect, useRef } from "react";
import { GamePageHeader } from "../GamePageHeader/GamePageHeader";
import { Application, Ticker, UPDATE_PRIORITY } from 'pixi.js';
import { addStats } from 'pixi-stats';

let initializedElement: HTMLElement;
let app: Application;

function initStats(app: Application) {
  const stats = addStats(document, app);
  const ticker = Ticker.shared;
  ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);
}

export interface IGamePageProps {
  // user friendly title of the page shown in header
  title?: string;
  // additional content for the header
  header?: React.ReactNode; 
  // whether to show stats
  stats?: boolean;
  // called when pixi app is created and attached
  init?: (app: Application) => void;
  // called each tick
  tick?: (app: Application) => void;
  // called when pixi app is resized
  resize?: (app: Application) => void;
}

/**
 * Just a default next.js home element with container for pixi
 * @returns 
 */
export default function GamePage({ title, header: titleContent, stats, init, tick, resize }: IGamePageProps) {
    const ref = useRef<any>();
  
    useEffect(() => {
      const element = ref.current as HTMLElement;
      if (element == initializedElement) return;

      initializedElement = element; 
      element.innerHTML = "";
    
      if (app) app.destroy();

      app = new Application({ 
        background: '#000', 
        resizeTo: element,
        antialias: true,
      });
      
      element.append(app.view as any);

      init && init(app);
      tick && app.ticker.add(() => tick(app));

      if (stats) initStats(app);

      let timeoutId: any;
      let ignoreResize = false;
      resize && app.renderer.on("resize", () => {
        if (ignoreResize) return;

        timeoutId && clearTimeout(timeoutId);

        (app.view.style as any).display = "none";

        timeoutId = setTimeout(() => {
          var width = element.offsetWidth;
          var height = element.offsetHeight;

          (app.view.style as any).display = "";

          if (width < app.view.width || height < app.view.height){
            ignoreResize = true;
            app.renderer.resize(width, height);
            ignoreResize = false;
          }

          resize(app);
        }, 200);
      });
    });
  
    return (
      <main className="flex min-h-screen flex-col items-center items-stretch">
        <GamePageHeader title={title}>{titleContent}</GamePageHeader>
        <div ref={ref} className="game-container flex flex-grow">Game will be here</div>  
      </main>
    )
  }