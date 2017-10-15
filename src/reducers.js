
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

function automaton(automaton = AUTOMATON_DEFAULT, action) {
	return {
		states: states(automaton.states, action),
		statesById: statesById(automaton.statesById, action),

		classes: classes(automaton.classes, action),

		nbhds: nbhds(automaton.nbhds, action)
	}
}

export default automaton