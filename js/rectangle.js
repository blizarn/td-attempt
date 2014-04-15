var rectangle = function(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.draw = function() {
		ctx.save();
		ctx.translate(this.x*32, this.y*32);
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(-1, -1, this.width, this.height);
		ctx.restore();
	};
	this.update = function(x, y) {
		this.x = x;
		this.y = y;
	};
};