"use strict";
import context from "../../scripts/context.js";

export function rgb(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")";
}

export function hsl(h, s, l) {
    return "hsl(" + h + "," + s + "%," + l + "%)";
}

export function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

export function strokeCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.stroke();
}

export function fillCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

export function strokeEllipse(x, y, w, h) {
    context.beginPath();
    context.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
    context.stroke();
}

export function fillEllipse(x, y, w, h) {
    context.beginPath();
    context.ellipse(x, y, w, h, 0, 0, Math.PI * 2);
    context.fill();
}

export function fillAndStrokeCircle(x, y, radius) {
    fillCircle(x, y, radius);
    strokeCircle(x, y, radius);
}

export function fillAndStrokeEllipse(x, y, w, h) {
    fillEllipse(x, y, w, h);
    strokeCircle(x, y, w, h);
}