// cache our canvas and context to draw
var canvas;
var ctx;

// cache inputs
var keys = [];

var btn;
var h1;
var setBI = "blue";

var BI = new Image();
BI.src = "clouds2.jpg";
var BX, BY;
BX = 0;
BY = 0;
var BS = 1;

window.onkeydown = function (e)
{
    keys[e.key] = true;
};

window.onkeyup = function (e)
{
    keys[e.key] = false;
};

var player = new Player(0, 0);

var playerSecond = new Player(235, 360);

var badGuys = []
var numrects = 10;
var distance = 15;

var balloon = new Balloon(240, 457);

var allCircles = [];
var numcircles = 10;
var distancebetween = 15;
var count = 0;

var lose = false;
var win = false;
var start;
// initialize our variables and start our game loop
function startGame()
{
    canvas = document.getElementById("gc");
    ctx = canvas.getContext("2d");
    btn = document.getElementById("btn");
    h1 = document.getElementById("h1");
    h1b = document.getElementById("h1b");
    h1c = document.getElementById("h1c");
    btn2 = document.getElementById("btn2");
    back = document.getElementById("back");
    div = document.getElementById("div");
    div2 = document.getElementById("div2");
    canvas.backgroundImage = "url()";
    canvas.background = "blue";
    start = true;

    var offset = canvas.width/2 - (numcircles * (distancebetween + 10)/2-distancebetween*2);    
    for(var i = 0; i < numcircles; ++i){
        allCircles.push(new circle(i * distancebetween + offset, 1000, "red"));
        allCircles.push(new circle(i * distancebetween + offset, 1000, "red"));
        allCircles.push(new circle(i * distancebetween + offset, 1000, "red"));
    }
    var offset = canvas.width/2 - (numrects * (distance+15)/2-distance*2);
    
    for(var i = 0; i < 13; ++i){
        badGuys.push(new BadGuy(i*distance+offset, 1000, 0.7));
    }
    var fps = 30 / 1000;
    gameInterval = window.setInterval(update, fps);
};

