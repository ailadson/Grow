"use strict";

var Util = require("../util");

class SeedStage {
  constructor (engine, config) {
    this.engine = engine;
    this.game = engine.game;
    this.env = engine.env;
    this.player = engine.player;
    this.hub = engine.hub;
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
    this.game.load.audio('background', this.backgroundMusicURL);
  }

  create () {
    this.backgroundMusic = this.game.add.audio('background', 0.5, true);
    this.backgroundMusic.play();

    this.env.create('seed');
    this.player.create('seed', { x: this.game.world.centerX, y: this.game.world.centerY + 100 });
    this.hub.create('seed');

    this.hub.createStartText();
  }

  update () {
    this.player._updateSeed();
    this.hub.updateStartText();
  }

  _loadConfig(config){
    this.backgroundMusicURL = config.backgroundMusicURL;
  }
}

module.exports = SeedStage;
