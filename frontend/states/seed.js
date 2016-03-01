"use strict";

class SeedStage {
  constructor(engine, config){
    this.engine = engine;
    this.game = engine.game;
    this.player = engine.player;
    this._loadConfig(config);
  }

  getState(){
    return {
      preload : this.preload.bind(this),
      create : this.create.bind(this)
    }
  }

  preload(){

  }

  create(){
    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Hey",{
       font: "65px Arial", fill: "#ffff00", align: "center"
     });

    text.anchor.set(0.5);
  }

  _loadConfig(config){
  }
}

module.exports = SeedStage;
