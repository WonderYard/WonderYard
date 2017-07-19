
var Automaton = require("./automaton").Automaton;
var Grid = require("./grid").Grid;


function Canvas(data) {
    this.images = [];
    this.grid = new Grid(data);
    this.ca = new Automaton(data);
    this.canvas = document.getElementById("canvas");
    this.g = this.canvas.getContext("2d");
    var mouse = {
		rect: this.canvas.getBoundingClientRect(),
		state: "default",
		x: 0,
		y: 0
	};
	this.looping = false;
    
    preload.call(this, data);
    var self = this;
    this.canvas.addEventListener("click", function(e) {
		var mouseX = e.clientX - mouse.rect.left;
		var mouseY = e.clientY - mouse.rect.top;

		var x = Math.floor((mouseX - self.grid.offset_x) / self.grid.size);
		var y = Math.floor((mouseY - self.grid.offset_y) / self.grid.size);
		self.grid.setCell(x, y, (1 + self.grid.getCell(x, y)) % self.ca.data.states.length);
		self.grid.draw(self.images, self.canvas, self.g);
	});
    
    this.grid.setCell(2, 2, 1);
    this.grid.setCell(2, 3, 1);
    this.grid.setCell(2, 4, 1);
    this.grid.setCell(7, 1, 1);
    this.grid.setCell(2, 7, 1);
    this.grid.setCell(2, 6, 1);
    this.grid.setCell(5, 5, 1);
    this.grid.setCell(4, 5, 1);
    this.grid.setCell(7, 6, 1);
    
    //piazzo la fence
    for(var i= 0; i< this.grid.grid.length; i++) {
      for(var j=0; j< this.grid.grid[i].length; j++) {
    
        if(j==0 || j== this.grid.grid[0].length-1) this.grid.setCell(i,j,2);
      }
    }
    this.grid.draw(this.images, this.canvas, this.g);
}

Canvas.prototype.tick = function() {
    this.grid.setGrid(this.ca.evolve(this.grid));
    this.grid.draw(this.images, this.canvas, this.g);
};

Canvas.prototype.toggleLoop = function() {
    if(!this.looping) {
        this.intervalID = setInterval(this.tick.bind(this), 1000/60);
        this.looping = true;
    }
    else {
        clearInterval(this.intervalID);
        this.looping = false;
    }
};

function preload(data) {
    var totalImg = 0;
    var imgCount = 0;
    
    for(var i=0; i<data.states.length; i++) {
        var URI = data.states[i].image;
        if(URI) totalImg++;
    }
    
    for(i=0; i<data.states.length; i++)
    {
        URI = data.states[i].image;
        if(URI) {
            var img = new window.Image();
            img.onload = function() {
                if(++imgCount >= totalImg) {
                    this.grid.draw(this.images, this.canvas, this.g);
                }
            };
        img.src = URI;
        this.images[i]=img;
        }   
    }
}

module.exports.Canvas = Canvas;