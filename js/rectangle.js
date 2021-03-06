"use strict";
var rectangle = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = 'red';
	this.draw = function() {
		ctx.save();
		ctx.globalAlpha = 0.5;
		ctx.translate(this.x*32, this.y*32);
		ctx.fillStyle = this.color;
		ctx.fillRect(0, 0, this.width, this.height);
		ctx.restore();
	};
	this.update = function(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	};
};

var towersFilter = function(obj) {
	if (map1.mapData[obj[0]][obj[1]] !== 0) {
		return obj;
	}
};

var tower = function(tileX, tileY) {
	this.x = tileX*32 + 16;
	this.y = tileY*32 + 16;
	this.tileX = tileX;
	this.tileY = tileY;
	this.range = 64;
	this.fireRate = 10;
	this.timeSinceLastShot = 0;
	this.damagePerShot = 4;
	this.target = null;
	this.orientation = 0;
	this.findNewTarget = function(entList) {
		var closest = Infinity;
		for (var i in entList) {
			var distance = distanceForm(this.x, this.y, entList[i].x+16, entList[i].y+16);
			if (distance < closest && distance <= this.range) {
				this.target = entList[i];
			}
		}
	};
	this.draw = function(ctx) {
		var side = 32;
		var h = 32 * (Math.sqrt(3)/2);
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(-this.orientation);
		ctx.beginPath();
        
        ctx.moveTo(0, -h / 2);
        ctx.lineTo( -side / 2, h / 2);
        ctx.moveTo(side / 2, h / 2);
        ctx.lineTo(0, -h / 2);
        
        ctx.stroke();
        ctx.fill(); 
        
    	ctx.closePath();
		ctx.restore();
	};
	this.renderRange = function(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.fillStyle = "#4B0082";
		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		ctx.arc(0, 0, this.range, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	};
	this.update = function(entList) {
		this.timeSinceLastShot++;
		if (this.target !== null) {
			if (this.timeSinceLastShot >= this.fireRate) {
				this.target.takeDamage(1);
				this.timeSinceLastShot = 0;
			}
			this.orientation = (Math.atan2(this.target.x+16 - this.x, this.target.y+16 - this.y)+Math.PI);
			if (this.target.health <= 0 || distanceForm(this.x, this.y, this.target.x, this.target.y) > this.range) {
				this.target = null;
			}
		}
		if (this.target === null) {
			this.findNewTarget(entList);
		}
	};
};
