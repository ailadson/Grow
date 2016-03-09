"use strict";

class Upgrade {
  constructor(manager, config){
    this.manager = manager;
    this.title = config.title;
    this.text = config.text;

    this.energyCost = config.energyCost || 0;
    this.timeCost = config.timeCost || 0;

    this.parentsConfig = config.parents || [];
    this.childrenConfig = config.children || [];

    this.funcs = config.funcs || [];
    this.stats = config.stats || {};

    this.isUpgraded = false;
  }

  get parents () {
    return config.parentsConfig.map(function(parent){
      this.manager.get(parent);
    }, this);
  }

  get children () {
    return config.childrenConfig.map(function(parent){
      this.manager.get(parent);
    }, this);
  }

  get isUpgradable () {
    if(this.parentsConfig.length === 0){
      return true;
    }

    var parents = this.parents;

    for (var i = 0; i < parents.length; i++) {
      if(!parents[i].isUpgraded){
        return false;
      }
    }

    return true;
  }

  activate () {
    this.funcs.forEach(function(func){
      this.manager[func]();
    }, this);

    for (var prop in this.stats) {
      if (this.stats.hasOwnProperty(prop)) {
        this.manager.player[prop] += this.stats[prop];
      }
    }
  }
}


module.exports = Upgrade;
