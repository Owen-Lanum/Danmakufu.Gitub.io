(function () {
  window.Danmakufu = window.Danmakufu || {};

  var MovingObject = window.Danmakufu.MovingObject = function (pos, vel, radius, color, game, spriteDetails, direction) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.alpha = 1;
    this.isBounded = false;
    this.game = game || {};

    this.direction = direction || 0;

    //sprite details that are defined in each moving object

    if(spriteDetails){
      this.imgX = spriteDetails[0];
      this.imgY = spriteDetails[1];
      this.imgWidth = spriteDetails[2];
      this.imgHeight = spriteDetails[3];
      this.drawX = spriteDetails[4];
      this.drawY = spriteDetails[5];
      this.drawWidth = spriteDetails[6];
      this.drawHeight = spriteDetails[7];
      this.numberOfFrames = spriteDetails[8] || 1;
      this.ticksPerFrame = spriteDetails[9] || 1;
      this.once = spriteDetails[10] || false;
    };

    this.frameIndex = 0;
    this.tickCount = 0;
    this.done = false;
  };

  MovingObject.prototype.draw = function (fgctxt) {
    fgctxt.save();
    fgctxt.globalAlpha = this.alpha;
    fgctxt.strokeStyle = this.color;
    fgctxt.beginPath();

    fgctxt.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    fgctxt.stroke();
    fgctxt.restore();
  };

  MovingObject.prototype.render = function (fgctxt, img) {
    fgctxt.save();
    fgctxt.globalAlpha = this.alpha;

    fgctxt.translate(this.pos[0], this.pos[1]);
    fgctxt.rotate((Math.PI)/180 * this.direction);

    var img = img;

    fgctxt.drawImage(img,
      this.frameIndex * Math.min(img.naturalWidth, this.imgWidth) / this.numberOfFrames,
      this.imgY,
      Math.min(img.naturalWidth, this.imgWidth) / this.numberOfFrames,
      Math.min(img.naturalHeight, this.imgHeight),
      this.drawX,
      this.drawY,
      this.drawWidth,
      this.drawHeight);

    fgctxt.restore();
  };

  MovingObject.prototype.update = function (dt) {
    this.tickCount++;

    if(this.tickCount > this.ticksPerFrame){
      this.tickCount = 0;
      if(this.frameIndex < this.numberOfFrames - 1){
        this.frameIndex++;
      } else {
        if(this.once){
          this.done = true;
        } else {
          this.frameIndex = 0;
        };
      };
    };
  };

  MovingObject.prototype.move = function (dt) {
    var speed = [];

    speed[0] = this.vel[0] * 75;
    speed[1] = this.vel[1] * 75;

    this.pos[0] += speed[0] * dt;
    this.pos[1] += speed[1] * dt;

    if (this.isBounded){
      if(!(this instanceof window.Danmakufu.Yukari && this.relocating)){
        this.pos = this.game.bound(this.pos);
      };
    } else {
      if(this.game.isOutOfBounds(this.pos, this)){
        this.game.remove(this);
      };
    };
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var x = this.pos[0];
    var y = this.pos[1];
    var otherX = otherObject.pos[0];
    var otherY = otherObject.pos[1];

    var dist = Math.sqrt(Math.pow(x - otherX, 2) + Math.pow(y - otherY, 2));

    return (this.radius + otherObject.radius) >= (dist);
  };

  MovingObject.prototype.collideWith = function (otherObject){
  }
})();
