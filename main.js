"use strict";

var _ = require('underscore');

var poolPeople = [];
var peopleWaiting = [];
var poolOfElevators = [];
var numTimeIncrement = 1;


var getPeopleFromPool = function (time, poolPeople) {

  var isItMyTime = function (person) {
    return person.isItMyTime(time)
  };

  return {
    "waitingForElevator": _.filter(poolPeople, isItMyTime),
    "stillInPool": _.reject(poolPeople, isItMyTime)
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

