var rectangle = function(x, y, width, height, velX, velY) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.shape = 0;
	this.width = width;
	this.height = height;
	this.draw = function() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.width/-2, this.height/-2, this.width, this.height);
		ctx.restore();
	};
	this.update = function(canvas) {
		this.x += this.velX;
		this.y += this.velY;
	};
	this.moveTo = function(x, y) {
		this.x = x;
		this.y = y;
	};
};