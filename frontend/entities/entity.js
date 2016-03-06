"use strict";

var StateManager = require('./state_manager.js');

class Entity {
  constructor(engine, config){
    this.engine = engine;
    this.game = engine.game;
    this.env = engine.env;
    this.state = new StateManager(this, config.states);
    this.config = config;
  }
}

module.exports = Entity;
