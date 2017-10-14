import React from 'react'
import { connect } from 'react-redux'
import { addState, removeState } from './actions'

function Automaton() {
	return <div>
		<StateAdder />
		<StateList />
	</div>
}

function StateAdderView({ onAddState }) {
	return <button onClick={() => onAddState()}>+</button>
}

const StateListView = ({ states, statesById, onRemoveState }) => (
	<ul>
		{states.map(function(stateId) {
			var state = statesById[stateId];
			return <State key={stateId} {...state} onClick={() => onRemoveState(stateId)} />
		})}
	</ul>
)

const State = ({ name, color, onClick }) => (
	<li>
		<span>{color}</span> {name} <button onClick={onClick}>X</button>
	</li>
)

const StateAdder = connect(
	undefined,
	function(dispatch) {
		return { onAddState: function() { return dispatch(addState()) } } }
)(StateAdderView)

const mapStateToProps = state => {
  return {
    statesById: state.statesById,
    states: state.states
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveState: id => {
      dispatch(removeState(id))
    }
  }
}

const StateList = connect(
  mapStateToProps,
  mapDispatchToProps
)(StateListView)

module.exports = Automaton;