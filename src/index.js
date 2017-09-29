var App = require("./App");
var Grid = require("./Grid");
var Automaton = require("./Automaton");
window.StateManager = require("./StateManager");

window.wonderyard = new App(800, 600, {
	
	init() {
		this.grid = new Grid(128, 64);

		// Temp!
		this.automaton = new Automaton();
		
		for(s in StateManager) {
			StateManager[s].app = this;
		}

		this.setState(StateManager.select);
		StateManager.overlay.draw();
	},
	
	update() {
		// Temp!
		this.grid._data = this.automaton.evolve(this.grid);
	},

	draw() {
		this.g.fillStyle = "#777777";
		this.g.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.g.fillStyle = this.automaton.getColor(0);
		this.g.fillRect(this.grid.x, this.grid.y, this.grid.getWidth(), this.grid.getHeight());

		for(var y = 0; y < this.grid.rows; y++) {
			for(var x = 0; x < this.grid.cols; x++) {
				if(this.grid.getCell(x, y)) this.drawCell(x, y);
			}
		}
	},

	drawCell(x, y) {
		this.g.fillStyle = this.automaton.getColor(this.grid.getCell(x, y));
		this.g.fillRect(x * this.grid.scale + this.grid.x, y * this.grid.scale + this.grid.y, this.grid.scale, this.grid.scale);
	},
});
