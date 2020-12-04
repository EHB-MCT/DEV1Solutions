'use strict';
import context from "../../scripts/context.js";
import * as Utils from "../../scripts/utils.js";

let width = context.canvas.width;
let height = context.canvas.height;


setup();
update();

function setup() {

}


function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    drawStar(100, 80, 20, Utils.hsla(50, 100, 50, 100));
    drawShip(200, 100);
    drawBullet(195, 40);
    drawInvader(275, 60, false);
    drawInvader(375, 60, true);
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