'use strict';
import context from "../../scripts/context.js";
import * as Utils from "../../scripts/utils.js";

let width = context.canvas.width;
let height = context.canvas.height;

window.onmousemove = mouseMove;
window.onmousedown = mouseDown;
window.onmouseup = mouseUp;

let playerX = width / 2;
let stars = [];
let invaders = [];
let frameCount = 0;
let bullets = [];
let isShooting = false;

setup();
update();

function setup() {
    for (let i = 0; i < 1000; i++) {
        createStar(i);
    }

    //calculate how many invaders fit in the window.
    let nColums = width / 75 - 1;
    let nRows = height / 75 - 4;


    for (let i = 0; i < nColums; i++) {
        for (let j = 0; j < nRows; j++) {
            let invader = {
                x: 25 + i * 75,
                y: 25 + j * 75,
                dance: function () {
                    //Change the stance of the alien every half second
                    drawInvader(this.x, this.y, frameCount % 60 < 30);
                }
            };
            invaders.push(invader);
        }
    }
}

function createStar(i) {
    let star = {
        x: Utils.randomNumber(0, width),
        y: Utils.randomNumber(0, height),
        size: Utils.randomNumber(1, 10),
        hsla: randomStarColor(),
        blink: function () {
            drawStar(this.x, this.y, this.size + (Math.sin(i / 10 + frameCount / 10)) * this.size / 4, this.hsla);
        }
    };
    stars.push(star);
}


function update() {
    frameCount++;

    //Erase the canvas
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    //loop over all the stars and animate them
    for (let i = 0; i < stars.length; i++) {
        stars[i].blink();
    }

    //if there are no invaders left: GAME OVER
    if (invaders.length == 0) {
        context.fillStyle = "white";
        context.textAlign = "center";
        context.font = "bold 58pt Arial";
        context.fillText("GAME OVER", width / 2, height / 2);
    } else {
        //loop over all the invaders and make them dance
        for (let i = 0; i < invaders.length; i++) {
            invaders[i].dance();
            //check for each invader if it got hit by a bullet
            for (let b = 0; b < bullets.length; b++) {
                if (i != invaders.length && bullets[b].x > invaders[i].x && bullets[b].x < invaders[i].x + 50 && bullets[b].y > invaders[i].y && bullets[b].y < invaders[i].y + 50) {
                    //when the invader was hit, remove it from the array
                    //and also remove the bullet from the array
                    bullets.splice(b, 1);
                    invaders.splice(i, 1);
                    i--;
                }
            }
        }

        //Loop over each bullet, move it and draw it on the screen.
        if (bullets.length > 0) {
            for (let i = 0; i < bullets.length; i++) {
                bullets[i].move();
                //when a bullet moves passed the top of the screen, remove it.
                if (bullets[i].y < 0) {
                    bullets.splice(i, 1);
                }

            }
        }

        //shoot 12 times per second while holding down the mousebutton
        if (frameCount % 5 == 0 && isShooting) {
            //create a new bullet and add it to the array
            let bullet = {
                x: playerX - 10,
                y: height - 75,
                move: function () {
                    this.y -= 5;
                    drawBullet(this.x, this.y);
                }
            };
            bullets.push(bullet);
        }

        //draw the player
        drawShip(playerX, height - 25);
    }

    requestAnimationFrame(update);

}

/**
 * Generate a random star color and return it as a hsla string.
 */
function randomStarColor() {
    let r = Utils.randomNumber(0, 2);
    //red
    let hue = 0;
    if (r == 0) {
        //yellow
        hue = 60;
    } else if (r == 1) {
        //blue
        hue = 180;
    }
    return Utils.hsla(hue, Utils.randomNumber(50, 100), Utils.randomNumber(25, 75), Utils.randomNumber(25, 75));
}

function drawStar(x, y, radius, hsla) {
    context.fillStyle = hsla;
    context.beginPath();
    context.moveTo(x, y - radius);
    context.arcTo(x, y, x + radius, y, radius);
    context.arcTo(x, y, x, y + radius, radius);
    context.arcTo(x, y, x - radius, y, radius);
    context.arcTo(x, y, x, y - radius, radius);
    context.fill();
}

function drawShip(x, y) {
    context.fillStyle = "red";
    context.fillRect(x - 30, y, 55, 5);
    context.fillRect(x - 20, y - 5, 10, 15);
    context.fillRect(x - 10, y - 30, 15, 30);
    context.fillRect(x - 5, y - 35, 5, 5);
    context.fillRect(x + 5, y - 5, 10, 15);
}

function drawInvader(x, y, down) {
    context.fillStyle = Utils.rgb(0, 255, 0);
    if (down) {
        context.fillRect(x, y + 20, 5, 15);
        context.fillRect(x + 50, y + 20, 5, 15);
        context.fillRect(x + 5, y + 15, 5, 5);
        context.fillRect(x + 45, y + 15, 5, 5);
        context.fillRect(x + 15, y + 35, 10, 5);
        context.fillRect(x + 30, y + 35, 10, 5);
    } else {
        context.fillRect(x, y, 5, 15);
        context.fillRect(x + 50, y, 5, 15);
        context.fillRect(x + 5, y + 15, 5, 5);
        context.fillRect(x + 45, y + 15, 5, 5);
        context.fillRect(x + 5, y + 35, 5, 5);
        context.fillRect(x + 45, y + 35, 5, 5);
    }

    context.fillRect(x + 10, y, 5, 5);
    context.fillRect(x + 10, y + 10, 5, 25);
    context.fillRect(x + 15, y + 5, 5, 10);
    context.fillRect(x + 15, y + 20, 5, 10);
    context.fillRect(x + 20, y + 10, 5, 20);
    context.fillRect(x + 25, y + 10, 5, 20);
    context.fillRect(x + 30, y + 10, 5, 20);
    context.fillRect(x + 35, y + 5, 5, 10);
    context.fillRect(x + 35, y + 20, 5, 10);
    context.fillRect(x + 40, y, 5, 5);
    context.fillRect(x + 40, y + 10, 5, 25);

}

function drawBullet(x, y) {
    context.fillStyle = "orange";
    context.fillRect(x, y, 5, 15);
}

/**
 * 
 * @param {MouseEvent} e 
 */
function mouseMove(e) {
    playerX = e.pageX;
}


/**
 * 
 * @param {MouseEvent} e 
 */
function mouseDown(e) {
    isShooting = true;
}

/**
 * 
 * @param {MouseEvent} e 
 */
function mouseUp(e) {
    isShooting = false;
}