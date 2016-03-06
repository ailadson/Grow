"use strict";

class ProtoEnv {
  constructor(engine, config){
    this.game = engine.game;
    this.sky = config.sky;
    this.ground = config.ground || null;

    this.beaufortScale = 3;

    this.creates = {
      seed : this._createSeed.bind(this)
    }
  }

  preload(){
    this.game.load.image('sky', this.sky);
    this.game.load.image('ground', this.ground);
  }

  create(key){
    this.creates[key]();
  }


  //*******seed private
  _createSeed (cb) {
    this._createSeedBackground();
    this._createSeedGround();
  }

  _createSeedBackground () {
    this.sky = this.game.add.sprite(0, 0, 'sky');
    this.sky.scale.setTo(25,22);
  }

  _createSeedGround(){
    this.ground = this.game.add.sprite(0, 0, 'ground');
    this.ground.anchor.setTo(0,1);
    this.ground.y = this.game.world.height;
    this.ground.scale.setTo(10, 7);
    this.ground.smoothed = false;
  }
}

module.exports = ProtoEnv;
