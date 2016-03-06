var Grow = require("./grow");

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
