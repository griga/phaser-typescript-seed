/**
 * Created by griga on 2/23/16.
 */


module M22Shooter {
    export class Enemies extends Phaser.Group{

        static MAX_COUNT: Number = 20

        static SPAWN_DELAY: number = 1000
        lastEnemySpawn: number = 0

        constructor(game: Phaser.Game){
            super(game)
            for(let i = 0; i < Enemies.MAX_COUNT; i++) {
                // Create each bullet and add it to the group.
                let enemy = new Enemy(game)
                this.add(enemy);
            }
        }



        spawn(aim: Phaser.Sprite){

            // Enforce a short delay between shots by recording
            // the time that each bullet is shot and testing if
            // the amount of time since the last shot is more than
            // the required delay.
            if (this.game.time.now - this.lastEnemySpawn < Enemies.SPAWN_DELAY) return;
            this.lastEnemySpawn = this.game.time.now;

            if(this.countLiving() == Enemies.MAX_COUNT){
                return
            }


            // Get a dead bullet from the pool
            let enemy = this.getFirstDead();

            // If there aren't any bullets available then don't shoot
            if (enemy === null || enemy === undefined) return;

            // Revive the bullet
            // This makes the bullet "alive"
            enemy.revive();


            // Gun should kill themselves when they leave the world.
            // Phaser takes care of this for me by setting this flag
            // but you can do it yourself by killing the bullet if
            // its x,y coordinates are outside of the world.
            enemy.checkWorldBounds = true;
            enemy.outOfBoundsKill = true;

            // Set the bullet position to the gun position.
            enemy.reset(this.game.world.randomX, 0);
            enemy.rotation = Phaser.Math.angleBetween(enemy.x, enemy.y - 16, aim.x, aim.y)


            // Shoot it in the right direction

            let speed: number = this.game.rnd.integerInRange(100, 300);
            enemy.body.velocity.x = speed * Math.cos(enemy.rotation);
            enemy.body.velocity.y = speed * Math.sin(enemy.rotation) ;

            let scale: number = Math.random() * 2 + .5

            enemy.scale = {x: scale, y: scale}

        }
    }
}