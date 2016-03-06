"use strict";

class SeedStage {
  constructor (engine, config) {
    this.engine = engine;
    this.game = engine.game;
    this.env = engine.env;
    this.player = engine.player;
    this._loadConfig(config);
  }

  getState () {
    return {
      preload : this.preload.bind(this),
      create : this.create.bind(this),
      update : this.update.bind(this)
    }
  }

  preload () {
    this.game.stage.smoothed = false;
  }

  create () {
    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Hey",{
       font: "65px Arial", fill: "#ffff00", align: "center"
     });

    text.anchor.set(0.5);

    this.env.create('seed');
    this.player.create('seed', { x: this.game.world.centerX, y: this.game.world.centerY + 100 });

  }

  update () {
    this.player._updateSeed();
  }

  _loadConfig(config){
  }
}

module.exports = SeedStage;
