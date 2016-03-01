"use strict";

class BootStage {
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
    this.game.state.start('preload');
  }

  _loadConfig(config){
  }
}

module.exports = BootStage;
