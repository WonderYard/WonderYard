var App = require("./App");
var Grid = require("./Grid");
var Automaton = require("./Automaton");
window.StateManager = require("./StateManager");

import React from 'react';
import ReactDOM from 'react-dom';
import AutomatonUI from './components/Automaton';
import { createStore } from 'redux'
import automaton from './reducers'
import { Provider } from 'react-redux'

window.wonderyard = new App(800, 600, {
	
	init() {
		this.grid = new Grid(128, 64);

		// Temp!
		this.automaton = new Automaton(
      {
        "classes": [],
        "nbhds": [],
        "states": [
          {
            name: "Blank",
            color: "#22232b",
            class_list: [],
            rules: []
          },
          {
            name: "WireOff",
            color: "#444855",
            class_list: [],
            rules: []
          },
          {
            name: "WireOn",
            color: "#77ffff",
            class_list: [],
            rules: []
          },
          {
            name: "WireTail",
            color: "#60a2aa",
            class_list: [],
            rules: []
          },
          {
            name: "WireHeat",
            color: "#ccffff",
            class_list: [],
            rules: []
          },
        ]
      }
    );

		for(var s in StateManager) {
			StateManager[s].app = this;
		}

		this.setState(StateManager.select);
		StateManager.overlay.draw();

    window.store = createStore(automaton, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

		ReactDOM.render(
      <Provider store={store}>
        <AutomatonUI />
      </Provider>,
		  document.getElementById('root')
		);
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
