
var stateIdCount = 1;

export function addState() {
  return { type: "ADD_STATE", stateId: stateIdCount++ }
}

export function removeState(stateId, index) {
	return { type: "REMOVE_STATE", stateId, index }
}