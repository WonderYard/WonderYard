var App = require("./App");
var Grid = require("./Grid");
var Automaton = require("./Automaton");
window.StateManager = require("./StateManager");

window.wonderyard = new App(800, 600, {
	
	init() {
		this.grid = new Grid(256, 256);

		// Temp!
		this.automaton = new Automaton();
		
		this.setState(StateManager.select);

		this.drawOverlayGrid = true;
		this.overlayGridThreshold = 16;
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

		// Overlay
		this.g3.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		if(this.drawOverlayGrid && this.grid.scale >= this.overlayGridThreshold) {
			
			this.g3.save();
			this.g3.translate(.5, .5);
			
			this.g3.lineWidth = 1;
			this.g3.strokeStyle = "#777777";
			this.g3.setLineDash([this.grid.scale / 8, this.grid.scale / 8]);
			
			this.g3.beginPath();
			for(var i = 0; i < this.grid.rows; i++) {

				this.g3.moveTo(this.grid.x, i * this.grid.scale + this.grid.y);
				this.g3.lineTo(this.grid.x + this.grid.scale * this.grid.cols, i * this.grid.scale + this.grid.y);
				
				this.g3.moveTo(i * this.grid.scale + this.grid.x, this.grid.y);
				this.g3.lineTo(i * this.grid.scale + this.grid.x, this.grid.y + this.grid.scale * this.grid.rows);
				
			}
			this.g3.stroke();

			this.g3.restore();
		}
	},

	drawCell(x, y) {
		this.g.fillStyle = this.automaton.getColor(this.grid.getCell(x, y));
		this.g.fillRect(x * this.grid.scale + this.grid.x, y * this.grid.scale + this.grid.y, this.grid.scale, this.grid.scale);
	},

	toggleOverlayGrid() {
		if(this.drawOverlayGrid) {
			if(this.grid.scale >= this.overlayGridThreshold) this.drawOverlayGrid = false;
			else this.overlayGridThreshold = this.grid.scale;
		}
		else {
			this.overlayGridThreshold = this.grid.scale;
			this.drawOverlayGrid = true;
		}
		this.draw();
	}
});
