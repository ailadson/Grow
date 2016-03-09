"use strict"

var Util = require("./util")

class Hub {
  constructor(engine) {
    this.engine = engine;
    this.game = engine.game;
    this.player = engine.player;

    this.creates = {
      seed : this.createSeedUpgrade.bind(this)
    }

    this.showingUpgrades = false;

  }

  preload () {
    this.game.load.image('badge', 'assets/proto_upgrade_badge.png');
    this.game.load.image('upgradeBackground', 'assets/proto_upgrade_background.png');
  }

  create (key) {
    this.creates[key]();
  }

  createSeedUpgrade () {
    this.upgradeBackground = this.game.add.image(0, 0, 'upgradeBackground');
    this.upgradeBackground.scale.setTo(25, 27);
    this.upgradeBackground.alpha = 0.9;
    this.badge = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'badge');
    this.badge.anchor.setTo(0.5);

    this.upgradeBackground.bringToTop();
    this.badge.bringToTop();

    this.linkUpgradeToBadge(this.badge, 'Juicy Cotyledons');

    this.upgradeBackground.kill();
    this.badge.kill();
  }

  toggleUpgradeTree() {
    if(this.showingUpgrades){
      this.showingUpgrades = false;
      this.upgradeBackground.kill();
      this.badge.kill();
    } else {
      this.showingUpgrades = true;
      this.upgradeBackground.revive();
      this.badge.revive();
    }
  }

  linkUpgradeToBadge(badge, upgradeKey) {
    badge.inputEnabled = true;
    badge.input.useHandCursor = true;

    var upgrade = this.engine.player.upgrade.get(upgradeKey);

    badge.events.onInputDown.add(function(){
      upgrade.activate();
    });
  }

  updateStartText () {
    if(this.engine.gameStarted){
      return;
    }

    var offset = Util.moveToXY(this.game.input.activePointer, this.startText.x, this.startText.y, 8);
    var distanceToPointer = Util.distanceToPointer(this.startText, this.game.input.activePointer);
    this.startText.setShadow(offset.x, offset.y, 'rgba(0, 0, 0, 0.5)',  distanceToPointer / 30);

    offset = Util.moveToXY(this.game.input.activePointer, this.tutorialText.x, this.tutorialText.y, 8);
    distanceToPointer = Util.distanceToPointer(this.tutorialText, this.game.input.activePointer);
    this.tutorialText.setShadow(offset.x, offset.y, 'rgba(0, 0, 0, 0.5)', distanceToPointer / 30);
  }

  createStartText () {
    if(this.engine.gameStarted){
      return;
    }

    var startText = "             \n    Start    \n             ";
    var tutorialText = "                     \n    Tutorial (off)    \n                     ";

    this.startText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, startText,{
      font: "25px Arial", fill: "#ffffff"
    });

    this.tutorialText = this.game.add.text(this.game.world.centerX, this.game.world.centerY + 20, tutorialText,{
      font: "25px Arial", fill: "#ffffff"
    });

    this.startText.anchor.set(0.5);
    this.textAlign = 'center';
    this.startText.inputEnabled = true;
    this.startText.input.useHandCursor = true;
    this.startText.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    this.tutorialText.anchor.set(0.5);
    this.textAlign = 'center';
    this.tutorialText.inputEnabled = true;
    this.tutorialText.input.useHandCursor = true;
    this.startText.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    this.startText.events.onInputDown.add(function(){
      this.engine.gameStarted = true;
      this.tutorialText.destroy();

      this.startText.text = "                                 \n " +
                            "   Nothing ever grows without a seed,\n" +
                            "   and nothing ever changes without a dream  ";
      this.startText.setShadow(0, -2, 'rgba(0, 0, 0, 0.5)', 0);
      this.startText.inputEnabled = false;
      this.startText.input.useHandCursor = false;

      var tween = this.game.add.tween(this.startText);
      tween.to({ shadowBlur : 30 }, 5000).to({ alpha : 0}, 5000);
      tween.onComplete.add(function(){
        this.player.start();
        this.startText.destroy();
      }, this)

      tween.start();
    }, this);

    this.tutorialText.events.onInputDown.add(function(){
      this.game.tutorial = !this.game.tutorial;

      if(this.tutorialText.text.indexOf("(off)") === -1){
        this.tutorialText.text = "                     \n    Tutorial (off)    \n                     ";
      } else {
        this.tutorialText.text = "                     \n    Tutorial (on)    \n                     ";
      }
    }, this);
  }
}

module.exports = Hub;