var maxScoreWidth = 100;
var maxScore = 20;
function drawScore(){
    ctx.fillStyle = "#E63C8E";;
    ctx.fillRect(10, 20, count/maxScore * maxScoreWidth, 10);
    ctx.fillStyle = "purple";
    ctx.strokeRect(10, 20, maxScoreWidth, 10);
}
function scroll(){
    BY -= BS;
    ctx.drawImage(BI, BX, BY, canvas.width,canvas.height);
    ctx.drawImage(BI, BX, BY+canvas.height, canvas.width,canvas.height);
    if(BY < -500){
        BY = 0;
    }
}
function score(){   
    if(count >= maxScore){
        canvas.style.backgroundImage = "url()";
        allCircles.active = false;
        allCircles.activeH = false;
        badGuys.active = false;
        playerSecond.activeH = false;
        count = 0;
        canvas.style.background = "black";
        h1b.style.display = "inline-block";
        btn.style.display = "inline-block";
        btn.onclick= function playAgain(){
            window.location.href="index.html";
        };
        win = true;
    }
}
// game loop
function update()
{
    if(start == true){
        canvas.style.backgroundImage = "url()";
        canvas.style.background = "blue";
        h1c.style.display = "inline-block";
        btn2.style.display = "inline-block";
        btn3.style.display = "inline-block";
        div3.style.display = "inline-block";
        btn2.onclick = function(){
            //window.location.href = "index.html";
            start = false;
        }
        btn3.onclick = function(){
            btn2.style.display = "none";
            btn3.style.display = "none";
            h1c.style.display = "none";
            div.style.display = "inline-block";
            div2.style.display = "inline-block";
            div3.style.display = "none";
            back.style.display = "inline-block";
            back.onclick = function(){
                div.style.display = "none";
                window.location.href = "index.html";
            }
        }
    }
    else{
        canvas.style.backgroundImage = "BI";
        btn2.style.display = "none";
        btn3.style.display = "none";
        h1c.style.display = "none";
        div3.style.display = "none";
        handleLogic();
        //console.log(keys);
        draw();
        score();
    }
}
// handle inputs, handle player, handle enemies, etc
function handleLogic()
{
    playerSecond.HI();
    for(var i =0; i< allCircles.length; i++) {
        allCircles[i].MD();
        if(checkCollisions(playerSecond, allCircles[i])){
            allCircles[i].active = false;
        }
        if(checkCircleCollisions(balloon, allCircles[i]) || checkCollisions(balloon, badGuys)){
            if(allCircles[i].active == true && win == false){
                balloon.x = -300;
                balloon.color = "blue";
                canvas.style.backgroundImage = "url()";
                allCircles.active = false;
                allCircles.activeH = false;
                badGuys.active = false;
                playerSecond.activeH = false;
                count = 0;
                canvas.style.background = "black";
                h1.style.display = "inline-block";
                btn.style.display = "inline-block";
                btn.onclick= function playAgain(){
                    window.location.href="index.html";
                };
                lose = true;
                win = false;
            }
            else if(allCircles[i].active == false && win == false){
                balloon.color = "#F603A3";
                balloon.x = 240;
            }
        }
    }
    /*badGuy.move();*/
    for(var i =0; i< badGuys.length; i++) {
        badGuys[i].move();
        if(checkCollisions(playerSecond, badGuys[i])){
            badGuys[i].active = false;
        }
        if(checkCircleCollisions(balloon, badGuys[i])){
            if(badGuys[i].active == true && win == false){
                balloon.x = -300;
                balloon.color = "blue";
                canvas.style.backgroundImage = "url()";
                allCircles.active = false;
                allCircles.activeH = false;
                badGuys.active = false;
                playerSecond.activeH = false;
                count = 0;
                canvas.style.background = "black";
                h1.style.display = "inline-block";
                btn.style.display = "inline-block";
                btn.onclick= function playAgain(){
                    window.location.href="index.html";
                };
                lose = true;
                win = false;
            }
            else if(badGuys[i].active == false && win == false){
                balloon.color = "#F603A3";
                balloon.x = 240;
            }
        }
    }
    if (badGuyChoice == 0) {
        //check if circles past bottom
        if (allCircles[allCircles.length - 1].y > canvas.height) {
            spawnBadGuys();
            count++;
        }
    }
    else {
        //check if square is past bottom
        if(badGuys[badGuys.length - 1].y > canvas.height){
            spawnBadGuys();
            count++;
        }
    }
}

var badGuyChoice;

function spawnBadGuys() {
    badGuyChoice = Math.floor(Math.random() * 2);
    if (badGuyChoice == 0) {
        //spawn circles
        for (var i = 0; i < allCircles.length; i++) {
            allCircles[i].active = true;
            if (i % 3 == 0) {
                allCircles[i].y = 0;
            }
            if (i % 3 == 1) {
                allCircles[i].y = -15;
            }
            if (i % 3 == 2) {
                allCircles[i].y = -30;
            }
        }
    }
    else {
        //spawn squares
        for(var i = 0; i < badGuys.length; i++){
            badGuys[i].active = true;
            if (i % 3 == 0) {
                badGuys[i].y = 0;
            }
            if (i % 3 == 1) {
                badGuys[i].y = 0;
            }
            if (i % 3 == 2) {
                badGuys[i].y = 0;
            }
        }
    }
}
// draw our game to the canvas
function draw()
{
    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (win || lose) {
        return;
    }
    scroll();
    drawScore();
    if(playerSecond.activeH === true){
        playerSecond.draw();
    }
    /*playerSecond.draw();*/
    /*badGuy.draw();*/
    /*wall.draw();*/
    // badGuys.forEach(function(badGuy){
    //     badGuy.draw();
    // });

    for(var i =0; i< allCircles.length; i++) {
        if(allCircles[i].active === true){
            allCircles[i].Draw();
        }
    }
    for(var i =0; i< badGuys.length; i++) {
        if(badGuys[i].active == true){
            badGuys[i].draw();
        };
    };
    

    balloon.draw();
}

function checkCircleCollisions(circ1, circ2) {
    var dist = Math.hypot(circ1.x - circ2.x, circ1.y - circ2.y);
    if (dist < (circ1.width/2 + circ2.width/2)) return true;
    return false;
}

function checkCollisions(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y) {
     return true;
    }
    else{
     return false
    }
}