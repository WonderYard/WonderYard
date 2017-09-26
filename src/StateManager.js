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

function line(ax, ay, bx, by) {
	var dx = Math.abs(bx - ax);
	var dy = Math.abs(by - ay);
	var sx = (ax < bx) ? 1 : -1;
	var sy = (ay < by) ? 1 : -1;
	var err = dx-dy;

	while(true) {
		if(this.app.grid.inBounds(ax, ay)) {
			this.app.grid.setCell(ax, ay, 1);
			this.app.drawCell(ax, ay);
		}

		if ((ax == bx) && (ay == by)) break;
		var e2 = 2 * err;
		if (e2 > -dy) {
			err -= dy;
			ax += sx;
		}
		if (e2 < dx) {
			err += dx;
			ay += sy;
		}
	}
}

state.painting = {
	onmousedown(event) {
		this.mouse = {};
		this.mouse.raw = event;
		expandMouse.call(this, this.mouse);
		
		if(this.app.grid.inBounds(this.mouse.cell.x, this.mouse.cell.y)) {	
			this.app.grid.setCell(this.mouse.cell.x, this.mouse.cell.y, 1);
			
			this.app.drawCell(this.mouse.cell.x, this.mouse.cell.y);
		}
	},

	onmousemove(event) {
		if(this.mouse) {
			var mouse = {};
			mouse.raw = event;

			expandMouse.call(this, mouse);
			line.call(this, this.mouse.cell.x, this.mouse.cell.y, mouse.cell.x, mouse.cell.y);
			this.mouse = mouse;
		}
	},

	onmouseup() {
		this.mouse = null;
	}
};

function expandMouse(mouse) {
	var grid = this.app.grid;

	mouse.grid = {
		x: mouse.raw.x - grid.x,
		y: mouse.raw.y - grid.y
	};

	mouse.cell = {
		x: Math.floor(mouse.grid.x / grid.scale),
		y: Math.floor(mouse.grid.y / grid.scale)
	};
}

state.zooming = {
	direction: .25,

	onmousedown(mouse) {
		var grid = this.app.grid;
		if(grid.scale == 1 && this.direction < 1) return;
		var zoom = 2 * this.direction;
		grid.scale = Math.round(grid.scale * zoom);

		var factor = 1 - zoom;
		grid.x += Math.round((mouse.x - grid.x) * factor);
		grid.y += Math.round((mouse.y - grid.y) * factor);
		this.app.requestDraw();
	},

	invertDirection() {
		this.direction = this.direction == 1 ? 0.25 : 1;
	}
}

module.exports = state;
