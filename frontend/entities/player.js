"use strict";
var Util = require("../util.js");
var Entity = require("./entity.js");

class Player extends Entity {
  constructor(engine, config){
    super(engine, config);

    this.creates = {
      seed : this._createSeed.bind(this)
    }

    this.updates = {
      seed : this._updateSeed.bind(this)
    }
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


  // seed methods
  _createSeed (pos) {
    this.seed = this.game.add.sprite(pos.x, pos.y, 'seed');
    this.seed.smoothed = false;

    this.seedSize = 0.1;
    this.seed.rotation = 4;

    this.startWindTween(Math.random() - 0.5);
  }

  _updateSeed () {
  //   this.rotateSeed((Math.random() - 0.5)/5);
  }

  // set seedRotation (amount) {
  //     this.seed.rotation = amount;
  // }

  set seedSize (size) {
    this.seed.scale.setTo(size);
  }

  startWindTween (amount) {
    var nextRot = this.seed.rotation + amount;
    var windSpeed = Util.mapRange(this.env.beaufortScale, 0, 12, 2000, 50);
    var windForce = 1;//Util.mapRange(window.beaufortScale, 0, 12, 5, 1);

    if(nextRot > 3.7 && nextRot < 5){
      var tween = this.game.add.tween(this.seed);
      tween.to({ rotation : nextRot}, windSpeed);
      tween.onComplete.add(this.startWindTween.bind(this, (Math.random() - 0.5)/windForce), this);
      tween.start()
    } else {
      this.startWindTween((Math.random() - 0.5)/windForce);
    }
  }

  startGrowthTween (amount) {
    var tween = this.game.add.tween(this.seed.scale);
    tween.to({ x : this.seed.scale.x + amount, y : this.seed.scale.y + amount }, 10000);
    // tween.onComplete.add(this.startWindTween.bind(this, (Math.random() - 0.5)/windForce), this);
    tween.start()
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
