(function() {
  window.Danmakufu = window.Danmakufu || {};

  var Yukari = window.Danmakufu.Yukari = function (pos, game){
    var spriteOptions = [
      0,   //imgX
      0,   //imgY 
      400, //imgWidth 
      120, //imgHeight
      -25, //drawX 
      -22, //drawY 
      50,  //drawWidth
       60, //drawHeight
      8,   //numberOfFrames
      8,  //ticksPerFrame
      false
    ];  

    this.direction = 0;     
    window.Danmakufu.MovingObject.call(this,
      pos,
      [0,0],
      Yukari.RADIUS,
      Yukari.COLOR,
      game,
      spriteOptions,
      this.direction);
    this.isBounded = true;
    this.relocating = false;
    this.invincible = false;
  };

  Yukari.RADIUS = 10;
  Yukari.COLOR = "red";
  Yukari.MAXSPEED = 7;

  Danmakufu.Util.inherits(Yukari, Danmakufu.MovingObject);

  Yukari.prototype.draw = function (fgctxt) {
    var img = window.Danmakufu.Resources.get('img/Yukari.png');
    window.Danmakufu.MovingObject.prototype.render.call(this, fgctxt, img);

  };

  Yukari.prototype.collideWith = function (otherObject){
    if (otherObject instanceof window.Danmakufu.EnemyBullet){
      if(!this.invincible){
        this.game.deaths += 1;
        this.relocate();
        if(this.game.deaths >= 3){
          this.game.gameOver = true;
        };
      };
    };
  };

  Yukari.prototype.relocate = function () {
    this.relocating = true;
    var lastPos = this.pos;

    this.pos = [Danmakufu.Game.DIM_X+100, Danmakufu.Game.DIM_Y+100];
    this.vel=[0,0];

    if(!this.game.gameOver){
      window.setTimeout( function (){
        this.pos = lastPos;
        this.relocating = false;
        this.invincible = true;
        this.alpha = 0.5;

        window.setTimeout( function (){
          this.invincible = false;
          this.alpha = 1;
        }.bind(this), 1000);
      }.bind(this), 500);
    };
  };

  Yukari.prototype.power = function (x, y) {
    this.pos[0] += x * 5;
    this.pos[1] += y * 5;
  };

  Yukari.prototype.fireBullet = function () {
    var bullet = new window.Danmakufu.Bullet (this.pos,
      [5, 5],
      this.direction,
      this.game);
    this.game.add(bullet);
  };

})();
