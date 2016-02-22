'use strict';
window.onload = function () {
    var game = new Ayasha.Game();
};
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Ayasha;
(function (Ayasha) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('loader', 'graphics/loader.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                this.scale.pageAlignHorizontally = true;
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            else {
                //  In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
                this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.scale.minWidth = 480;
                this.scale.minHeight = 260;
                this.scale.maxWidth = 1024;
                this.scale.maxHeight = 768;
                this.scale.forceLandscape = true;
                this.scale.pageAlignHorizontally = true;
                this.scale.refresh();
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Ayasha.Boot = Boot;
})(Ayasha || (Ayasha = {}));
/**
 * Created by griga on 2/21/16.
 */
var Ayasha;
(function (Ayasha) {
    Ayasha.Config = {
        DEBUG: false
    };
})(Ayasha || (Ayasha = {}));
/// <reference path="../phaser/typescript/phaser.d.ts" />
"use strict";
var Ayasha;
(function (Ayasha) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, {
                width: 800,
                height: 600,
                parent: 'game-canvas',
                renderer: Phaser.AUTO,
                state: null
            });
            this.state.add('Boot', Ayasha.Boot, false);
            this.state.add('Preloader', Ayasha.Preloader, false);
            this.state.add('MainMenu', Ayasha.MainMenu, false);
            this.state.add('Level1', Ayasha.Level1, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Ayasha.Game = Game;
})(Ayasha || (Ayasha = {}));
var Ayasha;
(function (Ayasha) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        //player: Ayasha.Player;
        Level1.prototype.create = function () {
            this.bg = this.add.tileSprite(0, 0, 800, 600, 'menu-bg');
            //this.bg.tilePosition.set(-50, -50)
            this.bg.fixedToCamera = true;
            this.map = this.add.tilemap('map');
            this.map.addTilesetImage('platformer_32_full');
            this.design = this.map.createLayer('design');
            this.collisionLayer = this.map.createLayer('collision');
            this.map.setCollision(135, true, this.collisionLayer);
            this.collisionLayer.resizeWorld();
            //this.player = new Player this.game, this.world.randomX, this.world.randomY            
        };
        Level1.prototype.render = function () {
            if (Ayasha.Config.DEBUG) {
                this.collisionLayer.visible = true;
            }
            else {
                this.collisionLayer.visible = false;
            }
        };
        return Level1;
    })(Phaser.State);
    Ayasha.Level1 = Level1;
})(Ayasha || (Ayasha = {}));
"use strict";
var Ayasha;
(function (Ayasha) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'menu-bg');
            this.background.alpha = 0;
            //this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            //this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            //this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            var tween = this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            //var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    Ayasha.MainMenu = MainMenu;
})(Ayasha || (Ayasha = {}));
var Ayasha;
(function (Ayasha) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'simon', 0);
            this.anchor.setTo(0.5, 0);
            this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
            game.add.existing(this);
            game.physics.enable(this);
        }
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.frame = 0;
            }
        };
        return Player;
    })(Phaser.Sprite);
    Ayasha.Player = Player;
})(Ayasha || (Ayasha = {}));
var Ayasha;
(function (Ayasha) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(200, 250, 'loader');
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.image('menu-bg', 'graphics/menu-bg.jpg');
            this.load.spritesheet('cat', 'graphics/cat-sheet.png', 40, 32, 0);
            this.load.tilemap('map', 'graphics/tiled/aya001.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('platformer_32_full', 'graphics/tiled/platformer_32_full.png');
            //this.load.image('level1', 'assets/level1.png');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Ayasha.Preloader = Preloader;
})(Ayasha || (Ayasha = {}));
