/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Grow = __webpack_require__(1);

	window.addEventListener("DOMContentLoaded", function(){
	  new Grow({});
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var BootStage = __webpack_require__(2);
	var PreloadStage = __webpack_require__(3);
	var SeedStage = __webpack_require__(4);

	class Grow {
	  constructor(config){
	    this.currentStage = config.currentStage || null;
	    this.game = new Phaser.Game(600, 800, Phaser.AUTO, 'grow');
	    // this.player = new Tree(this, config.player);

	    this.stages = {
	      'boot' : new BootStage(this, config.boot),
	      'preload' : new PreloadStage(this, config.preload),
	      'seed' : new SeedStage(this, config.seed)
	      // ,
	      // 'falling' : new PreloadStage(game, player, config.falling),
	      // 'root' : new PreloadStage(game, player, config.root),
	      // 'sapling' : new PreloadStage(game, player, config.sapling),
	    };

	    this.loadStages();

	    this.game.state.start('boot');
	  }

	  loadStages(){
	    for(var stage in this.stages){
	      this.game.state.add(stage, this.stages[stage].getState());
	    }
	  }
	}

	module.exports = Grow;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	class BootStage {
	  constructor(engine, config){
	    this.engine = engine;
	    this.game = engine.game;
	    this.player = engine.player;
	    this._loadConfig(config);
	  }

	  getState(){
	    return {
	      preload : this.preload.bind(this),
	      create : this.create.bind(this)
	    }
	  }

	  preload(){

	  }

	  create(){
	    this.game.state.start('preload');
	  }

	  _loadConfig(config){
	  }
	}

	module.exports = BootStage;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	class PreloadStage {
	  constructor(engine, config){
	    this.engine = engine;
	    this.game = engine.game;
	    this.player = engine.player;
	    this._loadConfig(config);
	  }

	  getState(){
	    return {
	      preload : this.preload.bind(this),
	      create : this.create.bind(this)
	    }
	  }

	  preload(){

	  }

	  create(){
	    this.game.state.start('seed');
	  }

	  _loadConfig(config){
	  }
	}

	module.exports = PreloadStage;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	class SeedStage {
	  constructor(engine, config){
	    this.engine = engine;
	    this.game = engine.game;
	    this.player = engine.player;
	    this._loadConfig(config);
	  }

	  getState(){
	    return {
	      preload : this.preload.bind(this),
	      create : this.create.bind(this)
	    }
	  }

	  preload(){

	  }

	  create(){
	    var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Hey",{
	       font: "65px Arial", fill: "#ffff00", align: "center"
	     });

	    text.anchor.set(0.5);
	  }

	  _loadConfig(config){
	  }
	}

	module.exports = SeedStage;


/***/ }
/******/ ]);