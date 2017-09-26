var state = {};

state.moving = {
	onmousedown(mouse) {
		this.mouse = mouse;
	},

	onmousemove(mouse) {
		if(this.mouse) {
			this.app.grid.x += mouse.x - this.mouse.x;
			this.app.grid.y += mouse.y - this.mouse.y;

			this.mouse = mouse;
			this.app.requestDraw();
		}
	},

	onmouseup(event) {
		this.mouse = null;
	},
};

state.painting = {
	onmousedown(event) {
		this.mouse = {};
		this.mouse.raw = event;
		
		if(this.app.grid.hitTest(this.mouse.raw)) {

			var gridX = this.mouse.raw.x - this.app.grid.x;
			var gridY = this.mouse.raw.y - this.app.grid.y;
			this.mouse.grid = {x: gridX, y: gridY};

			var cellX = Math.floor(gridX / this.app.grid.scale);
			var cellY = Math.floor(gridY / this.app.grid.scale);
			this.mouse.cell = {x: cellX, y: cellY};
			
			this.app.grid.setCell(cellX, cellY, this.app.grid.getCell(cellX, cellY) ^ 1);
			
			this.app.drawCell(cellX, cellY);
		}
	},
	
	onmousemove(event) {
		if(this.mouse) {
			var mouse = {};
			mouse.raw = event;

			if(this.app.grid.hitTest(mouse.raw)) {

				var gridX = mouse.raw.x - this.app.grid.x;
				var gridY = mouse.raw.y - this.app.grid.y;
				mouse.grid = {x: gridX, y: gridY};

				var cellX = Math.floor(gridX / this.app.grid.scale);
				var cellY = Math.floor(gridY / this.app.grid.scale);
				mouse.cell = {x: cellX, y: cellY};
				if(this.mouse.cell && (this.mouse.cell.x != cellX || this.mouse.cell.y != cellY)) {
					this.app.grid.setCell(cellX, cellY, this.app.grid.getCell(cellX, cellY) ^ 1);
					this.app.drawCell(cellX, cellY);
				}
			}
			this.mouse = mouse;
		}
	},

	onmouseup(event) {
		this.mouse = null;
	},
};

state.zooming = {
	onmousedown(mouse) {
		var grid = this.app.grid;
		var zoom = 2;
		grid.scale = Math.round(grid.scale * zoom);

		var factor = 1 - zoom;
		grid.x += Math.round((mouse.x - grid.x) * factor);
		grid.y += Math.round((mouse.y - grid.y) * factor);
		this.app.requestDraw();
	}
}

module.exports = state;
