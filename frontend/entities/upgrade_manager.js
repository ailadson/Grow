"use strict";

var Upgrade = require("./upgrade");

class UpgradeManager {
  constructor (player, config) {
    this.player = player;
    this.upgrades = {};
    this.loadUpgrades(config);
  }

  activate (key) {
    var upgrade = this.upgrades[key];

    if(upgrade){
      this.player.addCost({
        days : upgrade.timeCost,
        energy : upgrade.energyCost
      });

      upgrade.activate();
    }
  }

  get (key) {
    return this.upgrades[key];
  }

  loadUpgrades (upgrades) {
    upgrades.forEach(function(upgrade){
      this.upgrades[upgrade.title] = new Upgrade(this, upgrade);
    }, this);
  }

  /****************************************************************************/
  /*********************************Upgrades***********************************/
  _growSeed () {
    this.player.remainingSeedGrowth += 1;
  }

  /*********************************Helpers************************************/
}

module.exports = UpgradeManager;
