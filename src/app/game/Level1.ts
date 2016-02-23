module M22Shooter {

    export class Level1 extends Phaser.State {

        player:Player

        enemies:Enemies

        statusHealth:Phaser.BitmapText
        statusScore:Phaser.BitmapText
        statusOver:Phaser.BitmapText
        scoreOver:Phaser.BitmapText
        pressStart:Phaser.BitmapText

        explosions:Explosions
        score:number = 0


        create() {

            this.score = 0
            this.player = new Player(this.game)

            this.enemies = new Enemies(this.game)

            this.explosions = new Explosions(this.game)

            this.statusHealth = this.game.add.bitmapText(8, 8, 'informa', this.player.getHealthText())

            this.statusScore = this.game.add.bitmapText(8, 40, 'informa', 'Score: ' + this.score)

            this.statusOver = this.game.add.bitmapText(0, 220, 'informa', 'GAME OVER', 80)
            this.statusOver.visible = false
            this.statusOver.x = (this.game.width - this.statusOver.width) / 2

            this.scoreOver = this.game.add.bitmapText(0, 300, 'informa', 'Your score: ' + this.score, 50)
            this.scoreOver.visible = false

            this.pressStart = this.game.add.bitmapText(0, 550, 'informa', 'Press SPACEBAR to start again', 40)
            this.pressStart.visible = false
            this.pressStart.x = (this.game.width - this.pressStart.width) / 2
        }

        restart() {

            this.score = 0

            this.enemies.forEach((enemy)=> {
                setTimeout(()=> {
                    enemy.kill();
                    this.explosions.boom(enemy.x, enemy.y)
                }, this.game.rnd.integerInRange(100, 300))

            }, this, true)

            setTimeout(()=> {
                this.player.revive(1)
                this.statusOver.visible = false
                this.scoreOver.visible = false
                this.pressStart.visible = false
                this.statusScore.visible = true
                this.statusHealth.visible = true
            }, 350)


        }


        update() {
            this.enemies.spawn(this.player)
            this.game.physics.arcade.overlap(this.player.gun, this.enemies, this.collisionHandler, null, this);
            this.game.physics.arcade.overlap(this.enemies, this.player, this.enemyHitsPlayer, null, this);

            this.updateStatus()
        }

        collisionHandler(bullet:Phaser.Sprite, enemy:Phaser.Sprite) {
            this.score += Math.floor(enemy.scale.x * 1000)
            bullet.kill();
            enemy.kill();
            this.explosions.boom(enemy.x, enemy.y)
        }

        enemyHitsPlayer(player:Player, enemy:Enemy) {
            player.enemyHit(enemy)
            this.explosions.boom(enemy.x, enemy.y)

            if (player.health < 0) {
                this.explosions.boom(player.x, player.y)
                player.kill()
                this.gameOver();
            }


        }

        updateStatus() {
            this.statusHealth.text = this.player.getHealthText()
            this.statusScore.text = 'Score: ' + this.score
        }

        gameOver() {
            this.statusHealth.visible = false
            this.statusScore.visible = false
            this.statusOver.visible = true
            this.pressStart.visible = true
            this.scoreOver.text = 'Your score: ' + this.score
            this.scoreOver.x = this.game.width / 2 - this.scoreOver.width / 2
            this.scoreOver.visible = true

            let spaceBarStart = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            spaceBarStart.onDown.addOnce(this.restart, this);
        }

        render() {
            if (M22Shooter.Config.DEBUG) {
                //this.game.debug.spriteBounds(this.player)
            } else {

            }
        }


    }

} 