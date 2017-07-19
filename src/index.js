
var Automaton = require("./automaton").Automaton;
var Grid = require("./grid").Grid;
var Canvas = require("./canvas").Canvas;
var Ajv = require('ajv');

var schema = require('./data_validator.json');
var data = require('./data_gol.json');

var ajv = new Ajv();
var valid = ajv.validate(schema, data);
if (!valid) throw Error(ajv.errorsText());

window.canvas = new Canvas(data);
