'use client';

import Link from "next/link";

/**
 * Just a default next.js home element with container for pixi
 * @returns 
 */
export default function HomePage() {
  return (
    <main className="main-links flex min-h-screen flex-col justify-center items-stretch text-lg">
      <h1>Choose a demo</h1>
      {/* <Link href="/carousel">Carousel</Link> */}
      <Link href="/layout">Layout</Link>
      <Link href="/outline-shader">Outline Shader</Link>
    </main>
  )
}
