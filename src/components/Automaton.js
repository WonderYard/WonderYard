import React from 'react'
import StateAdder from './StateAdder'
import StateList from './StateList'
import 'normalize.css'
import './Ui.css'
import { FocusStyleManager } from "@blueprintjs/core";
FocusStyleManager.onlyShowFocusOnTabs();

function Automaton() {
	return <div className="pt-dark">
		<StateAdder />
		<StateList />
	</div>
}

export default Automaton