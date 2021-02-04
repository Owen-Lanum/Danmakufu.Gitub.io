(function (){
  window.Danmakufu = window.Danmakufu || {};

  var Controls = window.Danmakufu.Controls = function(game, bgctxt, fgctxt, tempCanvas){
    this.game = game;
    this.bgctxt = bgctxt;
    this.fgctxt = fgctxt;
    this.tempCanvas = tempCanvas;
    this.lastTime;
    this.counter = 0;
    this.Bombs = 1;

    this.addKeyMap();
  };
//Defining the default state of the keys
  Controls.prototype.addKeyMap = function(){
    this.Keys = {
      "up": false,
      "left": false,
      "right": false,
      "down": false,
      "space": false,
      "x": false,
      "shift":false,
      "q": false,
      "e":false,      
    };

    this.$el = $(document);
  };

  Controls.prototype.addKeyBindings = function (){
    this.$el.keydown(function (e){
      var code = e.keyCode;
      //setting a variable to true when the key is pressed
      if (code === 87) {this.Keys["up"] = true; };
      if (code === 65) {this.Keys["left"] = true; };
      if (code === 83) {this.Keys["down"] = true; };
      if (code === 68) {this.Keys["right"] = true; };
      if (code === 32) {this.Keys["space"] = true; };
      if (code === 88) {this.Keys["x"] = true; };
      if (code === 16) {this.Keys["shift"] = true; };
      if (code === 81) {this.Keys["q"] = true; };
      if (code === 69) {this.Keys["e"] = true; };
    }.bind(this));

    this.$el.keyup(function (e){
      var code = e.keyCode;
      //setting a variable to false when the key is released
      if (code === 87) {this.Keys["up"] = false; };
      if (code === 65) {this.Keys["left"] = false; };
      if (code === 83) {this.Keys["down"] = false; };
      if (code === 68) {this.Keys["right"] = false; };
      if (code === 32) {this.Keys["space"] = false; };
      if (code === 88) {this.Keys["x"] = false; };
      if (code === 16) {this.Keys["shift"] = false; };
      if (code === 81) {this.Keys["q"] = false; };
      if (code === 69) {this.Keys["e"] = false; };
    }.bind(this));
  };

  Controls.prototype.Move = function (){
   
//takes the read key input and translates it into movment on the screen
//holding shift halves the speed
    if(this.Keys["shift"]){
        if(this.Keys["up"]){ this.game.Yukari.power(0, -.5); };
    }
    else
    if(this.Keys["up"]){ this.game.Yukari.power(0, -1); };

    if(this.Keys["shift"]){
        if(this.Keys["left"]){ this.game.Yukari.power(-.5, 0); };
    }
    else
    if(this.Keys["left"]){ this.game.Yukari.power(-1, 0); };

    if(this.Keys["shift"]){
        if(this.Keys["down"]){ this.game.Yukari.power(0, +.5); };
    }
    else
    if(this.Keys["down"]){ this.game.Yukari.power(0, +1); };

    if(this.Keys["shift"]){
        if(this.Keys["right"]){ this.game.Yukari.power(+.5, 0); }; 
    }
    else
    if(this.Keys["right"]){ this.game.Yukari.power(+1, 0); };

// Lets you spinnnnnnnnnnnn

    if(this.Keys["shift"]){
      if(this.Keys["q"]){ this.game.Yukari.direction -=1; }; 
  }
  else
  if(this.Keys["q"]){ this.game.Yukari.direction -=2; };

  if(this.Keys["shift"]){
    if(this.Keys["e"]){ this.game.Yukari.direction +=1; }; 
  }
  else
  if(this.Keys["e"]){ this.game.Yukari.direction +=2; };


    if(this.Keys["x"]){ this.clearEnemyWave(); 
    return this.Bombs-- };
  };

//shooting function
  Controls.prototype.executeShoot = function (){
    if(this.Keys["space"]){ this.game.Yukari.fireBullet(); };
  };


  //restart after game over
  Controls.prototype.displayGameOver = function (){


    this.Reset = window.setInterval(( function (){
      if(this.Keys["x"]){ this.start(); };
    }).bind(this), 88);
  };

  
  Controls.prototype.start = function(){
    this.addKeyBindings();
    this.lastTime = Date.now();

    if(this.Reset){
      clearInterval(this.Reset);
      this.game = new window.Danmakufu.Game();
    };

    this.main();
  };

  Controls.prototype.clearEnemyWave = function (){
    while(this.game.enemiesRemaining > 0 && this.Bombs > 0){
      this.game.remove(this.game.enemies[0], false) ;
    };
  };

 Controls.prototype.main = function (){
    var now = Date.now();
    var dt = (now - this.lastTime) / 1000.0;

    if(!this.game.gameOver){
      this.Move();
      this.game.update(dt);
      this.game.draw(this.bgctxt, this.fgctxt, this.tempCanvas);

      if(this.counter % 5 === 0){
        this.executeShoot();
      };

      this.counter++;

      this.lastTime = now;
      requestAnimFrame(this.main.bind(this));
    } else {
      this.displayGameOver();
    };
  };

})();
