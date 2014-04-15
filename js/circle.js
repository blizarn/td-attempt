var circle = function(x, y, radius, path) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.path = path;
	this.index = 0;
	this.destroy = false;
	this.velocity = 2;
	this.draw = function() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.fillStyle = "#FF0000";
		ctx.beginPath();
		ctx.arc(this.radius-1, this.radius-1, this.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	};
	this.update = function(canvas) {
		if (this.index === this.path.length) {
			this.destroy = true;
		} else if (this.x === this.path[this.index][0]*32 && this.y === this.path[this.index][1]*32) {
			this.index++;
		} else {
			if (this.x !== this.path[this.index][0]*32) {
				if (this.x > this.path[this.index][0]*32) {
					this.x -= this.velocity;
				} else {
					this.x += this.velocity;
				}
			} else if (this.y !== this.path[this.index][1]*32) {
				if (this.y > this.path[this.index][1]*32) {
					this.y -= this.velocity;
				} else {
					this.y += this.velocity;
				}
			}
		}
	};
};