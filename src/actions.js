
var stateIdCount = 1;

export function addState() {
  return { type: "ADD_STATE", id: stateIdCount++ }
}

export function removeState(id) {
	return { type: "REMOVE_STATE", id }
}