
const AUTOMATON_DEFAULT = {
	states: [0],
	classes: [],
	nbhds: [],

	statesById: {
		"0": {
			name: "State 0",
			color: "#000000",
			class_list: [],
			rules: [],
		}
	}
}

function states(_state = [], action) {
	switch(action.type) {
		case "ADD_STATE":
			return [..._state, action.id]
		case "REMOVE_STATE":
			var newState = _state.slice();
			var index = newState.indexOf(action.id);
			if(index != -1) newState.splice(index, 1)
			return newState
		default:
			return _state
	}
}

function classes(_state = [], action) {
	return [..._state];
}

function nbhds(_state = [], action) {
	return [..._state];
}

function statesById(_state = {}, action) {
	switch(action.type) {
		case "ADD_STATE":
			return Object.assign({}, _state, { [action.id]: {
				name: "State " + action.id,
				color: "#000000",
				class_list: [],
				rules: []
			}})
		case "REMOVE_STATE":
			var newState = Object.assign({}, _state);
			delete newState[action.id]
			return newState;

		default:
			return _state
	}
}

function automaton(state = AUTOMATON_DEFAULT, action) {
	return {
		states: states(state.states, action),
		statesById: statesById(state.statesById, action),

		classes: classes(state.classes, action),

		nbhds: nbhds(state.nbhds, action)
	}
}

export default automaton