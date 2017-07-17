function Automaton(data) {
  // TODO valida la struttura dati prima di assegnarla a this.data 
  this.data = data;
  this.nbhd = {
    "nbhd_id": "Moore",
    "rel_cells": [
      {x:-1,y:-1}, {x:-1,y: 0}, {x:-1,y: 1},
      {x: 0,y:-1},              {x: 0,y: 1},
      {x: 1,y:-1}, {x: 1,y: 0}, {x: 1,y: 1}
    ]
  };
  this.grid;
  this.x;
  this.y;
}

Automaton.prototype.evolve = function(grid) {
  this.grid = grid;
  
  var newGrid = [];
  for(var y = 0; y < grid.cols; y++) {
    newGrid.push([]);
    for(var x = 0; x < grid.rows; x++) {
      newGrid[y].push(grid.getCell(x, y));
    }
  }
  
  for(this.y = 0; this.y < grid.cols; this.y++) {
    for(this.x = 0; this.x < grid.rows; this.x++) {
      var currCell = this.grid.getCell(this.x, this.y);
      var state = this.data.states[currCell]; // getter method
      for(var i = 0; i < state.rules.length; i++) {
        var rule = state.rules[i];
        if(evalBoolExpr.call(this, rule.conditions)) {
          newGrid[this.y][this.x] = rule.evolve_to;
          break;
        }
      }
      if(i == state.rules.length) {
        applyClassRules.call(this, [], newGrid, state);
      }
    }
  }
  return newGrid;
};

function applyClassRules(visited_classes, newGrid, state) {
  if(!state.class_list) return;
  for(var c = 0; c < state.class_list.length; c++) {
    var class_id = state.class_list[c];
    var _class = this.data.classes[class_id];
    if(visited_classes.indexOf(class_id) != -1) continue;
    visited_classes.push(class_id);
    for(var v = 0; v < _class.rules.length; v++) {
      var rule=_class.rules[v];
      if(evalBoolExpr.call(this, rule.conditions)) {
        newGrid[this.y][this.x] = rule.evolve_to;
        break;
      }
      if(v == _class.rules.length) {
        applyClassRules.call(this, visited_classes, newGrid);
      }
    }
  }
}


function evalBoolExpr(expr) {
  if(expr.term) return expr.negate ? ! evalExTerm.call(this, expr.term) : evalExTerm.call(this, expr.term);
  if(expr.subexp) return expr.negate ? ! evalSubexpression.call(this, expr.subexp) : evalSubexpression.call(this, expr.subexp);
}

//sposta nell'ordine corretto e cancella i throw
function evalExTerm(exTerm) {
  if(exTerm.bool_lit) return exTerm.bool_lit; //bug:4 wrong data struct, adjacency found
  if(exTerm.cond) return evalCondition.call(this, exTerm.cond);
}

function evalCondition(condition) {
  if(condition.adjacency) return evalAdjacency.call(this, condition.adjacency); //bug:5 missing return keyword
  if(condition.relational) return evalRelational.call(this, condition.relational);
}

function evalAdjacency(adjacency) {
  var neighbors = {};
  var nbhd = adjacency.in ? adjacency.in : this.nbhd;
  for(var n = 0; n < nbhd.rel_cells.length; n++) { //bug:2 nbhd.length
    var i = this.x + nbhd.rel_cells[n].x;
    var j = this.y + nbhd.rel_cells[n].y;
    
    var currCell = this.grid.getCell(i, j); //bug:1 getCell(this.x, this.y)
    neighbors[currCell] = (neighbors[currCell] || 0) + 1;
  }
  var cell = resolveRef.call(this, adjacency.ref_to_count);
  var count = neighbors[cell] || 0;
  var min = adjacency.min || 0; //bug:3 wrong data struct, min and max in ref_to_count
  var max = adjacency.max || +Infinity;
  return count >= min && count <= max;
}

function evalRelational(relational) {
  var state_id = resolveStateRef(relational.stateRef);
  if(relational.other_ref.state_ref) return resolveStateRef(relational.other_ref.state_ref) == state_id;
  var visited_classes = [];
  var class_list = this.data.states[state_id].class_list;
  if(!class_list) return false;
  if(class_list.indexOf(relational.other_ref.class_ref) != -1) return true;
  for(var i = 0; i < class_list.length; i++) {
    if(findClass(visited_classes, class_list[i], relational.other_ref.class_ref)) return true;
  }
  return false;
}

function findClass(visited_classes, class_id, class_ref) {
  visited_classes.push(class_id);
  var class_list = this.data.classes[class_id].class_list;
  if(!class_list) return false;
  if(class_list.indexOf(class_ref) != -1) return true;
  for(var i = 0; i < class_list.length; i++) {
    if(visited_classes.indexOf(class_id) != -1) continue;
    if(findClass(visited_classes, class_list[i], class_ref)) return true;
  }
  return false;
}

function resolveRef(ref) {
  if(ref.state_ref) return resolveStateRef.call(this, ref.state_ref);
  if(ref.class_ref) throw new Error("Not implemented yet");
}

function resolveStateRef(stateRef) {
  if(stateRef.state_id) return stateRef.state_id;
  // ricorda problema del riferimento del "me" nel caso in cui evalBoolExpr è chiamato da una classe
  // in quel caso la classe deve sapere lo stato chiamante
  if(stateRef.me) return this.grid.getCell(this.x, this.y);
  if(stateRef.coordinate) return this.grid.getCell(this.x + stateRef.coordinate.x, this.y + stateRef.coordinate.y);
}

function evalSubexpression(subexp) {
  var right = evalBoolExpr.call(this, subexp.right_chd);
  var left = evalBoolExpr.call(this, subexp.left_chd);
  
  if(subexp.operator == "AND") return right & left;
  if(subexp.operator == "OR")  return right | left;
  if(subexp.operator == "XOR") return right ^ left;
}

module.exports.Automaton = Automaton;