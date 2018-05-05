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

var entList = [];
var towers = [];
var loopBegin = function() {
	loop();
};
var towerSelection = null;
var index = 0;
var loop = function() {
	ctx.clearRect(0, 0, canvas.width, canvas.width);
	for (var i = 0; i < entList.length; i++) {
		if (entList[i].destroy === false) {
			entList[i].update();
			entList[i].draw(ctx);
		}
	}
	if (index > 33) {
		entList.push(new circle(map1.path[0][0]*32, map1.path[0][1]*32, 16, map1.path));
		index = 0;
	}
	for (i in towers) {
		var y = towers[i][0];
		var x = towers[i][1];
		map1.mapData[y][x].update(entList);
		map1.mapData[y][x].draw(ctx);
	}
	if (towerSelection !== null) {
		towerSelection.renderRange(ctx);
	}
	var tEntList = entList.filter(entFilter);
	entList = tEntList;
	tEntList = null;
	index++;
	cursor.draw(ctx);
	window.requestAnimationFrame(loop);
};

var cursor = new rectangle(-32, -32, 32, 32);
canvas.onmousemove = function(e) {
	var mouseX = e.offsetX - 2;
	var mouseY = e.offsetY;
	var tileX = Math.floor(mouseX/32);
	var tileY = Math.floor(mouseY/32);
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
		if (e.button === 0) {
			if (map1.mapData[tileY][tileX] === 0) {
				map1.mapData[tileY][tileX] = (new tower(tileX, tileY));
				towers.push([tileY, tileX]);
			} else if (map1.mapData[tileY][tileX] !== typeof 0) {
				if (map1.mapData[tileY][tileX] !== towerSelection) {
					towerSelection = map1.mapData[tileY][tileX];
				} else {
					towerSelection = null;
				}
			}
		} else if (e.button === 2) {
			if (map1.mapData[tileY][tileX] !== typeof 0) {
				if (map1.mapData[tileY][tileX] === towerSelection) {
					towerSelection = null;
				}
				map1.mapData[tileY][tileX] = 0;
				towers = towers.filter(towersFilter);
			}
		}
	}
};

canvas.oncontextmenu = function(e) {
	canvas.onclick(e);
	return false;
};
draw();
