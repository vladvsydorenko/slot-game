'use client';

import './page.css';
import { Sprite, Texture, Container, Application, Filter } from "pixi.js";
import { outlineFragmentShader, outlineVertexShader } from "../../shaders/outline";
import GamePage from '@/components/GamePage/GamePage';

let container: Container;

/**
 * Initialize slots sprites
 */
function initSlots(app: Application) {
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
    Texture.from("/slot-game/images/slot-1.png"),
    Texture.from("/slot-game/images/slot-2.png"),
    Texture.from("/slot-game/images/slot-3.png"),
    Texture.from("/slot-game/images/slot-4.png"),
    Texture.from("/slot-game/images/slot-5.png"),
    Texture.from("/slot-game/images/slot-6.png"),
    Texture.from("/slot-game/images/slot-7.png"),
    Texture.from("/slot-game/images/slot-8.png"),
    Texture.from("/slot-game/images/slot-9.png"),
  ];

  // Prepare outline filter
  const outlineFilter = new Filter(outlineVertexShader, outlineFragmentShader);

  // Set the uniform values for the filter
  outlineFilter.uniforms.uResolution = new Float32Array([app.renderer.width, app.renderer.height]);
  outlineFilter.uniforms.uOutlineColor = new Float32Array([1.0, 1.0, 0.0, 0.1]); // color
  outlineFilter.uniforms.uOutlineThickness = 2; // thickness
  outlineFilter.uniforms.uOutlineAlphacut = 0.9; // alpha cut
  outlineFilter.uniforms.uSmoothness = 0.001; // smoothness
  
  // container for all slot sprites
  container = new Container();
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
function init(app: Application) {
  initSlots(app);
}

function resize(app: Application) {
  container && container.destroy();
  initSlots(app);
}

export default function Page() {
  return (
    <GamePage
      title="Outline Shader"
      // stats={true}
      init={init}
      resize={resize}
    />
  );
}
