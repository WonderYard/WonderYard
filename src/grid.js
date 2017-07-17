function Grid(data) {
  this.grid = [];
  this.cols = 40;
  this.rows = 40;
  for(var y = 0; y < this.rows; y++) {
    this.grid.push([]);
    for(var x = 0; x < this.cols; x++) {
      this.grid[y].push(0);
    }
  }
  this.data = data;
  this.size = 16;
  this.offset_x = 0;
  this.offset_y = 0;
}

Grid.prototype.setGrid = function(grid) {
  this.grid = grid;
};

Grid.prototype.getCell = function(x, y) {
  if(x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length) return this.grid[y][x];
	return 0;
};

Grid.prototype.setCell = function(x, y, id) {
  this.grid[y][x] = id;
};

Grid.prototype.draw = function(canvas, g) {
  g.clearRect(0, 0, canvas.width, canvas.height);
  for(var y = 0; y < this.grid.length; y++) {
    for(var x = 0; x < this.grid[0].length; x++) {
      g.fillStyle = this.data.states[this.getCell(x, y)].color;
      g.fillRect(x * this.size + this.offset_x, y * this.size + this.offset_y, this.size, this.size);
    }
  }
};

module.exports.Grid = Grid;