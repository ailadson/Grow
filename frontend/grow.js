"use strict";

var BootStage = require("./states/boot");
var PreloadStage = require("./states/preload");
var SeedStage = require("./states/seed");
var ProtoEnv = require("./env/proto_env");
var Tree = require("./entities/player");
var Hub = require("./hub");

class Grow {
  constructor(width, height, config){
    this.currentStage = config.currentStage || null;
    this.game = new Phaser.Game(width, height, Phaser.AUTO, 'grow');
    this.env = new ProtoEnv(this, config.env);
    this.player = new Tree(this, config.player);
    this.hub = new Hub(this);

    this.stages = {
      'boot' : new BootStage(this, config.stage.boot),
      'preload' : new PreloadStage(this, config.stage.preload),
      'seed' : new SeedStage(this, config.stage.seed)
      // ,
      // 'falling' : new PreloadStage(game, player, config.falling),
      // 'root' : new PreloadStage(game, player, config.root),
      // 'sapling' : new PreloadStage(game, player, config.sapling),
    };

    this._loadStages();

    this.gameStarted = config.gameStarted || false;
    this.tutorial = false;

    this.isSpedUp = false;

    this.game.state.start('boot');
  }

  speedUpGame () {
    this.player.speedUpTweens(100);
    this.env.speedUpTweens(100);
  }

  slowDownGame () {
    this.player.slowDownTweens();
    this.env.slowDownTweens();
  }

  _loadStages(){
    for(var stage in this.stages){
      this.game.state.add(stage, this.stages[stage].getState());
    }
  }
}

module.exports = Grow;
