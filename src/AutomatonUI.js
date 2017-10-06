import React from 'react';
import ReactDOM from 'react-dom';
import { parse, unparse } from './Parser'

class Automaton extends React.Component {
	render() {
		return <div>
			<ul><StateList states={this.props.data.states} /></ul>
		</div>
	}
}

class StateList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return this.props.states.map((state, index) =>
			<li key={state.name}>
				<State index={index} name={state.name} color={state.color} states={this.props.states} />
			</li>
		);
	}
}

class State extends React.Component {
	render() {
		return <div>
			<span style={{backgroundColor: this.props.color, color: this.props.color, border: "1px solid #000"}}>O</span>
			<input type="text" value={this.props.name} />
			<button>X</button>
			<ul>
				<RuleList index={this.props.index} states={this.props.states} />
			</ul>
		</div>
	}
}

class RuleList extends React.Component {
	render() {
		var rules = this.props.states[this.props.index].rules;
		if(!rules) return <br />
		return rules.map((rule, index) =>
			<li key={unparse(rule)}>
				<Rule rule={rule} states={this.props.states} />
			</li>
		);
	}
}

class Rule extends React.Component {
	render() {
		return <div>
			<input type="text" size="200" value={unparse(this.props.rule)} />
		</div>
	}
}

// class Expression extends React.Component {
// 	render() {
// 		console.log(this.props)
// 		if(typeof this.props.value.term !== "undefined")
// 			return <ExTerm value={this.props.value.term} states={this.props.states} />
// 		if(typeof this.props.value.subexp !== "undefined")
// 			return <Subexpression value={this.props.value.subexp} states={this.props.states} />
// 		if(typeof this.props.value.negate !== "undefined")
// 			return "not"
// 	}
// }

// class Subexpression extends React.Component {
// 	render() {
// 		return <span> (
// 			<Expression value={this.props.value.left_chd} states={this.props.states} />
// 			<span> {this.props.value.operator.toLowerCase()} </span>
// 			<Expression value={this.props.value.right_chd} states={this.props.states} />
// 		)</span>
// 	}
// }

// class ExTerm extends React.Component {
// 	render() {
// 		if(typeof this.props.value.bool_lit !== "undefined")
// 			return this.props.value.bool_lit.toString()
// 		if(typeof this.props.value.cond !== "undefined")
// 			return <Condition value={this.props.value.cond} states={this.props.states} />
// 	}
// }

// class Condition extends React.Component {
// 	render() {
// 		if(typeof this.props.value.adjacency !== "undefined")
// 			return <Adjacency value={this.props.value.adjacency} states={this.props.states} />
// 		if(typeof this.props.value.relational !== "undefined")
// 			return "[relational]"
// 	}
// }

// class StateRef extends React.Component {
// 	render() {
// 		if(typeof this.props.value.state_id !== "undefined")
// 			//return this.props.states[this.props.value.state_id].name
// 			return <span>{this.props.value.state_id}</span>
// 		if(typeof this.props.value.me !== "undefined")
// 			return "me not implemented!"
// 		if(typeof this.props.value.coordinate !== "undefined")
// 			return "coordinate not implemented!"
// 	}
// }

// class Adjacency extends React.Component {
// 	render() {
// 		var ref_to_count = <Ref value={this.props.value.ref_to_count} states={this.props.states} />
// 		if(typeof this.props.value.in !== "undefined")
// 			return <span>in not implemented!</span>
// 		return <span>
// 			<span>{this.props.value.min} </span><span>{this.props.value.max} </span>
// 			<span>{ref_to_count}</span>
// 		</span>
// 	}
// }

// class Ref extends React.Component {
// 	render() {
// 		if(typeof this.props.value.state_ref !== "undefined")
// 			return <StateRef value={this.props.value.state_ref} states={this.props.states} />
// 		if(typeof this.props.value.class_ref !== "undefined")
// 			return <span>Class ref not implemented!</span>
// 	}
// }

module.exports = Automaton;