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

    window.store = this.store = createStore(automaton, /* initialState, */
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )

		ReactDOM.render(
      <Provider store={store}>
        <AutomatonUI />
      </Provider>,
		  document.getElementById('root')
		);

    store.subscribe(this.draw.bind(this));
	},
	
	update() {
		// Temp!
		//this.grid._data = this.automaton.evolve(this.grid);
	},

	draw() {
		this.g.fillStyle = "#777777";
		this.g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    var currentState = this.store.getState();
    var { grid, statesById } = currentState;

		this.g.fillStyle = statesById[0].color;
		this.g.fillRect(grid.x, grid.y, grid.scale * grid.cols, grid.scale * grid.rows);

		for(var y = 0; y < grid.rows; y++) {
			for(var x = 0; x < grid.cols; x++) {
				if(grid.data[x + y * grid.cols] !== 0) this.drawCell(x, y, grid, statesById);
			}
		}
	},

	drawCell(x, y, grid, statesById) {
		this.g.fillStyle = statesById[grid.data[x + y * grid.cols]].color;
		this.g.fillRect(x * grid.scale + grid.x, y * grid.scale + grid.y, grid.scale, grid.scale);
	},
});
