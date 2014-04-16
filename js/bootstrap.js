"use strict";
var canvas,        // the visible canvas element    
    ctx,       // the 2d context of `canvas`
    currentScreen; // the currently rendered screen for the game
//Map variables
var map1 = new map();
var mapCanvas = document.getElementById('map');
var mapCtx = mapCanvas.getContext('2d');
renderMap(mapCtx, map1);
 
canvas = document.getElementById("board");

ctx = canvas.getContext('2d');

var draw = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height/2);
	ctx.rotate(Math.PI/4);
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(-20, -20, 20, 20);
	ctx.restore();
	loopBegin();
};

var circle1 = [];
var towers = [];
var loopBegin = function() {
	loop();
};
var index = 0;
var loop = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < 10; i++) {
		if (circle1[i] === undefined && index > 33) {
			circle1[i] = new circle(map1.path[0][0]*32, map1.path[0][1]*32, 16, map1.path);
			index = 0;
		} else if (circle1[i] !== undefined){
			if (circle1[i].destroy === false) {
				circle1[i].update();
				circle1[i].draw(ctx);
			} else if (index > 33) {
				circle1[i] = new circle(map1.path[0][0]*32, map1.path[0][1]*32, 16, map1.path);
				index = 0;
			}
		}
	}
	for (i in towers) {
		towers[i].update(circle1);
		towers[i].draw(ctx);
	}
	index++;
	cursor.draw(ctx);
	window.requestAnimationFrame(loop);
};

var cursor = new rectangle(-32, -32, 32, 32);
canvas.onmousemove = function(e) {
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	var tileX = Math.floor(mouseX/32);
	var tileY = Math.floor(mouseY/32);
	//console.log(Math.floor(mouseX/32) + ', ' + Math.floor(mouseY/32));
	if (mouseX < 480 && mouseY < 480) {
		if (map1.mapData[tileY][tileX] === 0) {
			cursor.update(Math.floor(mouseX/32), Math.floor(mouseY/32), 'blue');
		} else {
			cursor.update(Math.floor(mouseX/32), Math.floor(mouseY/32), 'red');
		}
	} else {
		cursor.update(-16, -16, 'red');
	}
};

canvas.onclick = function(e) {
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	var tileX = Math.floor(mouseX/32);
	var tileY = Math.floor(mouseY/32);
	if (mouseX < 480 && mouseY < 480) {
		console.log(tileX + ', ' + tileY);
		if (map1.mapSubData[tileY][tileX] === 0) {
			console.log(true);
			map1.mapSubData[tileY][tileX] = -1;
			towers.push(new tower(tileX, tileY));
		}
	}
	//console.log(e);
};
draw();