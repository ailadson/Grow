"use strict";

var StateManager = require('./state_manager.js');

class Entity {
  constructor(engine, config){
    this.engine = engine;
    this.game = engine.game;
    this.env = engine.env;
    this.state = new StateManager(this, config.states);
    this.config = config;
    this.activeTweens = [];
  }

  speedUpTweens (amount) {
    this.activeTweens.forEach(function(tween){
      tween.timeScale = amount;
    });
  }

  slowDownTweens () {
    this.activeTweens.forEach(function(tween){
      tween.timeScale = 1;
    });
  }
}

module.exports = Entity;
