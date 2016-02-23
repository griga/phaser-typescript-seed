/**
 * Created by griga on 2/23/16.
 */


module M22Shooter {
    export class Explosions extends Phaser.Group {

        explosionSound: Phaser.Sound;

        constructor(game: Phaser.Game){
            super(game)
            this.createMultiple(30, 'kaboom')
            this.explosionSound = this.game.add.audio('explosion');

            this.forEach((explosion)=>{
                explosion.anchor.set(.5, .5)
                explosion.animations.add('kaboom')

            }, this)

        }

        boom(x: number, y: number){
            let explosion = this.getFirstDead()
            explosion.reset(x, y)
            explosion.play('kaboom', 30, false, true)
            this.explosionSound.play()
        }




    }
}