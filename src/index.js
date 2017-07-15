function Automaton(data) {
  // TODO valida la struttura dati prima di assegnarla a this.data 
  this.data = data;
  this.grid = [];
  this.nbhd = {
    "nbhd_id": "Moore",
    "rel_cells": [
      {x:-1,y:-1}, {x:-1,y: 0}, {x:-1,y: 1},
      {x: 0,y:-1},              {x: 0,y: 1},
      {x: 1,y:-1}, {x: 1,y: 0}, {x: 1,y: 1}
    ]
  };
  this.x;
  this.y;
}

Automaton.prototype.evolve = function() {
    var newGrid = [];
    
    for(this.y = 0; this.y < this.grid.length; this.y++) {
      newGrid.push([]);
      for(this.x = 0; this.x < this.grid[this.y].length; this.x++) {
        var currCell = this.getCell(this.x, this.y);
        var state = this.data.states[currCell]; // getter method
        var i;
        for(i = 0; i < state.rules.length; i++) {
          var rule = state.rules[i];
          if(this.evalBoolExpr(rule.conditions)) {
            newGrid.push(rule.evolve_to);
            break;
          }
        }
        if(i == state.rules.length) newGrid.push(currCell);
      }
    }
    
    this.grid = newGrid;
};

Automaton.prototype.getCell = function(x, y) {
  if(x >= 0 && x < this.grid[0].length && y >= 0 && y < this.grid.length) return this.grid[y][x];
	return 0;
};

Automaton.prototype.evalBoolExpr = function(expr) {
  function evalExTerm(exTerm) {
    if(exTerm.bool_lit) return exTerm.bool_lit;
    if(exTerm.cond) return evalCondition();
    throw new Error("ExTerm: badly formatted");
  }
  
  function evalCondition(condition) {
    if(condition.adjacency) evalAdjacency(condition.adjacency);
    if(condition.relational) throw new Error("Not implemented yet");
  }
  
  function evalAdjacency(adjacency) {
    var neighbors = {};
    var nbhd = adjacency.in ? adjacency.in : this.nbhd;
    for(var n = 0; n < nbhd.length; n++) {
      var i = this.x + nbhd.rel_cells[n].x;
      var j = this.y + nbhd.rel_cells[n].y;
      
      var currCell = this.getCell(this.x, this.y);
      neighbors[currCell] = (neighbors[currCell] || 0) + 1;
    }
    
    var cell = resolveRef(adjacency.ref_to_count);
    var count = neighbors[cell] || 0;
    var min = adjacency.min || 0;
    var max = adjacency.max || +Infinity;
    return count >= min && count <= max;
  }
  
  function resolveRef(ref) {
    if(ref.state_ref) return resolveStateRef(ref.state_ref);
    if(ref.class_ref) throw new Error("Not implemented yet");
    throw new Error("resolveRef: badly formatted");
  }
  
  function resolveStateRef(stateRef) {
    if(stateRef.state_id) return stateRef.state_id;
    // ricorda problema del riferimento del "me" nel caso in cui evalBoolExpr è chiamato da una classe
    // in quel caso la classe deve sapere lo stato chiamante
    if(stateRef.me) return this.getCell(this.x, this.y);
    if(stateRef.coordinate) return this.getCell(this.x + stateRef.coordinate.x, this.y + stateRef.coordinate.y);
    throw new Error("resolveStateRef: badly formatted");
  }
  

  
  function evalSubexpression(subexp) {
    var right = this.evalBoolExpr(subexp.right_chd);
    var left = this.evalBoolExpr(subexp.left_chd);
    
    if(subexp.operator == "AND") return right & left;
    if(subexp.operator == "OR") return right | left;
    if(subexp.operator == "XOR") return right ^ left;
    throw new Error("Subexpression: unknown operator " + subexp.operator);
  }

  if(expr.term) return expr.negate ? ! evalExTerm(expr.term) : evalExTerm(expr.term);
  if(expr.subexp) return expr.negate ? ! evalSubexpression(expr.subexp) : evalSubexpression(expr.subexp);
  throw new Error("BoolExpr: badly formatted");
  
};