(function () {
  window.Danmakufu = window.Danmakufu || {};

  var Enemy2 = window.Danmakufu.Enemy2 = function (pos, game, stopPosition) {
    var vel = [0, 2];

    this.stopPosition = stopPosition;

    var spriteOptions = [
      0,   //imgX
      0,   //imgY 
      600, //imgWidth 
      34,  //imgHeight
      -30, //drawX 
      -25, //drawY
      70,  //drawWidth
      50,  //drawHeight
      12,  //numberOfFrames
      12,  //ticksPerFrame
      false
    ];

    window.Danmakufu.EnemyObject.call(this,
      pos,
      vel,
      Enemy2.HEALTH,
      Enemy2.RADIUS,
      Enemy2.COLOR,
      game,
      spriteOptions);
  };

  Enemy2.RADIUS = 35;
  Enemy2.COLOR = "blue";
  Enemy2.HEALTH = 100;

  Danmakufu.Util.inherits(Enemy2, Danmakufu.EnemyObject);

  Enemy2.prototype.getAttackPattern = function (){
    if(!this.attackTimeoutIds[0]){
      this.attackTimeoutIds[0] = window.setTimeout( function (){
        if(!this.attackIntervalIds[0]){
          this.attackIntervalIds[0] = window.setInterval( function (){
            this.fireBullet(0);
            this.fireBullet(45);
            this.fireBullet(90);
            this.fireBullet(135);
            this.fireBullet(180);
            this.fireBullet(225);
            this.fireBullet(270);
            this.fireBullet(315);
          }.bind(this), 800);
        };
      }.bind(this), 500);
    };

   
    if(this.pos[1] >= window.Danmakufu.Game.DIM_Y/4 + this.stopPosition){
      this.vel[1] = .25;  //sets the final velocity of the object
    };
  };

  Enemy2.prototype.draw = function (fgctxt){
    var img = window.Danmakufu.Resources.get('img/medium_fairy_blue.png');
    window.Danmakufu.MovingObject.prototype.render.call(this, fgctxt, img);

;
  };

})();
