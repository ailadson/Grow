"use strict";

var BootStage = require("./states/boot");
var PreloadStage = require("./states/preload");
var SeedStage = require("./states/seed");

class Grow {
  constructor(config){
    this.currentStage = config.currentStage || null;
    this.game = new Phaser.Game(600, 800, Phaser.AUTO, 'grow');
    // this.player = new Tree(this, config.player);

    this.stages = {
      'boot' : new BootStage(this, config.boot),
      'preload' : new PreloadStage(this, config.preload),
      'seed' : new SeedStage(this, config.seed)
      // ,
      // 'falling' : new PreloadStage(game, player, config.falling),
      // 'root' : new PreloadStage(game, player, config.root),
      // 'sapling' : new PreloadStage(game, player, config.sapling),
    };

    this.loadStages();

    this.game.state.start('boot');
  }

  loadStages(){
    for(var stage in this.stages){
      this.game.state.add(stage, this.stages[stage].getState());
    }
  }
}

module.exports = Grow;
