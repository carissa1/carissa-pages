function Balloon(x,y){
    this.x = x;
    this.y = y;
    this.width = 37;
    this.height = 40;
    this.color = "#F603A3"
}
Balloon.prototype.draw = function(){
    ctx.fillStyle = String(this.color);
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, 360);
    ctx.fill();
}
