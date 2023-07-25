'use client';

import Link from "next/link";

/**
 * Just a default next.js home element with container for pixi
 * @returns 
 */
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col justify-center items-center">
      <Link href="/carousel">Carousel</Link>
      <Link href="/outline-shader">Outline Shader</Link>
    </main>
  )
}