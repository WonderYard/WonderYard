import React from 'react'
import { connect } from 'react-redux'
import { removeState } from '../actions'
import { Tab2, Tabs2, Menu, MenuItem } from '@blueprintjs/core'

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

// const StateListView = ({ states, statesById, onRemoveState }) => (
//   <Tabs2 id="stateListView" vertical="true" defaultSelectedTabId="0">
//     {states.map(function(stateId, index) {
//       var state = statesById[stateId];
//       return <Tab2 key={stateId} id={index} {...state} index={index}>
//         {state.name}<button className="btn btn-outline-secondary btn-sm float-right" onClick={() => onRemoveState(stateId, index)}>X</button>
//       </Tab2>
//     })}
//   </Tabs2>
// )

const StateListView = ({ states, statesById, onRemoveState }) => (
  <Menu>
    {states.map(function(stateId, index) {
      var state = statesById[stateId];
      return <MenuItem key={stateId} {...state} text={state.name} index={index}>
        
      </MenuItem>
    })}
  </Menu>
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