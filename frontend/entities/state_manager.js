"use strict";

class StateManager {
  constructor(entity, states){
    this.entity = entity;
    this.states = [];

    if(Array.isArray(states)) {
      this.batchLoad(states);
    }
  }

  batchLoad(states){
    states.forEach(function(state){
      this.load(state);
    }, this);
  }

  transitionTo(){
  }

  /* state config obj
  ** key
  ** tween
  **    fromState {}
  **    toState {}
  **    time
  ** anim
  **  key
  **  paths []
  ** playerMods {}
  */

  load(config){

  }

  start(){
  }
}

module.exports = StateManager;
