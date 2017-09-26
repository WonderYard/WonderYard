class Grid {
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    
    this._data = new Uint8Array(this.cols * this.rows);
    for(var y = 0; y < this.rows; y++) {
      for(var x = 0; x < this.cols; x++) {
        this._data[x + this.cols * y] = Math.floor(Math.random() * 2);
      }
    }
  }

  inBounds(x, y) {
    return (x >= 0 && x < this.cols && y >= 0 && y < this.rows);
  }

  getCell(x, y) {
    if(this.inBounds(x, y)) {
      return this._data[x + this.cols * y];
    }
    return 0;
  }

  setCell(x, y, value) {
    if(this.inBounds(x, y)) {
      this._data[x + y * this.cols] = value;
    }
  }

  getWidth() {
    return this.scale * this.cols;
  }

  getHeight() {
    return this.scale * this.rows;
  }

  hitTest(point) {
    return (point.x >= this.x && point.x < this.x + this.getWidth() && point.y >= this.y && point.y < this.y + this.getHeight());
  }
}

module.exports = Grid;
