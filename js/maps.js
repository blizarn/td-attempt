"use strict";
/**
 * @author Morgan
 */
var renderMap = function(ctx, mapObj) {
	ctx.clearRect(0, 0, 480, 480);
	var length = 32;
	for (var y in mapObj.mapData) {
		for (var x in mapObj.mapData[y]) {
			if (mapObj.mapData[y][x] === 1) {
				ctx.save();
				ctx.translate(x*32, y*32);
				ctx.fillStyle = '#458B00';
				ctx.fillRect(0, 0, length, length);
				ctx.restore();
				//console.log(x + ',' + y);
			} else if (mapObj.mapData[y][x] === 0) {
				ctx.save();
				ctx.translate(x*32, y*32);
				ctx.fillStyle = '#000000';
				ctx.strokeRect(0, 0, length, length);
				ctx.restore();
				//console.log(x + ',' + y);
			} else {
				ctx.save();
				ctx.translate(x*32, y*32);
				ctx.fillStyle = '#3B5323';
				ctx.fillRect(0, 0, length, length);
				ctx.restore();
				//console.log(x + ',' + y);
			}
		}
	}
};

var map = function() {
	this.mapData = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //1
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //2
	[2, 1, 1, 1, 2, 0, 0, 0, 0, 0, 2, 1, 1, 1, 2], //3
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //4
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //5
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //6
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //7
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //8
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //9
	[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0], //10
	[0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0], //11
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //12
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //13
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  //14
	//0 1  2  3  4  5  6  7  8  9 10 11 12 13 14
	];
	this.path = [[0, 3], [4, 3], [4, 11], [10, 11], [10, 3], [14, 3]];
};