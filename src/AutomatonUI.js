import React from 'react';
import ReactDOM from 'react-dom';

class Automaton extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currentState: 0 };
	}

	render() {
		return <div>
			<ul><StateList currentState={this.state.currentState} onCurrentStateChange={this.handleCurrentStateChange.bind(this)} states={this.props.data.states} /></ul>
			<ul><RuleList rules={this.props.data.states[this.state.currentState].rules} /></ul>
		</div>
	}

	handleCurrentStateChange(event) {
		this.setState({ currentState: parseInt(event.target.value) });
	}
}

class StateList extends React.Component {
	render() {
		return this.props.states.map((state, index) =>
			<li key={state.name}>
				<State currentState={this.props.currentState} onCurrentStateChange={this.props.onCurrentStateChange.bind(this)} name={state.name} color={state.color} index={index} />
			</li>
		);
	}
}

class State extends React.Component {
	render() {
		return <div>
			<input type="radio" name="selectedState" value={this.props.index} checked={this.props.currentState === this.props.index} onChange={event => this.props.onCurrentStateChange(event)} />
			<span style={{backgroundColor: this.props.color, color: this.props.color, border: "1px solid #000"}}>O</span>
			<input type="text" defaultValue={this.props.name} />
			<button>X</button>
		</div>
	}
}

class RuleList extends React.Component {
	render() {
		return this.props.rules.map((rule, index) =>
			<li key={index}>
				<Rule evolve_to={rule.evolve_to} conditions={rule.conditions} />
			</li>
		);
	}
}

class Rule extends React.Component {
	render() {
		return <div>
			Evolve to <StateRef value={this.props.evolve_to} /> when <Expression value={this.props.conditions} />

		</div>
	}
}

class Expression extends React.Component {
	render() {
		if(typeof this.props.value.term !== "undefined")
			return <ExTerm value={this.props.value.term} />
		if(typeof this.props.value.subexp !== "undefined")
			return <Subexpression value={this.props.value.subexp}/>
		if(typeof this.props.value.negate !== "undefined")
			return "not"
	}
}

class Subexpression extends React.Component {
	render() {
		return <span>
			<Expression value={this.props.value.left_chd} />
			<span> {this.props.value.operator.toLowerCase()} </span>
			<Expression value={this.props.value.right_chd} />
		</span>
	}
}

class ExTerm extends React.Component {
	render() {
		if(typeof this.props.value.bool_lit !== "undefined")
			return this.props.value.bool_lit.toString()
		if(typeof this.props.value.cond !== "undefined")
			return <Condition value={this.props.value.cond} />
	}
}

class Condition extends React.Component {
	render() {
		if(typeof this.props.value.adjacency !== "undefined")
			return <Adjacency value={this.props.value.adjacency} />
		if(typeof this.props.value.relational !== "undefined")
			return "[relational]"
	}
}

class StateRef extends React.Component {
	render() {
		if(typeof this.props.value.state_id !== "undefined")
			return this.props.value.state_id 
		if(typeof this.props.value.me !== "undefined")
			return "me not implemented!"
		if(typeof this.props.value.coordinate !== "undefined")
			return "coordinate not implemented!"
	}
}

class Adjacency extends React.Component {
	render() {
		var ref_to_count = <Ref value={this.props.value.ref_to_count} />
		if(typeof this.props.value.in !== "undefined")
			return <span>in not implemented!</span>
		return <span>
			<span>{this.props.value.min} </span><span>{this.props.value.max} </span>
			<span>{ref_to_count}</span>
		</span>
	}
}

class Ref extends React.Component {
	render() {
		if(typeof this.props.value.state_ref !== "undefined")
			return <StateRef value={this.props.value.state_ref} />
		if(typeof this.props.value.class_ref !== "undefined")
			return <span>Class ref not implemented!</span>
	}
}

module.exports = Automaton;