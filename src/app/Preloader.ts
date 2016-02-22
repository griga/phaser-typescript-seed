module Ayasha {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'loader');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.image('menu-bg', 'graphics/menu-bg.jpg');
            this.load.spritesheet('cat', 'graphics/cat-sheet.png', 40, 32, 0);


        this.load.tilemap('map', 'graphics/tiled/aya001.json', null, Phaser.Tilemap.TILED_JSON)
            this.load.image('platformer_32_full', 'graphics/tiled/platformer_32_full.png' )
            //this.load.image('level1', 'assets/level1.png');

        }

        create() {

            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}