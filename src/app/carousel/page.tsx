'use client';

import './page.css';

import GamePage from '@/components/GamePage/GamePage';
import { Application } from 'pixi.js';



function init(app: Application) {

}

function tick(app: Application) {
    
}

function resize(app: Application) {

}

export default function() {
    return (
        <GamePage 
            title='Carousel'
            init={init}
            tick={tick}
            resize={resize}
        />
    );
}