import React from 'react'
import { connect } from 'react-redux'
import { removeState } from '../actions'
import { Tab2, Tabs2 } from '@blueprintjs/core'

// const State = ({ name, color, index, onClick }) => (
//   <li>
//     <span>{color}</span> {name} <button onClick={onClick} disabled={ index === 0 }>X</button>
//   </li>
// )

// const StateListView = ({ states, statesById, onRemoveState }) => (
//   <ul>
//     {states.map(function(stateId, index) {
//       var state = statesById[stateId];
//       return <State key={stateId} {...state} index={index} onClick={() => onRemoveState(stateId, index)} />
//     })}
//   </ul>
// )

const State = ({ name, color, index, onClick }) => (
  <Tab2 id={index} title={name} />
)

const StateListView = ({ states, statesById, onRemoveState }) => (
  <Tabs2 id="stateListView" vertical="true" defaultSelectedTabId="0">
    {states.map(function(stateId, index) {
      var state = statesById[stateId];
      return <Tab2 key={stateId} id={index} {...state} index={index} title={state.name} onClick={() => onRemoveState(stateId, index)} />
    })}
  </Tabs2>
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