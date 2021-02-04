(function () {
  window.Danmakufu = window.Danmakufu || {};

  var EnemyBullet = window.Danmakufu.EnemyBullet = function (pos, vel, dir1, game, radius, color) {
    var dir = dir1 * (Math.PI/180);     
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

    if(radius){
      var rad = radius;
    } else {
      var rad = EnemyBullet.RADIUS;
    };

    if(color){
      var col = color;
    } else {
      var col = EnemyBullet.COLOR;
    };

    var spriteOptions = [
      0, 0,
      100, 25,
      -6, 0,
      24, 24,
      1, 1
    ];

    window.Danmakufu.MovingObject.call(this,
      pos1,
      vel1,
      rad,
      col,
      game,
      spriteOptions,
      dir);
  };

  EnemyBullet.RADIUS = 7;
  EnemyBullet.COLOR = "blue";

  Danmakufu.Util.inherits(EnemyBullet, Danmakufu.MovingObject);

  EnemyBullet.prototype.draw = function (fgctxt) {
    var img = window.Danmakufu.Resources.get('img/redshot.png');
    window.Danmakufu.MovingObject.prototype.render.call(this, fgctxt, img);


  };
})();
