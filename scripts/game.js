(function () {
  window.Danmakufu = window.Danmakufu || {};

  var Game = window.Danmakufu.Game = function () {
    this.enemies = [];
    this.bullets = [];
    this.eBullets = [];
    this.gameTime = 0;
    this.score = 0;
    this.deaths = 0;
    this.gameOver = false;
    this.won = false;
    this.activeTimeoutIds = [];
    this.Deth = [];
    this.waveNum = -1;
    this.enemiesRemaining = 0;
    this.bg_y = 400;
    this.bg_speed = 10;

    this.Yukari = new Danmakufu.Yukari([Danmakufu.Game.DIM_X/2, Danmakufu.Game.DIM_Y/2], this);

  };

//1920
//1920 / 2 = 960
//1920 / 3 = 640    1920 / 3 * 2 =
//1920 / 6 = 420    1920 / 32 * 7
//1920 / 8 = 240    1920 / 7 * 8


  Game.DIM_X = window.innerWidth;
  Game.DIM_Y = window.innerHeight;  //responsive width and hight of the canvas
  
  Game.WAVES = [1, 2, 2, 4, 1, 2, 5, 5, 4, 5, 4];
  Game.WAVE_POSITIONS = [
    [Danmakufu.Game.DIM_X / 2],
    [Danmakufu.Game.DIM_X / 3, Danmakufu.Game.DIM_X / 3 * 2],
    [Danmakufu.Game.DIM_X / 6, Danmakufu.Game.DIM_X / 32 * 7],
    [Danmakufu.Game.DIM_X / 8, Danmakufu.Game.DIM_X / 3, Danmakufu.Game.DIM_X / 3 * 2, Danmakufu.Game.DIM_X / 8 * 7],
    [Danmakufu.Game.DIM_X /2],
    [Danmakufu.Game.DIM_X / 3, Danmakufu.Game.DIM_X / 3 * 2],
    [Danmakufu.Game.DIM_X / 8, Danmakufu.Game.DIM_X / 3,Danmakufu.Game.DIM_X /2,Danmakufu.Game.DIM_X / 3 * 2, Danmakufu.Game.DIM_X / 8 * 7],
    [Danmakufu.Game.DIM_X / 8, Danmakufu.Game.DIM_X / 3,Danmakufu.Game.DIM_X /2,Danmakufu.Game.DIM_X / 3 * 2, Danmakufu.Game.DIM_X / 8 * 7],
    [Danmakufu.Game.DIM_X / 8, Danmakufu.Game.DIM_X / 3, Danmakufu.Game.DIM_X / 3 * 2, Danmakufu.Game.DIM_X / 8 * 7],
    [Danmakufu.Game.DIM_X / 8, Danmakufu.Game.DIM_X / 3,Danmakufu.Game.DIM_X /2,Danmakufu.Game.DIM_X / 3 * 2, Danmakufu.Game.DIM_X / 8 * 7],
    [Danmakufu.Game.DIM_X / 8, Danmakufu.Game.DIM_X / 3, Danmakufu.Game.DIM_X / 3 * 2, Danmakufu.Game.DIM_X / 8 * 7]
];

  Game.prototype.populateDanmakufu = function () {
    if(this.enemiesRemaining <= 0){
      if(this.waveNum < Game.WAVES.length){
        if(this.activeTimeoutIds.length === 0){
          this.waveNum++;
          this.callWave();
        };
      } else {
        window.setTimeout( function (){
          this.gameOver = true;
          this.won = true;
        }.bind(this), 1000);
      };
    };
  };

  Game.prototype.callWave = function (){
    //wave 1
    if(this.waveNum <= 1){
      var pos;
      this.waveNum === 0 ? pos = 0 : pos = 50;
      var timeoutId = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new Danmakufu.Enemyp21([Game.WAVE_POSITIONS[this.waveNum][j], -window.Danmakufu.Enemyp21.RADIUS], this, pos);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId);
      }.bind(this), 1000);
      this.activeTimeoutIds.push(timeoutId);
    };
    //wave 2
    if(this.waveNum === 2){
      var timeoutId2 = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum+1]; j++){
          var enemy = new Danmakufu.Enemy1([Game.WAVE_POSITIONS[this.waveNum+1][j], -window.Danmakufu.Enemy1.RADIUS], this, -50);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId2);
        this.waveNum++;
      }.bind(this), 2500);

      this.activeTimeoutIds.push(timeoutId2);
      //wave 3
    };
    if(this.waveNum === 3){
      var timeoutId2 = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new Danmakufu.Enemy1([Game.WAVE_POSITIONS[this.waveNum][j], -window.Danmakufu.Enemy1.RADIUS], this, -50);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId2);
        this.waveNum++;
      }.bind(this), 2500);

      this.activeTimeoutIds.push(timeoutId2);
    };
    //wave 4
    if(this.waveNum === 4){
      var timeoutId = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new Danmakufu.Enemy2([Game.WAVE_POSITIONS[this.waveNum][j], -window.Danmakufu.Enemy2.RADIUS], this, 50);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId);
      }.bind(this), 1000);
      this.activeTimeoutIds.push(timeoutId);
    };
    //wave 5
    if(this.waveNum === 5){
      var timeoutId = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new Danmakufu.Enemy2([Game.WAVE_POSITIONS[this.waveNum][j], -window.Danmakufu.Enemy2.RADIUS], this, 50);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId);
      }.bind(this), 1000);
      this.activeTimeoutIds.push(timeoutId);
      //wave 6
      var timeoutId2 = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum+1]; j++){
          var enemy = new Danmakufu.Enemyp21([Game.WAVE_POSITIONS[this.waveNum+1][j], -window.Danmakufu.Enemyp21.RADIUS], this, 0);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.waveNum++;
        this.activeTimeoutIds.pop(timeoutId2);
      }.bind(this), 4000);
      this.activeTimeoutIds.push(timeoutId2);
    };

    //wave 7
    if(this.waveNum === 7){
      var timeoutId = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new Danmakufu.Enemy2([Game.WAVE_POSITIONS[this.waveNum][j], -window.Danmakufu.Enemy2.RADIUS], this, 0);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId);
      }.bind(this), 1000);
      this.activeTimeoutIds.push(timeoutId);
    
       //wave 8
      var timeoutId2 = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum+1]; j++){
          var enemy = new Danmakufu.Enemy1([Game.WAVE_POSITIONS[this.waveNum+1][j], -window.Danmakufu.Enemy1.RADIUS], this, 0);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.waveNum++;
        this.activeTimeoutIds.pop(timeoutId2);
      }.bind(this), 4000);
      this.activeTimeoutIds.push(timeoutId2);
      //reads wave 7 and spawns it again
      var timeoutId2 = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new Danmakufu.Enemy2([Game.WAVE_POSITIONS[this.waveNum][j], -window.Danmakufu.Enemy2.RADIUS], this, 0);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.waveNum++;
        this.activeTimeoutIds.pop(timeoutId2);
      }.bind(this), 8000);
      this.activeTimeoutIds.push(timeoutId2);


    };
 
    //wave 9
    if(this.waveNum === 7){
      var timeoutId = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new Danmakufu.Enemy2([Game.WAVE_POSITIONS[this.waveNum][j], -window.Danmakufu.Enemy2.RADIUS], this, 0);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.activeTimeoutIds.pop(timeoutId);
      }.bind(this), 1000);
      this.activeTimeoutIds.push(timeoutId);
    
       //wave 10
      var timeoutId2 = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum+1]; j++){
          var enemy = new Danmakufu.Enemy1([Game.WAVE_POSITIONS[this.waveNum+1][j], -window.Danmakufu.Enemy1.RADIUS], this, 0);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.waveNum++;
        this.activeTimeoutIds.pop(timeoutId2);
      }.bind(this), 4000);
      this.activeTimeoutIds.push(timeoutId2);
      //reads wave 9 and spawns it again
      var timeoutId2 = window.setTimeout( function (){
        for(var j = 0; j < Game.WAVES[this.waveNum]; j++){
          var enemy = new Danmakufu.Enemy2([Game.WAVE_POSITIONS[this.waveNum][j], -window.Danmakufu.Enemy2.RADIUS], this, 0);
          this.enemies.push(enemy);
          this.enemiesRemaining++;
        };
        this.waveNum++;
        this.activeTimeoutIds.pop(timeoutId2);
      }.bind(this), 8000);
      this.activeTimeoutIds.push(timeoutId2);


    };

  };

  Game.prototype.update = function (dt) {
    this.gameTime += dt;
    this.populateDanmakufu();

    this.step(dt);
  };

  Game.prototype.step = function (dt) {
    this.moveObjects(dt);
    this.checkCollisions();
  };

  Game.prototype.moveObjects = function (dt) {
    var arr = this.allObjects();
    arr.forEach(function (object) {
      object.update(dt);    //update the sprite
      object.move(dt);      //update the position
    });
  };

  Game.prototype.checkCollisions = function (){
    var arr = this.allObjects();

    for (var i = 0; i < arr.length-1; i++){
      for (var j = i+1; j < arr.length; j++){
        if (arr[i].isCollidedWith(arr[j])){
          arr[i].collideWith(arr[j]);
        };
      };
    };
  };

  Game.prototype.draw = function (bgctxt, fgctxt, tempCanvas) {
    var img = window.Danmakufu.Resources.get('img/bg.png');
  
    var tempCtxt = tempCanvas.getContext('2d');

    this.bg_y = this.bg_y - this.bg_speed;
    if(this.bg_y <= 0){
      this.bg_y = 400;
    };

    tempCtxt.drawImage(img,
                      0, tempCanvas.height - this.bg_y,
                      tempCanvas.width, tempCanvas.height);
    tempCtxt.drawImage(img,
                      0, -this.bg_y,
                      tempCanvas.width, tempCanvas.height);

    var pattern = bgctxt.createPattern(tempCanvas, 'repeat');
    bgctxt.fillStyle = pattern;
    bgctxt.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    fgctxt.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.renderUI(fgctxt);

    this.allObjects().forEach(function (object) {
      object.draw(fgctxt);
      if(object instanceof window.Danmakufu.Death && object.done){
        this.remove(object);
        if(object.enemyId !== null){
          this.enemies.splice(object.enemyId, 1); 
          this.enemiesRemaining--;
        };
      };
    }.bind(this));
  };

  Game.prototype.renderUI = function (fgctxt){
    
    fgctxt.fillStyle = "white";
    fgctxt.textAlign = "start";
    fgctxt.fillText("Lives: "+(3-this.deaths), 30, 30);
    fgctxt.textAlign = "right";
    fgctxt.fillText("Score: "+this.score, Game.DIM_X-30, 30);
  };

  Game.prototype.add = function (object) {
    if (object instanceof window.Danmakufu.EnemyObject){
      this.enemies.push(object);
    } else if (object instanceof window.Danmakufu.Bullet){
      this.bullets.push(object);
    } else if (object instanceof window.Danmakufu.EnemyBullet){
      this.eBullets.push(object);
    } else if (object instanceof window.Danmakufu.Death){
      this.Deth.push(object);
    };
  };

  Game.prototype.remove = function (object, addDeath) {
    if (object instanceof window.Danmakufu.EnemyObject){
      object.clearAttackTimeouts();
      object.clearAttackIntervals();
      if(addDeath){
        object.invincible = true;
        this.add(new window.Danmakufu.Death(
          object.pos,
          object.vel,
          object.direction,
          this,
          this.enemies.indexOf(object),
          object.DeathSize
        ));
        
      } else {
        this.enemies.splice(this.enemies.indexOf(object), 1);
        this.enemiesRemaining--;
      };
    } else if (object instanceof window.Danmakufu.Bullet){
      this.bullets.splice(this.bullets.indexOf(object), 1);
    } else if (object instanceof window.Danmakufu.EnemyBullet){
      this.eBullets.splice(this.eBullets.indexOf(object), 1);
    } else if (object instanceof window.Danmakufu.Death){
      this.Deth.splice(this.Deth.indexOf(object), 1);
    };
  };

  Game.prototype.allObjects = function () {
    var arr = [];
    arr = arr.concat(this.enemies).concat(this.Yukari).concat(this.bullets).concat(this.eBullets).concat(this.Deth);
    return arr;
  };

  Game.prototype.bound = function (pos) {
    var x = pos[0];
    var y = pos[1];
    var offset = 10;
    if (!(x < Game.DIM_X-offset && x > offset)){
      x = (x <= offset ? offset : Game.DIM_X-offset);
    };
    if (!(y < Game.DIM_Y-offset && y > offset)){
      y = (y <= offset ? offset : Game.DIM_Y-offset);
    };
    return [x, y];
  };

  Game.prototype.isOutOfBounds = function (pos, obj){
    return !(pos[0] < (Game.DIM_X + obj.radius) && pos[0] > (0 - obj.radius)) ||
            !(pos[1] < (Game.DIM_Y + obj.radius) && pos[1] > (0 - obj.radius));
  };

})();



var requestAnimFrame = (function(){
  return window.requestAnimationFrame    ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback){
          window.setTimeout(callback, 1000 / 60);
      };
})();

//fixes cross file inheritence as placed in each individual file

(function () {
  window.Danmakufu = window.Danmakufu || {};
  window.Danmakufu.Util = {};  

   window.Danmakufu.Util.inherits = function (ChildClass, ParentClass) {
    function Inherit () {};
    Inherit.prototype = ParentClass.prototype;
    ChildClass.prototype = new Inherit ();
  };

})();

