var _ = require("lodash");

class App {
	constructor(width, height, app) {

		var self = this;
		this.currentState = null;

		this.looping = false;
		this.ups = 2;
		this.interval = null;
		this.frame = null;

		// this.uCount = 0;
		// this.realUps = 0;

		// this.fps = 0;
		// this.fCount = 0;
		
		// this.now = Date.now();

		// Canvas initialization
		this.canvas = document.getElementById("canvas1");
		this.canvas.width = width;
		this.canvas.height = height;
		this.g = this.canvas.getContext("2d");

		this.canvas2 = document.getElementById("canvas2");
		this.canvas2.width = width;
		this.canvas2.height = height;
		this.g2 = this.canvas2.getContext("2d");

		this.canvas3 = document.getElementById("canvas3");
		this.canvas3.width = width;
		this.canvas3.height = height;
		this.g3 = this.canvas3.getContext("2d");

		// Binding mouse events to current state callbacks
		this.canvas2.addEventListener("mousedown", function(event) {
			if(self.currentState.onmousedown) self.currentState.onmousedown(self._getMousePos(event));
		});

		this.canvas2.addEventListener("mousemove", function(event) {
			if(self.currentState.onmousemove) self.currentState.onmousemove(self._getMousePos(event));
		});

		this.canvas2.addEventListener("mouseup", function(event) {
			if(self.currentState.onmouseup) self.currentState.onmouseup(self._getMousePos(event));
		});

		// Lodash object extension, extends destination with sources
		_.extend(this, app);
		
		// Check if interface methods are implemented
		if(!this.init) throw new Error("init method not implemented.");
		if(!this.update) throw new Error("update method not implemented.");
		if(!this.draw) throw new Error("draw method not implemented.");

		// Start the app
		this.init();
		this.draw();
	}

	toggleLoop() {
		if(!this.looping) {
			this.looping = true;
			this._update();
			this._draw();
			this.interval = setInterval(this._update.bind(this), 1000/this.ups);
		}
		else {
			this.looping = false;
			clearInterval(this.interval);
			cancelAnimationFrame(this.frame);
		}
	}

	setUps(ups) {
		this.ups = ups;
		if(this.looping) {
			clearInterval(this.interval);
			this.interval = setInterval(this._update.bind(this), 1000/this.ups);
		}
	}

	_update() {
		this.update();
		// this.uCount++;
		// var now = Date.now();
		// var delta = now - this.now;
		// if(delta >= 1000) {
		// 	this.now = now;
			
		// 	this.fps = this.fCount;
		// 	this.fCount = 0;

		// 	this.realUps = this.uCount;
		// 	this.uCount = 0;
		// }
	}

	_draw() {
		// this.fCount++;
		this.draw();
		this.frame = requestAnimationFrame(this._draw.bind(this));
	}

	step() {
		this.update();
		this.draw();
	}

	setState(state) {
		this.currentState = state;
		// // Pass a reference of the app to the state
		// this.currentState.app = this;
	}

	// Utility functions
	_getMousePos(event) {
		var rect = this.canvas.getBoundingClientRect();
		return {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};
	}
}

module.exports = App;
