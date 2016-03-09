"use strict";

var Util = require("../util");

class ProtoEnv {
  constructor(engine, config){
    this.game = engine.game;
    this._loadConfig(config);


    this.beaufortScale = 3;

    this.creates = {
      seed : this._createSeed.bind(this)
    }
  }

  preload(){
    this.game.load.image('sky', this.sky);
    this.game.load.image('night', this.night);
    this.game.load.image('ground', this.ground);
  }

  create(key){
    this.creates[key]();
  }

  speedUpTweens (amount) {
    if(this.dayFade){
      this.dayFade.timeScale = amount;
    }

    if(this.dayFade){
      this.nightFade.timeScale = amount;
    }
  }

  slowDownTweens () {
    if(this.dayFade){
      this.dayFade.timeScale = 1;
    }

    if(this.dayFade){
      this.nightFade.timeScale = 1;
    }
  }

  _loadConfig (config) {
    this.sky = config.sky;
    this.night = config.night;
    this.ground = config.ground;
  }

  //*******seed private
  _createSeed (cb) {
    this._createSeedBackground();
    this._createSeedGround();
  }

  _createSeedBackground () {
    this.night = this.game.add.sprite(0, 0, 'night');
    this.night.scale.setTo(25,22);

    this.sky = this.game.add.sprite(0, 0, 'sky');
    this.sky.scale.setTo(25,22);

    this._createDayFadeTween();
    this._createNightFadeTween();

    this.dayFade.start();
  }

  _createDayFadeTween () {
    var tween = this.game.add.tween(this.sky);
    tween.to({ alpha : 0 }, Util.inDays(1));
    tween.onComplete.add(function(){
      this.sky.sendToBack();
      this.sky.alpha = 1;
      this.nightFade.delay(1000);
      this.nightFade.start();
    }, this);

    this.dayFade = tween;
  }

  _createNightFadeTween () {
    var tween = this.game.add.tween(this.night);
    tween.to({ alpha : 0 }, Util.inDays(1));
    tween.onComplete.add(function(){
      this.night.sendToBack();
      this.night.alpha = 1;
      this.dayFade.delay(1000);
      this.dayFade.start();
    }, this);

    this.nightFade = tween;
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
