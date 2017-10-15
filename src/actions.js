import _ from 'lodash'

export const AUTOMATON_DEFAULT = {
	states: [0, 1],
	classes: [],
	nbhds: [],

	statesById: {
		"0": {
			name: "State 0",
			color: "#000000",
			class_list: [],
			rules: [],
		},
		"1": {
			name: "State 1",
			color: "#ffffff",
			class_list: [],
			rules: [],
		}
	},

	grid: {
		cols: 3,
		rows: 3,
		x: 0,
		y: 0,
		scale: 16,
		data: [0,1,0,0,0,1,1,1,1],
	},
}

var stateIdCount = _.size(AUTOMATON_DEFAULT.statesById);

export function addState() {
  return { type: "ADD_STATE", stateId: stateIdCount++ }
}

export function removeState(stateId, index) {
	return { type: "REMOVE_STATE", stateId, index }
}