function BadGuy(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 10;
    this.height = 70;
    this.active = true;
};

BadGuy.prototype.move = function(){
    this.y += this.speed;
}

BadGuy.prototype.draw = function(){
    if (!this.active) return;
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, this.y, this.width, this.height);
}