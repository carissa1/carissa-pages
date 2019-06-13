function Player(x, y)
{
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height =  40;
    this.speed = 1;
    this.activeH = true;
};

Player.prototype.HI = function(){
    if(keys["ArrowUp"]){
        this.y -= this.speed;
    }
    if(keys["ArrowDown"]){
        this.y += this.speed;
    }
    if(keys["ArrowRight"]){
        this.x += this.speed;
    }
    if(keys["ArrowLeft"]){
        this.x -= this.speed;
    }
    if(this.x < 0){
        x = 0;
    }
}

Player.prototype.draw = function(){
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height)
}