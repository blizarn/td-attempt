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
		ctx.fillRect(-1, -1, this.width, this.height);
		ctx.restore();
	};
	this.update = function(x, y, color) {
		this.x = x;
		this.y = y;
		this.color = color;
	};
};