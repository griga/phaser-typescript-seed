module Ayasha {

    export class Level1 extends Phaser.State {

        bg:Phaser.TileSprite;
        map:Phaser.Tilemap
        design:Phaser.TilemapLayer
        collisionLayer:Phaser.TilemapLayer
        //player: Ayasha.Player;

        create() {

            this.bg = this.add.tileSprite(0, 0, 800, 600, 'menu-bg')
            //this.bg.tilePosition.set(-50, -50)
            this.bg.fixedToCamera = true

            this.map = this.add.tilemap('map')
            this.map.addTilesetImage('platformer_32_full')
            this.design = this.map.createLayer('design')

            this.collisionLayer = this.map.createLayer('collision')

            this.map.setCollision(135, true, this.collisionLayer)
            this.collisionLayer.resizeWorld()

            //this.player = new Player this.game, this.world.randomX, this.world.randomY            

        }

        render(){
            if (Ayasha.Config.DEBUG){
                this.collisionLayer.visible = true
            } else {
                this.collisionLayer.visible = false

            }
        }

    }

} 