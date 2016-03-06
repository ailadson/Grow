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

	window.addEventListener("load", function(){
	  new Grow(800, 600, {
	    env : {
	      sky : "assets/proto_sky.png",
	      ground : "assets/proto_stage1_branch.png"
	    },

	    player : {
	      seed : "assets/proto_entity.png"
	    }
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var BootStage = __webpack_require__(2);
	var PreloadStage = __webpack_require__(3);
	var SeedStage = __webpack_require__(4);
	var ProtoEnv = __webpack_require__(5);
	var Tree = __webpack_require__(6);

	class Grow {
	  constructor(width, height, config){
	    this.currentStage = config.currentStage || null;
	    this.game = new Phaser.Game(width, height, Phaser.AUTO, 'grow');
	    this.env = new ProtoEnv(this, config.env);
	    this.player = new Tree(this, config.player);

	    this.stages = {
	      'boot' : new BootStage(this, config.boot),
	      'preload' : new PreloadStage(this, config.preload),
	      'seed' : new SeedStage(this, config.seed)
	      // ,
	      // 'falling' : new PreloadStage(game, player, config.falling),
	      // 'root' : new PreloadStage(game, player, config.root),
	      // 'sapling' : new PreloadStage(game, player, config.sapling),
	    };

	    this._loadStages();

	    this.gameStarted = config.gameStarted || false;
	    this.tutorial = false;

	    this.game.state.start('boot');
	  }

	  _loadStages(){
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
	    this.env = engine.env;
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
	    this.env.preload();
	    this.player.preload();
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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Util = __webpack_require__(9);

	class SeedStage {
	  constructor (engine, config) {
	    this.engine = engine;
	    this.game = engine.game;
	    this.env = engine.env;
	    this.player = engine.player;
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
	  }

	  create () {

	    this.env.create('seed');
	    this.player.create('seed', { x: this.game.world.centerX, y: this.game.world.centerY + 100 });

	    this._createStartText();
	  }

	  update () {
	    this.player._updateSeed();
	    this._updateStartText();
	  }

	  _updateStartText () {
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

	  _createStartText () {
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

	  _loadConfig(config){
	  }
	}

	module.exports = SeedStage;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	class ProtoEnv {
	  constructor(engine, config){
	    this.game = engine.game;
	    this.sky = config.sky;
	    this.ground = config.ground || null;

	    this.beaufortScale = 3;

	    this.creates = {
	      seed : this._createSeed.bind(this)
	    }
	  }

	  preload(){
	    this.game.load.image('sky', this.sky);
	    this.game.load.image('ground', this.ground);
	  }

	  create(key){
	    this.creates[key]();
	  }


	  //*******seed private
	  _createSeed (cb) {
	    this._createSeedBackground();
	    this._createSeedGround();
	  }

	  _createSeedBackground () {
	    this.sky = this.game.add.sprite(0, 0, 'sky');
	    this.sky.scale.setTo(25,22);
	  }

	  _createSeedGround(){
	    this.ground = this.game.add.sprite(0, 0, 'ground');
	    this.ground.anchor.setTo(0,1);
	    this.ground.y = this.game.world.height;
	    this.ground.scale.setTo(10, 7);
	    this.ground.smoothed = false;
	  }
	}

	module.exports = ProtoEnv;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Util = __webpack_require__(9);
	var Entity = __webpack_require__(7);

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

	  start () {
	    var tween = this.game.add.tween(this.seed.scale);
	    tween.to({ x : 0.5, y : 0.5 }, 2000);
	    tween.start();
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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var StateManager = __webpack_require__(8);

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


/***/ },
/* 8 */
/***/ function(module, exports) {

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


/***/ },
/* 9 */
/***/ function(module, exports) {

	Util = {
	  mapRange: function(value, low1, high1, low2, high2) {
	    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
	  },

	  moveToXY: function(displayObject, x, y, speed) {
	    var _angle = Math.atan2(y - displayObject.y, x - displayObject.x);

	    var x = Math.cos(_angle) * speed;
	    var y = Math.sin(_angle) * speed;

	    return { x: x, y: y };
	  },

	  distanceToPointer: function(displayObject, pointer) {
	    var _dx = displayObject.x - pointer.x;
	    var _dy = displayObject.y - pointer.y;

	    return Math.sqrt(_dx * _dx + _dy * _dy);
	  }
	}

	module.exports = Util;


/***/ }
/******/ ]);