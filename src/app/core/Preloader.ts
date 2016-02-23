

module M22Shooter {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {

            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'loader');
            this.load.setPreloadSprite(this.preloadBar);

            this.load.image('button', 'graphics/button.png')
            this.load.image('ship', 'graphics/ship.png')
            this.load.image('bullet1', 'graphics/bullet1.png')
            this.load.image('bullet2', 'graphics/bullet2.png')
            this.load.image('bullet3', 'graphics/bullet3.png')

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