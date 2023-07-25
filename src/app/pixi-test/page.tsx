'use client';

import './page.css';
import * as PIXI from "pixi.js";
import { Sprite, Texture, Ticker, Container, UPDATE_PRIORITY } from "pixi.js";
import { useEffect, useRef } from "react";
import { outlineFragmentShader, outlineOriginalShader, outlineVertexShader, smoothOutlineFragmentShader } from "./shaders/outline";
import { addStats, Stats } from 'pixi-stats';
import { Header } from '@/components/Header/Header';

let initialized = false;
let initializedElement: HTMLElement;
let app: PIXI.Application<HTMLCanvasElement>;

/**
 * Show stats (fps, memory, draw calls etc)
 */
function initStats() {
  const stats = addStats(document, app);
  const ticker = Ticker.shared;
  ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY);
}

/**
 * Initialize slots sprites
 */
function initSlots() {
  // Calculate slot size and offset for game grid
  
  // grid size in x and y axis
  const gridSize = 3;
  const size = {
    width: app.renderer.width,
    height: app.renderer.height
  };

  const smallerSize = Math.min(size.width, size.height);
  const spriteSize = smallerSize / gridSize;

  const widthRest = size.width - smallerSize;
  const heightRest = size.height - smallerSize;

  const widthOffset = widthRest / 2;
  const heightOffset = heightRest / 2;

  // Prepare slot textures
  const slots = [
    Texture.from("/images/slot-1.png"),
    Texture.from("/images/slot-2.png"),
    Texture.from("/images/slot-3.png"),
    Texture.from("/images/slot-4.png"),
    Texture.from("/images/slot-5.png"),
    Texture.from("/images/slot-6.png"),
    Texture.from("/images/slot-7.png"),
    Texture.from("/images/slot-8.png"),
    Texture.from("/images/slot-9.png"),
  ];

  // Prepare outline filter
  const outlineFilter = new PIXI.Filter(outlineVertexShader, outlineFragmentShader);

  // Set the uniform values for the filter
  outlineFilter.uniforms.uResolution = new Float32Array([app.renderer.width, app.renderer.height]);
  outlineFilter.uniforms.uOutlineColor = new Float32Array([1.0, 1.0, 0.0, 0.1]); // color
  outlineFilter.uniforms.uOutlineThickness = 1; // thickness
  outlineFilter.uniforms.uOutlineAlphacut = 0.9; // alpha cut
  outlineFilter.uniforms.uSmoothness = 0.001; // smoothness
  
  // container for all slot sprites
  const container = new Container();
  // attach filter to the container for performance reasons
  // read about BatchRenderer that allows you to make batchable containers
  container.filters = [outlineFilter];

  // Create the game grid
  for (let x = 0; x < 3; x++) {
    const xOffset = widthOffset + x * spriteSize;

    for (let y = 0; y < 3; y++) {
      const yOffset = heightOffset + y * spriteSize;

      const sprite = new Sprite(slots[x * 3 + y]);

      sprite.anchor.set(0);

      sprite.x = xOffset;
      sprite.y = yOffset;

      sprite.width = spriteSize;
      sprite.height = spriteSize;

      // don't use filter on each sprite beacause it will increase draw calls dramatically.
      // from 1 to 18 for 9 sprites!
      // it's better to make a shader for the container of all sprites that will use only 2 draw calls.
      // --> sprite.filters = [outlineFilter];
      container.addChild(sprite);
    }

    app.stage.addChild(container);
  }
}

/**
 * Initialize pixi app
 * @param element Pixi app container
 * @returns 
 */
function init(element: HTMLElement) {
  if (initialized && element == initializedElement) return;

  initialized = true;
  initializedElement = element; 
  element.innerHTML = "";

  app = new PIXI.Application<HTMLCanvasElement>({ 
    background: '#000', 
    resizeTo: element,
    antialias: true,
  });

  element.append(app.view);

  app.ticker.add(update);

  initSlots();
  // initStats();
}

function update() {
  // console.log(app.ticker.FPS);
}

/**
 * Just a default next.js home element with container for pixi
 * @returns 
 */
export default function Home() {
  var ref = useRef<any>();

  useEffect(() => {
    init(ref.current);
  });

  return (
    <main className="flex min-h-screen flex-col items-center items-stretch">
      <Header title='Slot Game grid (with custom outline shader)'></Header>

      <div ref={ref} className="game-container flex flex-grow">Game will be here</div>

      {/* <div className="game-footer">
        <h1>Enjoy to play it!</h1>
      </div> */}

    </main>
  )
}
