import { AUTOMATON_DEFAULT } from './actions'

function states(_state = [], action) {
	switch(action.type) {
		case "ADD_STATE":
			return [..._state, action.stateId]
		case "REMOVE_STATE":
			var newState = _state.slice()
			newState.splice(action.index, 1)
			return newState
		default:
			return _state
	}
}

function classes(_state = [], action) {
	return _state
}

function nbhds(_state = [], action) {
	return _state
}

function statesById(statesById = {}, action) {
	switch(action.type) {
		case "ADD_STATE":
			return Object.assign({}, statesById, { [action.stateId]: {
				name: "State " + action.stateId,
				color: "#000000",
				class_list: [],
				rules: []
			}})
		case "REMOVE_STATE":
			var newState = Object.assign({}, statesById);
			delete newState[action.stateId]
			return newState;

		default:
			return statesById
	}
}

function grid(grid = {}, action) {
	switch(action.type) {
		case "REMOVE_STATE":
			var newGrid = Object.assign({}, grid);
			var newData = newGrid.data.map(function(stateId) {
				if(stateId === action.stateId) return 0;
				return stateId;
			})
			newGrid.data = newData
			return newGrid
		default:
			return grid
	}
}

function automaton(automaton = AUTOMATON_DEFAULT, action) {
	return {
		states: states(automaton.states, action),
		statesById: statesById(automaton.statesById, action),

		classes: classes(automaton.classes, action),

		nbhds: nbhds(automaton.nbhds, action),

		grid: grid(automaton.grid, action)
	}
}

export default automaton