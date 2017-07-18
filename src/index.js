var Automaton = require("./automaton").Automaton;
var Grid = require("./grid").Grid;
/**
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
**/

var data = JSON.parse(`{
  "states": [
    {
      "state_id": 0,
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABlUlEQVR4Xu2ZwQ3CMAxFW3GFWViCreDIWCzBLJxRkSq1h6DKdpxfJ83nmjiuX37sBI/D/TwNHf9GAghSwPT8zLobH5dQ/YUpoFkA3g9f7F/v07zzt+s3VAlmBXQLoPTOeUGWShxqBXQPYCFey87trgACKIW8snXUOaCy7y72OQTAt0DQW6CYhp0L8QikR2DvOo/yp133TwFaQ6fyVnOUP+26K4DSV10JEMqfdV0CYA5IyqD27EgS146j/GnXZRnkTZA3QTZG2BnSZuwjzjtMFdCWvXQTCcBaBnNJo46P9e7vVkC3AHJJ7wUs1486B3QPwNoYyQWGyhVb66oVQACZW5N7NjPdmc3MCrB66B6AFdjWfBRIuAKaA4AinQsCXU3C+wISmN0AoB1JgUrjKGWG9QWkgNNxOADrRccaQK3zq88BaHDNlEEUCAKw/iOE2omodakAKoCtMbbG2BpDZmDvFdZrL8UGrwLeALz2YQC8r0uvvRT4Mg5TgDcAr304gFKvy2aPAAFoNRg8D5YDguNSuyeA3h9DP12xgdBUdBwCAAAAAElFTkSuQmCC",
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
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAByUlEQVR4Xu1aQW7DIBCEex7R/qP9TB+QD0RKpEh9QPKm/COPaO+u5Hotsc5qDVkMyk5uERjwzDADmBgOuyE4/kUAAAVgCsADHHtggAkiBZACSAGkAFLAMQKIQcQgYvDJGPz+fewgh12es1i1k9erwVLYauBW7bQCYBjS5USMMWso4vO5SsrqNdgpwC8AhPgkYQ5EJiFhVk5l5mlcdusAAPCfBqQAYpL+387nRAyfp9PD+mEj5qsrAABMKQAFTPHobgpI7s+B+Dgex6qr1w3GHrF5CrgHQFKGZpoLpRgpYXMFvDwA9/0+d/E31n+/XpN1gTpVelWAWwDuP18J88SoBIhU/na5jO2oCuA6K1SEmQe4B4AI4UCsNQRiXqu/2C3SQUprBQAAibrCbTL3AGqedpHzrrE3BSxwAADpOQEBRAzTCm/t3mGhAM00lHKzFBD7ERQAANgJkaaE+QSHTpsLXZ8T1VwBNKDXBYDeUPrwkTuHjZi3PxPUXgQATN8QiUEtv3m5Vl8jQCiv7wF8CrgFoJCh2o9tp4Dab1LYPgDAFRlckXnyikzh3OvlMXgAPAAeAA/AbfFeHLnFOJACSAGkAFIAKdDCfXvp8w/xmGvQjvYyDgAAAABJRU5ErkJggg==",
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

/**
//gol pattern
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
**/

grid.setCell(2, 2, 1);
grid.setCell(2, 3, 1);
grid.setCell(2, 4, 1);
grid.setCell(7, 1, 1);
grid.setCell(2, 7, 1);
grid.setCell(2, 6, 1);
grid.setCell(5, 5, 1);
grid.setCell(4, 5, 1);
grid.setCell(7, 6, 1);

grid.draw(canvas, g);


window.tick = function() {
  grid.setGrid(ca.evolve(grid));
  grid.draw(canvas, g);
}