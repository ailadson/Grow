"use strict";

class PreloadStage {
  constructor(engine, config){
    this.engine = engine;
    this.game = engine.game;
    this.env = engine.env;
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
    this.env.preload();
    this.player.preload();
  }

  create(){
    this.game.state.start('seed');
  }

  _loadConfig(config){
  }
}

module.exports = PreloadStage;
