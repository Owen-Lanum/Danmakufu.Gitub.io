(function () {
  window.Danmakufu = window.Danmakufu || {};

  var Death = window.Danmakufu.Death = function (pos, vel, dir, game, enemyId) {
    
    var spriteOptions = [
      0, 0,
      0, 0,
      0, 0,
      0, 0,
      8, 0,
      true 
    ];

    window.Danmakufu.MovingObject.call(this,
      pos,
      vel,
      Death.RADIUS,
      Death.COLOR,
      game,
      spriteOptions,
      dir);

    this.enemyId = enemyId;
  };

  Death.RADIUS = 0;
  Death.COLOR = "red";

  Danmakufu.Util.inherits(Death, Danmakufu.MovingObject);


})();
