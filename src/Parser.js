export function unparse(rule) {
	var text = "";
	text += "to ";
	text += stateRef(rule.evolve_to);
	text += "when ";
	text += expression(rule.conditions);
	return text;

}

function stateRef(obj) {
	var text = "";
	if(typeof obj.state_id !== "undefined")
		text += obj.state_id + " ";
	if(typeof obj.me !== "undefined")
		text += "me ";
	if(typeof obj.coordinate !== "undefined")
		text += "[coordinate] ";
	return text;
}

function expression(obj) {
	var text = "";
	if(typeof obj.term !== "undefined")
		text += exTerm(obj.term);
	if(typeof obj.subexp !== "undefined")
		text += subexpression(obj.subexp);
	if(typeof obj.negate !== "undefined")
		text += "not ";
	return text;
}

function exTerm(obj) {
	var text = "";
	if(typeof obj.cond !== "undefined")
		text += condition(obj.cond);
	if(typeof obj.bool_lit !== "undefined")
		text += obj.bool_lit + " ";
	return text;
}

function subexpression(obj) {
	var text = "";
	text += expression(obj.left_chd);
	text += obj.operator + " ";
	text += expression(obj.right_chd);
	return text;
}

function condition(obj) {
	var text = "";
	if(typeof obj.adjacency !== "undefined")
		text += adjacency(obj.relational);
	if(typeof obj.relational !== "undefined")
		text += relational(obj.adjacency);
	return text;
}

function adjacency(obj) {
	return "[adjacency] ";
}

function relational(obj) {
	return "[relational] ";
}

export function parse(rule) {
	return JSON.parse(rule || "{}");
}