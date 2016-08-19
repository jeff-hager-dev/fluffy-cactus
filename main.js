"use strict";

var _ = require('underscore');

var Person = require('./person');
var Elevator = require('./elevator');
var poolPeople = [];
var peopleWaiting = [];
var poolOfElevators = [];
var numTimeIncrement = 1;
var data = require('./data/challenge1input.json');
var output = {
  "challengeId": data.challengeId,
  "stops": []
};
var stopId = 1;


/**
 * Populate People from data.
 */
for (var i = 0; i < data.calls.length; i++) {
  var call = data.calls[i];
  var newPerson = new Person(call.callId, call.callTime, call.startFloor, call.endFloor);
  poolPeople.push(newPerson);
}

var peopleRemaining = poolPeople.length;


// To be replaced with a good algorithm
var SelectNextFloor = function (curFlr) {
  for (var i = 0; i < peopleWaiting.length; i++) {
    var nextPossibleFloor = peopleWaiting[i].startFloor;
    var elevatorWithFloor = _.filter(poolOfElevators, function (elevator) {
      return elevator.destFlr === nextPossibleFloor
    });
    if (elevatorWithFloor.length === 0) {
      return nextPossibleFloor;
    }
  }
  return 0;
};


/**
 * Populate Elevator from data.
 */
for (var k = 0; k < data.numberOfElevators; k++) {
  poolOfElevators.push(new Elevator(k, 1, data.maxCapacity));
}

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
  var peopleLeft = 0;
  for (let i = 0; i < poolOfElevators.length; i++) {
    poolOfElevators[i].updatePosition(time, SelectNextFloor);
    if (poolOfElevators[i].status === 1) {


      var peopleOnFloor = _.filter(poolWaiting, function (person) {
        return person.startFloor === poolOfElevators[i].curFlr;
      });

      peopleLeft += poolOfElevators[i].exchangePeople(time, peopleOnFloor);
    }
    console.log(poolOfElevators[i]);
  }
  return peopleLeft;
};

var totalTimePast = 0;

while (peopleRemaining > 0) {
  totalTimePast += numTimeIncrement;
  var stopsThisPass = [];
  var results = getPeopleFromPool(totalTimePast, poolPeople);
  poolPeople = results.stillInPool;
  peopleWaiting = _.union(peopleWaiting, results.waitingForElevator);
  peopleWaiting = _.sortBy(peopleWaiting, 'callId');
  if (peopleWaiting.length === 0) {
    continue;
  }
  console.log("Time Past: ", totalTimePast, ", People waiting: ", peopleWaiting.length);
  stopsThisPass = updateElevators(totalTimePast, peopleWaiting, poolOfElevators);
  peopleRemaining -= stopsThisPass.length;
  _.union(output.stops, stopsThisPass);
}

