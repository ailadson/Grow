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
  },

  inDays (days){
    return 432000 * days;
  }
}

module.exports = Util;
