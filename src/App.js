var _ = require("lodash");

class App {
	constructor(width, height, app) {

		var self = this;
		this.currentState = null;

		// Canvas initialization
		this.canvas = document.createElement("canvas");
		this.canvas.width = width;
		this.canvas.height = height;
		document.body.appendChild(this.canvas);
		this.g = this.canvas.getContext("2d");

		// Binding mouse events to current state callbacks
		this.canvas.addEventListener("mousedown", function(event) {
			if(self.currentState.onmousedown) self.currentState.onmousedown(self._getMousePos(event));
		});

		this.canvas.addEventListener("mousemove", function(event) {
			if(self.currentState.onmousemove) self.currentState.onmousemove(self._getMousePos(event));
		});

		this.canvas.addEventListener("mouseup", function(event) {
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

	setState(state) {
		this.currentState = state;
		// Pass a reference of the app to the state
		this.currentState.app = this;
	}

	requestDraw() {
		// Conditions
		// ...
		this.draw();
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