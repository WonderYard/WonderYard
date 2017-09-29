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
	
	currentColor: 1,

	onmousedown(event) {
		this.mouse = expandMouse.call(this, event);
		
		if(this.app.grid.inBounds(this.mouse.cell.x, this.mouse.cell.y)) {
			
			if(!selectionRect || inBounds(this.mouse.cell, selectionRect)) {
			
				this.app.grid.setCell(this.mouse.cell.x, this.mouse.cell.y, this.currentColor);
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
				this.draw();
			}
		}
		else {
			this.rect = {
				ax: this.mouse.cell.x,
				ay: this.mouse.cell.y,
				bx: this.mouse.cell.x,
				by: this.mouse.cell.y
			};
			this.draw();
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
			this.draw();
		}
	},

	onmouseup(event) {
		this.mouse = null;
		this.drag = false;
	},

	draw() {
		this.app.g2.clearRect(0, 0, this.app.canvas2.width, this.app.canvas2.height);
		
		if(!selectionRect) return;

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

		this.app.g2.lineWidth = 2;
		
		this.app.g2.strokeStyle = "#000000";
		this.app.g2.setLineDash([]);
		this.app.g2.strokeRect(topx * this.app.grid.scale + this.app.grid.x, topy * this.app.grid.scale + this.app.grid.y, botx * this.app.grid.scale, boty * this.app.grid.scale);

		this.app.g2.strokeStyle = "#ffffff";
		this.app.g2.setLineDash([8, 8]);
		this.app.g2.strokeRect(topx * this.app.grid.scale + this.app.grid.x, topy * this.app.grid.scale + this.app.grid.y, botx * this.app.grid.scale, boty * this.app.grid.scale);
	}
};

state.overlay = {
	
	drawOverlayGrid: true,
	overlayGridThreshold: 2,

	toggleOverlayGrid() {
		if(this.app.grid.scale >= this.overlayGridThreshold) {
			this.drawOverlayGrid = !this.drawOverlayGrid;
		}
		this.draw();
	},

	draw() {
		this.app.g3.clearRect(0, 0, this.app.canvas.width, this.app.canvas.height);

		if(this.drawOverlayGrid && this.app.grid.scale >= this.overlayGridThreshold) {
			
			this.app.g3.save();
			this.app.g3.translate(.5, .5);
			
			this.app.g3.lineWidth = 1;
			this.app.g3.strokeStyle = "#777777";
			//this.app.g3.setLineDash([this.app.grid.scale / 8, this.app.grid.scale / 8]);
			
			this.app.g3.beginPath();
			for(var i = 0; i < this.app.grid.rows; i++) {

				this.app.g3.moveTo(this.app.grid.x, i * this.app.grid.scale + this.app.grid.y);
				this.app.g3.lineTo(this.app.grid.x + this.app.grid.scale * this.app.grid.cols, i * this.app.grid.scale + this.app.grid.y);
				
				this.app.g3.moveTo(i * this.app.grid.scale + this.app.grid.x, this.app.grid.y);
				this.app.g3.lineTo(i * this.app.grid.scale + this.app.grid.x, this.app.grid.y + this.app.grid.scale * this.app.grid.rows);
				
			}
			this.app.g3.stroke();

			this.app.g3.restore();
		}
	}
}

state.bucket = {
	onmousedown(event) {
		var mouse = expandMouse.call(this, event);
		var x = mouse.cell.x;
		var y = mouse.cell.y;

		var target = this.app.grid.getCell(x, y);

		var queue = [{x, y}];
		var current;

		while (queue.length) {
			current = queue.shift();
			x = current.x;
			y = current.y;
			if (this.app.grid.getCell(x, y) == target && (!selectionRect || inBounds({x, y}, selectionRect))) {
				this.app.grid.setCell(x, y, state.painting.currentColor);

				if (x > 0) {
					queue.push({x:x-1, y:y})
				}

				if (x < this.app.grid.cols - 1) {
					queue.push({x:x+1, y:y})
				}

				if (y > 0) {
					queue.push({x:x, y:y-1});
				}

				if (y < this.app.grid.rows - 1) {
					queue.push({x:x, y:y+1});
				}
			}
		}

		this.app.draw();
	},
}

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
	
	if(!this.app.looping) {

		for(s in state) {
			if(state[s].draw) state[s].draw();
		}
		this.app.draw();
	}
	else {
		state.overlay.draw();
	}
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
