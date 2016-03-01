var Grow = require("./grow");

window.addEventListener("DOMContentLoaded", function(){
  var root = document.getElementById('grow');

  new Grow(root.width, root.height, {});
});
