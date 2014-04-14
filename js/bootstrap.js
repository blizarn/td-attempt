/*window.onload = window.onresize = function() {
   var canvas = document.getElementById('canvas-container');
   var viewportWidth = window.innerWidth;
   var viewportHeight = window.innerHeight;
   var canvasWidth = 640;
   var canvasHeight = 480;

   canvas.style.position = "absolute";
   canvas.style.left = (viewportWidth - canvasWidth)/2 + "px";
   canvas.setAttribute("height", canvasHeight);
   canvas.style.top = (viewportHeight - canvasHeight) / 2 + "px";
   canvas.style.left = (viewportWidth - canvasWidth) / 2 + "px";
   draw();
};*/

var canvas,        // the visible canvas element    
    ctx,       // the 2d context of `canvas`
    currentScreen; // the currently rendered screen for the game
 
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
	loop();
};

var box = new rectangle(0, canvas.height/2, 32, 32, 1, 0);
var loop = function() {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (box.x > canvas.width) {
		box.x = 0;
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	box.update();
	box.draw(ctx);
	window.requestAnimationFrame(loop);
};

draw();
var map1 = new map();
mapCtx = document.getElementById('map').getContext('2d');
renderMap(mapCtx, map1);
