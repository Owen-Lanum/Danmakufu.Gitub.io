(function () {
  window.Danmakufu = window.Danmakufu || {};

  var Bullet = window.Danmakufu.Bullet = function (pos, vel, dir1, game) {
    var dir = dir1 * (Math.PI/180);     //convert to radians
    var vel1 = [];
    var pos1 = [];

    if (vel[0] !== 0){
      vel1[0] =  Math.sin(dir) * 2 * Math.max(Math.abs(vel[0]), 2);
    } else {
      vel1[0] =  Math.sin(dir) * 2;
    };

    if (vel[1] !== 0){
      vel1[1] = -1 * Math.cos(dir) * 2 * Math.max(Math.abs(vel[1]), 2);
    } else {
      vel1[1] = -1 * Math.cos(dir) * 2;
    };

    pos1[0] = pos[0];
    pos1[1] = pos[1] - 20;

    var spriteOptions = [
      0, 0,
      100, 25,
      -6, 0,
      12, 12,
      1, 1
    ];

    window.Danmakufu.MovingObject.call(this,
      pos1,
      vel1,
      Bullet.RADIUS,
      Bullet.COLOR,
      game,
      spriteOptions,
      dir);
  };

  Bullet.RADIUS = 2;
  Bullet.COLOR = "red";

  Danmakufu.Util.inherits(Bullet, Danmakufu.MovingObject);

  Bullet.prototype.draw = function (fgctxt) {
    var img = window.Danmakufu.Resources.get('img/redshot.png');
    window.Danmakufu.MovingObject.prototype.render.call(this, fgctxt, img);
  };
})();
