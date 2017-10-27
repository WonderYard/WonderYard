import React from 'react'
import { connect } from 'react-redux'
import { addState } from '../actions'
import { Button, Intent, IconName } from '@blueprintjs/core'



function StateAdderView({ onAddState }) {
	return <Button text="New State" rightIconName="add" intent={Intent.SUCCESS} onClick={ () => onAddState() } />
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