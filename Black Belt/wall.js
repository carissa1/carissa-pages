function circle(x, y,color){
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
    this.speed = 0.7;
    this.num = 10;
    this.color = color;
    this.active = true;
    this.activeH = true;
}
circle.prototype.MD = function(){
    this.y+= this.speed;

};

circle.prototype.Draw = function(){
    if (!this.active) return;
    ctx.fillStyle = String(this.color);
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, 360);
    ctx.fill();
}