/// <reference path="../phaser/typescript/phaser.d.ts" />

"use strict";

module Ayasha {
    export class Game extends Phaser.Game{
        constructor(){
            super({
                width: 800,
                height: 600,
                parent: 'game-canvas',
                renderer: Phaser.AUTO,
                state: null
            });
            this.state.add('Boot', Boot, false)
            this.state.add('Preloader', Preloader, false)
            this.state.add('MainMenu', MainMenu, false)
            this.state.add('Level1', Level1, false)

            this.state.start('Boot')
        }
    }
}
