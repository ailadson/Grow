"use strict"

var Util = require("./util")

class Hub {
  constructor(engine) {
    this.engine = engine;
    this.game = engine.game;
    this.player = engine.player;
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
