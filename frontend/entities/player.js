"use strict";
var Util = require("../util.js");
var Entity = require("./entity.js");
var UpgradeManager = require("./upgrade_manager.js");

class Player extends Entity {
  constructor(engine, config){
    super(engine, config);

    this.upgrade = new UpgradeManager(this, config.upgrades);
    this.stage = config.stage || 'seed';

    this.creates = {
      seed : this._createSeed.bind(this)
    }

    this.updates = {
      seed : this._updateSeed.bind(this)
    }

    this.age = 0;
  }

  preload () {
    this.game.load.image('seed', this.config.seed);
    // this.game.load.image('trunk', )
    // this.game.load.image('root', )
    // this.game.load.image('stem', )
    // this.game.load.image('branch', )
    // this.game.load.image('flower', )
  }

  create(key){
    this.creates[key](...[].slice.call(arguments, 1));
  }

  update(key){
    this.updates[key](...[].slice.call(arguments, 1));
  }

  start () {
    var tween = this.game.add.tween(this.seed.scale);
    tween.to({ x : 0.5, y : 0.5 }, 2000);
    tween.start();
  }

  addCost (cost) {
    
  }


  // seed methods
  _createSeed (pos) {
    this.seed = this.game.add.sprite(pos.x, pos.y, 'seed');
    this.seed.smoothed = false;
    this.seed.inputEnabled = true;
    this.seed.input.useHandCursor = true;
    this.seedSize = 0;
    this.seed.rotation = 4;

    this.isSeedGrowing = false;
    this.remainingSeedGrowth = 0;

    this.startWindTween(Math.random() - 0.5);
  }

  _updateSeed () {
    this.growSeed();
  }

  // set seedRotation (amount) {
  //     this.seed.rotation = amount;
  // }

  set seedSize (size) {
    this.seed.scale.setTo(size);
  }

  get seedSize () {
    return this.seed.scale.x;
  }

  startWindTween (amount) {
    var nextRot = this.seed.rotation + amount;
    var windSpeed = Util.mapRange(this.env.beaufortScale, 0, 12, 2000, 50);
    var windForce = 1;//Util.mapRange(window.beaufortScale, 0, 12, 5, 1);

    if(nextRot > 3.7 && nextRot < 5){
      var tween = this.game.add.tween(this.seed);
      tween.to({ rotation : nextRot}, windSpeed);
      tween.onComplete.add(this.startWindTween.bind(this, (Math.random() - 0.5)/windForce), this);
      this.activeTweens.push(tween);
      tween.start()
    } else {
      this.startWindTween((Math.random() - 0.5)/windForce);
    }
  }

  startGrowthTween (amount) {
    var tween = this.game.add.tween(this.seed.scale);
    tween.to({ x : this.seed.scale.x + amount, y : this.seed.scale.y + amount }, 1200000);
    tween.onComplete.add(function(){
      this.isSeedGrowing = false;
    }, this);
    this.isSeedGrowing = true;
    this.activeTweens.push(tween);
    tween.start();
  }

  growSeed () {
    if(!this.isSeedGrowing && this.remainingSeedGrowth > 0){
      this.remainingSeedGrowth--;
      this.startGrowthTween(0.5);
    }
  }




  _createTrunk () {
    this.trunks = engine.game.add.group();
  }

  _createRoot () {
    this.roots = engine.game.add.group();
  }

  _createStem () {
    this.branches = engine.game.add.group();
  }

  _createBranch () {
    this.branches = engine.game.add.group();
  }

  _createFlower () {
    this.flowers = engine.game.add.group();
  }
}

window.beaufortScale = 0;

module.exports = Player;
