module M22Shooter {

    export class Level1 extends Phaser.State {

        player: M22Shooter.Player

        create() {
            this.player = new M22Shooter.Player(this.game)
        }

        render(){
            if (M22Shooter.Config.DEBUG){
                //this.game.debug.spriteBounds(this.player)
            } else {
            }
        }

    }

} 