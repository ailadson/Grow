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
    this.game.input.keyboard.onDownCallback = function(e){
      if(e.code === "Space"){
        this.engine.speedUpGame();
      }
    }.bind(this);

    this.game.input.keyboard.onUpCallback = function(e){
      if(e.code === "Space"){
        this.engine.slowDownGame();
      }
    }.bind(this);

    this.game.state.start('seed');
  }

  _loadConfig(config){
  }
}

module.exports = PreloadStage;
