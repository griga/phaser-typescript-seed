module M22Shooter {

    export class Player extends Phaser.Sprite {

        gun: M22Shooter.Gun
        constructor(game:Phaser.Game) {

            let x:number = game.width / 2 - 20;
            let y:number = game.height - 75;

            super(game, x, y, 'ship');

            game.add.existing(this);
            game.physics.enable(this, Phaser.Physics.ARCADE)

            this.anchor.set(.5, .5)

            this.angle = 0; // Point the ship up


            this.gun = new M22Shooter.Gun(game, this)

        }


        update() {

            if (this.x > this.game.width) this.x = 0;
            if (this.x < 0) this.x = this.game.width;
            if (this.y > this.game.height) this.y = 0;
            if (this.y < 0) this.y = this.game.height;

            this.body.velocity.x = 0;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                if (this.angle >= -23) {
                    this.angle -= 1 / 2;
                    this.scale.x += Phaser.Math.sign(this.angle) * 0.005
                }


            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

                this.body.velocity.x = 150;
                if (this.angle <= 23) {
                    this.angle += 1 / 2;
                    this.scale.x -= Phaser.Math.sign(this.angle) * 0.005
                }
            }
            else {
                this.body.velocity.x = 0;

                if (this.angle != 0) {
                    this.angle -= Phaser.Math.sign(this.angle) / 2
                }
                if (this.scale.x != 1) {
                    this.scale.x += 0.005
                }
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.gun.shoot()
            }
        }
    }
}