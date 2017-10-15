import React from 'react'
import { connect } from 'react-redux'
import { addState } from '../actions'

function StateAdderView({ onAddState }) {
	return <button onClick={ () => onAddState() }>+</button>
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
  	onAddState: () => {
  		dispatch(addState())
  	}
  }
}

const StateAdder = connect(
	mapStateToProps,
	mapDispatchToProps
)(StateAdderView)

export default StateAdder