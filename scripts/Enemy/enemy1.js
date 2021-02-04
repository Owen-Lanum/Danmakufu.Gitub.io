(function () {
  window.Danmakufu = window.Danmakufu || {};

  var Enemy1 = window.Danmakufu.Enemy1 = function (pos, game, stopPosition) {
    var vel = [0, 2];

    this.attackCounter = 0;
    this.lifetime = 0;
    this.stopPosition = stopPosition;

    var spriteOptions = [
      0,   //imgX
      0,   //imgY 
      500, //imgWidth 
      29,  //imgHeight
      -25, //drawX 
      -25, //drawY 
      50,  //drawWidth
      50,  //drawHeight
      14,  //numberOfFrames
      14,  //ticksPerFrame
      false
    ];

    window.Danmakufu.EnemyObject.call(this,
      pos,
      vel,
      Enemy1.HEALTH,
      Enemy1.RADIUS,
      Enemy1.COLOR,
      game,
      spriteOptions);
  };

  Enemy1.RADIUS = 35;
  Enemy1.COLOR = "blue";
  Enemy1.HEALTH = 50;

  Danmakufu.Util.inherits(Enemy1, Danmakufu.EnemyObject);

  Enemy1.prototype.getAttackPattern = function (dt){
    this.lifetime += dt;

    if(Math.round(this.lifetime * 10)/10 === 1.2){
      this.vel[1] = 0;
    };

    if(Math.floor(this.lifetime) === 2){
      this.vel[1] = 1;
    };

    if(!this.attackIntervalIds[0]){
        this.attackIntervalIds[0] = window.setInterval( function (){
          this.fireBullet(45);
          this.fireBullet(135);
          this.fireBullet(225);
          this.fireBullet(315);
        }.bind(this), 300);
    };

    if(!this.attackTimeoutIds[0]){
      this.attackTimeoutIds[0] = window.setTimeout( function (){
        window.clearInterval(this.attackIntervalIds[0]);
        if(!this.attackIntervalIds[1]){
          this.attackIntervalIds[1] = window.setInterval( function (){
            if(this.attackCounter % 2 === 0){
              this.fireBullet(45);
              this.fireBullet(135);
              this.fireBullet(225);
              this.fireBullet(315);;
            };
            this.attackCounter++;
          }.bind(this), 400);

        };
        this.vel[1] = 1;
        if(this.pos[0] > window.Danmakufu.Game.DIM_X/2){
          this.vel[0] = -1;
        } else {
          this.vel[0] = +1;
        };
      }.bind(this), 2000);
    };

    if(this.pos[1] >= window.Danmakufu.Game.DIM_Y/3 + this.stopPosition){
      this.vel = [0, 1];
    };
  };

  Enemy1.prototype.draw = function (fgctxt){
    var img = window.Danmakufu.Resources.get('img/small_fairy_blue.png');
    window.Danmakufu.MovingObject.prototype.render.call(this, fgctxt, img);


  };

})();




