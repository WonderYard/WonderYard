import React from 'react'
import { connect } from 'react-redux'
import { addState } from '../actions'
import { Button } from 'semantic-ui-react'

function StateAdderView({ onAddState }) {
	return <Button onClick={ () => onAddState() }>+</Button>
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