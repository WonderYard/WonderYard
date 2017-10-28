import React from 'react'
import { connect } from 'react-redux'
import { removeState } from '../actions'
import { Button } from 'semantic-ui-react'

const State = ({ name, color, index, onClick }) => (
  <li>
    <span>{color}</span> {name} <Button onClick={onClick} disabled={ index === 0 }>X</Button>
  </li>
)

const StateListView = ({ states, statesById, onRemoveState }) => (
  <ul>
    {states.map(function(stateId, index) {
      var state = statesById[stateId];
      return <State key={stateId} {...state} index={index} onClick={() => onRemoveState(stateId, index)} />
    })}
  </ul>
)

const mapStateToProps = state => {
  return {
    statesById: state.statesById,
    states: state.states
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRemoveState: (stateId, index) => {
      dispatch(removeState(stateId, index))
    }
  }
}

const StateList = connect(
  mapStateToProps,
  mapDispatchToProps
)(StateListView)

export default StateList