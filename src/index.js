var Automaton = require("./automaton").Automaton;
var Grid = require("./grid").Grid;

var data = JSON.parse(`{
  "states": [
    {
      "state_id": 0,
      "color": "#000",
      "rules": [
        {
          "evolve_to": 1,
          "conditions": {
            "subexp": {
              "operator": "AND",
              "right_chd": {
                "term": {
                  "cond": {
                    "adjacency": {
                      "ref_to_count": {
                        "state_ref": {
                          "state_id": 1
                        }
                      },
                      "min": 3,
                      "max": 3
                    }
                  }
                }
              },
              "left_chd": {
                "term": {
                  "bool_lit": true
                }
              }
            }
          }
        }
      ]
    },
    {
      "state_id": 1,
      "color": "#FFF",
      "rules": [
        {
          "evolve_to": 0,
          "conditions": {
            "subexp": {
              "operator": "OR",
              "right_chd": {
                "term": {
                  "cond": {
                    "adjacency": {
                      "ref_to_count": {
                        "state_ref": {
                          "state_id": 1
                        }
                      },
                      "max": 1
                    }
                  }
                }
              },
              "left_chd": {
                "term": {
                  "cond": {
                    "adjacency": {
                      "ref_to_count": {
                        "state_ref": {
                          "state_id": 1
                        }
                      },
                      "min": 4
                    }
                  }
                }
              }
            }
          }
        }
      ]
    }
  ]
}`);

var ca = new Automaton(data);

var grid = new Grid(data);

var canvas = document.getElementById("canvas");
var g = canvas.getContext("2d");

grid.setCell(8, 10, 1);
grid.setCell(9, 9, 1);
grid.setCell(10, 9, 1);
grid.setCell(11, 9, 1);
grid.setCell(9, 10, 1);
grid.setCell(11, 10, 1);
grid.setCell(9, 11, 1);
grid.setCell(10, 11, 1);
grid.setCell(11, 11, 1);
grid.setCell(12, 10, 1);


grid.draw(canvas, g);


window.tick = function() {
  grid.setGrid(ca.evolve(grid));
  grid.draw(canvas, g);
}