

module M22Shooter {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'loader');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('button', 'assets/graphics/button.png')
            this.load.image('ship', 'assets/graphics/ship.png')
            this.load.image('bullet1', 'assets/graphics/bullet1.png')
            this.load.image('bullet2', 'assets/graphics/bullet2.png')
            this.load.image('bullet3', 'assets/graphics/bullet3.png')
            this.load.image('enemy1', 'assets/graphics/enemy1.png')
            this.load.image('enemy2', 'assets/graphics/enemy2.png')
            this.load.image('enemy3', 'assets/graphics/enemy3.png')

            this.load.bitmapFont('informa', 'assets/fonts/informa.png', 'assets/fonts/informa.xml');

            this.load.spritesheet('kaboom', 'assets/graphics/explode.png', 128, 128);

            this.load.audio('explosion', 'assets/audio/explosion.mp3');
            this.load.audio('blaster', 'assets/audio/blaster.mp3');
            this.load.audio('laser', 'assets/audio/laser.wav');
        }

        create() {

            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            this.game.state.start('Level1', true, false);

        }

    }

}