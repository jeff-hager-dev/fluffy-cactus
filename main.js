"use strict";

var _ = require('underscore');
var building = require('./building');

var currentBuilding = new building('./data/challenge1input.json');

currentBuilding.run(function(time){
  console.log(time);
});

