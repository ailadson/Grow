var Grow = require("./grow");

window.addEventListener("keydown", function(e) {
  if(e.keyCode === 32){
    e.preventDefault();
  }
})
window.addEventListener("load", function(){
  window.g = new Grow(800, 600, {
    env : {
      sky : "assets/proto_sky.png",
      night : "assets/night.png",
      ground : "assets/proto_stage1_branch.png"
    },

    player : {
      seed : "assets/proto_entity.png",
      upgrades : [
        {
          title : "Juicy Cotyledons",
          text : "Grow big big big",
          energyCost : 5,
          timeCost : 4,
          funcs : ["_growSeed"],
          stats : {}
        }
      ]
    },

    stage : {
      seed : {
        backgroundMusicURL : "assets/proto_song.mp3"
      }
    }
  });
});
