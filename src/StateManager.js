var selectionRect = null;

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
			requestDraw.call(this);
		}
	},

	onmouseup(event) {
		this.mouse = null;
	},
};

state.painting = {
	onmousedown(event) {
		this.mouse = expandMouse.call(this, event);
		
		if(this.app.grid.inBounds(this.mouse.cell.x, this.mouse.cell.y)) {
			
			if(!selectionRect || inBounds(this.mouse.cell, selectionRect)) {
			
				this.app.grid.setCell(this.mouse.cell.x, this.mouse.cell.y, 1);
				this.app.drawCell(this.mouse.cell.x, this.mouse.cell.y);
			}
		}
	},

	onmousemove(event) {
		if(this.mouse) {
			var mouse = expandMouse.call(this, event);

			line.call(this, this.mouse.cell.x, this.mouse.cell.y, mouse.cell.x, mouse.cell.y);
			this.mouse = mouse;
		}
	},

	onmouseup() {
		this.mouse = null;
	}
};

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
		requestDraw.call(this);
	},

	invertDirection() {
		this.direction = this.direction == 1 ? 0.25 : 1;
	}
};

state.select = {

	onmousedown(event) {
		this.mouse = expandMouse.call(this, event);
		if(selectionRect) {
			if(inBounds(this.mouse.cell, selectionRect)) {
				this.drag = this.mouse;
			}
			else {
				selectionRect = null;
				this.rect = {
					ax: this.mouse.cell.x,
					ay: this.mouse.cell.y,
					bx: this.mouse.cell.x,
					by: this.mouse.cell.y
				};
				requestDraw.call(this);
			}
		}
		else {
			this.rect = {
				ax: this.mouse.cell.x,
				ay: this.mouse.cell.y,
				bx: this.mouse.cell.x,
				by: this.mouse.cell.y
			};
			requestDraw.call(this);
		}
	},

	onmousemove(event) {
		var mouse = expandMouse.call(this, event);
		if(this.mouse) {
			if(this.drag) {
				var dx = - this.drag.cell.x + mouse.cell.x;
				var dy = - this.drag.cell.y + mouse.cell.y;
				this.rect.ax += dx;
				this.rect.ay += dy;
				this.rect.bx += dx;
				this.rect.by += dy;
				this.drag = mouse;
			} else {
				this.rect.bx = mouse.cell.x;
				this.rect.by = mouse.cell.y;
			}
			selectionRect = this.rect;
			requestDraw.call(this);
		}
	},

	onmouseup(event) {
		this.mouse = null;
		this.drag = false;
	},

	draw() {
		this.app.g2.clearRect(0, 0, this.app.canvas2.width, this.app.canvas2.height);
		
		if(!selectionRect) return;

		// Pixel perfect fix for 1px stroke line
		this.app.g2.save();
		this.app.g2.translate(.5, .5);
		
		this.app.g2.lineWidth = 3;
		this.app.g2.setLineDash([6, 6]);

		// // Start cell
		// this.app.g2.strokeStyle = "#0f0";
		// this.app.g2.strokeRect(selectionRect.ax * this.app.grid.scale + this.app.grid.x, selectionRect.ay * this.app.grid.scale + this.app.grid.y, this.app.grid.scale, this.app.grid.scale);
		
		// // End cell
		// this.app.g2.strokeStyle = "#f00";
		// this.app.g2.strokeRect(selectionRect.bx * this.app.grid.scale + this.app.grid.x, selectionRect.by * this.app.grid.scale + this.app.grid.y, this.app.grid.scale, this.app.grid.scale);
		
		var topx = selectionRect.ax;
		var topy = selectionRect.ay;

		var botx = selectionRect.bx - selectionRect.ax;
		var boty = selectionRect.by - selectionRect.ay;

		// Adjust selection rectangle border, different case for each axis if selection is inverted (bot-top, right-left) 
		if(selectionRect.ax < selectionRect.bx) botx++;
		else { botx--; topx++; }
		if(selectionRect.ay < selectionRect.by) boty++;
		else { boty--; topy++; }

		this.app.g2.strokeStyle = "#777777";
		this.app.g2.strokeRect(topx * this.app.grid.scale + this.app.grid.x, topy * this.app.grid.scale + this.app.grid.y, botx * this.app.grid.scale, boty * this.app.grid.scale);

		this.app.g2.restore();
	}
};

// TODO: single function for each type of coordinates (?)
function expandMouse(event) {
	var mouse = { raw: event };
	var grid = this.app.grid;

	mouse.grid = {
		x: mouse.raw.x - grid.x,
		y: mouse.raw.y - grid.y
	};

	mouse.cell = {
		x: Math.floor(mouse.grid.x / grid.scale),
		y: Math.floor(mouse.grid.y / grid.scale)
	};

	return mouse;
}

function requestDraw() {
	
	// Other conditions (?)
	// if(!this.app.looping || this.app.ups < 60) { // Code here }

	for(s in state) {
		if(state[s].draw) state[s].draw();
	}
	this.app.draw();
}

function line(ax, ay, bx, by) {
	var dx = Math.abs(bx - ax);
	var dy = Math.abs(by - ay);
	var sx = (ax < bx) ? 1 : -1;
	var sy = (ay < by) ? 1 : -1;
	var err = dx - dy;

	while(true) {
		if(this.app.grid.inBounds(ax, ay)) {
			if(!selectionRect || inBounds({x: ax, y: ay}, selectionRect)) {
				this.app.grid.setCell(ax, ay, 1);
				this.app.drawCell(ax, ay);
			}
		}

		if (ax == bx && ay == by) break;
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

function inBounds(point, area) {
	var ax = Math.min(area.ax, area.bx);
	var ay = Math.min(area.ay, area.by);
	var bx = Math.max(area.ax, area.bx) + 1;
	var by = Math.max(area.ay, area.by) + 1;
	return point.x >= ax && point.x < bx && point.y >= ay && point.y < by;
}

module.exports = state;
