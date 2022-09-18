console.log("This is a tutorial on canvas and its projects.");
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particles = [];
let c = canvas.getContext("2d");
let gameFrame = 0;
let frameX = 0;
let frameY = 0;
// Set these accordingly : 
let background = new Image();
background.src = "" // background image path 
let staggerFrames = undefined;
let framesforplayer = undefined;
let framesforenemy = undefined; 
const playeridlewidth = undefined;
const playeridleheight = undefined;
// Our player sprites : 
let playeridle = new Image();
playeridle.src = "" // playeridle image path
let playerrun = new Image();
playerrun.src = "" // playerrun image path
let playerattack = new Image();
playerattack.src = ""; // playerattack image path
let keys = {
    arrowLeft: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
    arrowDown: {
        pressed: false
    },
    arrowUp: {
        pressed: false
    },
    j: {
        pressed: false
    }
}
// It's a line drawn with canvas : 
// c.beginPath();
// c.moveTo(500,600);
// c.lineTo(600,400);
// c.stroke();

// It's a circle or a arc : 
// c.beginPath();
// c.arc(600,400,30,0,6.283185307179586,false);
// c.fillStyle = "red"
// c.stroke();

let mouse = {
    x:undefined,
    y:undefined
}
// Creating multiple moving circles with Object Oriented Programming :
let colorsArr = ["blue","chartreuse","greenyellow","purple","red","yellow","aqua","black","#FF6B1A","#00B3AD","#00ABBD"]
function colors(arr){
    return colorsArr[Math.floor(Math.random() * colorsArr.length)];

}
window.addEventListener("mousemove", function (e){
    mouse.x = e.x;
    mouse.y = e.y
})
window.addEventListener("resize",function (){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

class Player {
    constructor(img, x, y, width, height, dx, dy) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
    }
    draw() {
        c.drawImage(this.img, frameX * playeridlewidth, frameY * playeridleheight, playeridlewidth, playeridleheight, this.x, this.y, this.width, this.height);
    }
    update() {
        this.draw()
        this.y += this.dy;
        this.x += this.dx;

        if (this.y + this.height < 150) {
            keys.arrowUp.pressed = false
            this.dy = 0;
        }
        if (this.y + this.height > innerHeight) {
            this.dy = 0;
        }
        if (this.y + this.width <= 0) {
            this.dy = 0;
        }
    }
}
class Enemy {
    constructor(img, x, y, width, height, dx, dy, offset) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dx = dx;
        this.dy = dy;
        this.offset = offset;
    }
    draw() {
        c.drawImage(this.img, frameX2 * enemywalkingwidth, frameY2 * enemywalkingheight, enemywalkingwidth, enemywalkingheight, this.x, this.y, this.width, this.height);
    }
    attack() {
        this.draw()
        // this.y += this.dy;
        if (this.x + this.width > innerWidth || this.x - this.width < this.offset - 120) {
            this.dx = -this.dx
        }
        this.x += this.dx;
        if (this.y + this.height < 150) {
            keys.arrowUp.pressed = false
            this.dy = 0;
        }
        if (this.y + this.height > innerHeight) {
            this.dy = 0;
        }
        if (this.y + this.width <= 0) {
            this.dy = 0;
        }
    }
}
class Particle {
    constructor(x, y, radius, dx, dy, color) {
        this.x = x;
        this.y = y;
        this.radius = radius
        this.dx = dx;
        this.dy = dy;
        this.color = color
    }
    makeParticle() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill()
        c.stroke()
        c.closePath();
    }
    spawnParticles() {
        this.makeParticle();
        this.x += this.dx;
        this.x -= this.dy;
        this.y -= this.dy;
        this.x += this.dy;
        if (this.radius > 0) {
            this.radius -= 0.05
        }
        if (this.radius <= 0 || this.radius < 1 || this.x > innerWidth || this.y > innerHeight) {
            particles.splice(particles.indexOf(this), 1)
        }
    }
}
let particle;
let player = new Player(playeridle, 20, 10, 120, 120, 0, 20);
// let enemy2 = new Enemy(enemywalking,320,450,120,120,2,0);
function animate (){
    requestAnimationFrame(animate);
    // Drawing our background here :
    c.drawImage(background, 0, 0, innerWidth, innerHeight);
    if (gameFrame % staggerFrames == 0) {
        if (frameX < framesforplayer) {
            frameX++;
        }
        else {
            frameX = 0;
        }
    }
    gameFrame++;
    // player.update();
}
animate();

// Keydown and keyup events : 
addEventListener("keydown", (e) => {
    switch (e.key) {
        case " ":
            shoot.play();
            let dx = 20;
            let angle = "angle";
            framesforplayer = 21;
            staggerFrames = 3;
            player.img = playershoot;
            arrows.push(new Arrow(arrowimg, player.x, player.y, dx, 0, 100, 100, 1, angle))
            break;
        case "ArrowUp":
            jump.play()
            bg.volume = 0.8;
            staggerFrames = 20;
            framesforplayer = 9;
            keys.arrowUp.pressed = true;
            player.img = playerjump
            break;
        case "ArrowRight":
            staggerFrames = 4;
            framesforplayer = 21
            keys.arrowRight.pressed = true;
            break;
        case "ArrowLeft":
            keys.arrowLeft.pressed = true;
            break;
    }
})

addEventListener("keyup", (e) => {
    switch (e.key) {
        case " ":
            framesforplayer = 2;
            staggerFrames = 6;
            player.img = playeridle
            break;
        case "ArrowUp":
            bg.volume = 1.0
            staggerFrames = 6;
            framesforplayer = 2
            keys.arrowUp.pressed = false;
            player.img = playeridle
            player.dy = 15;
            break;
        case "ArrowLeft":
            staggerFrames = 6;
            framesforplayer = 2;
            keys.arrowLeft.pressed = false;
            player.img = playeridle;
            break;
        case "ArrowRight":
            staggerFrames = 6;
            framesforplayer = 2
            keys.arrowRight.pressed = false;
            player.img = playeridle
            break;
    }
})