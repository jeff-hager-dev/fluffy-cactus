"use strict";

var _ = require('underscore');

var poolPeople = [];
var peopleWaiting = [];
var poolOfElevators = [];
var numTimeIncrement = 1;


var getPeopleFromPool = function (time, poolPeople) {

  var isItMyTurn = function (person) {
    return person.isItMyTurn(time)
  };

  return {
    "waitingForElevator": _.filter(poolPeople, isItMyTurn),
    "stillInPool": _.reject(poolPeople, isItMyTurn)
  };
};

var updateElevators = function (time, poolWaiting, poolOfElevators) {

};

var totalTimePast = 0;

while (poolPeople.length < 0) {
  totalTimePast += numTimeIncrement;
  var results = getPeopleFromPool(totalTimePast, poolPeople);

  poolPeople  = results.stillInPool;
  peopleWaiting = _.union(peopleWaiting, results.waitingForElevator);

  updateElevators(peopleWaiting, poolOfElevators);
}

