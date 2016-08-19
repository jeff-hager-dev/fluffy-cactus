"use strict";

var _ = require('underscore');

var Person = require('./person');
var poolPeople = [];
var peopleWaiting = [];
var poolOfElevators = [];
var numTimeIncrement = 1;
var data = require('./data/challenge1input.json');

for (var i = 0; i < data.calls.length; i++) {
    var call = data.calls[i];
    var newPerson = new Person(call.callId, call.callTime, call.startFloor, call.endFloor);
    poolPeople.push(newPerson);
}

var peopleRemaining = poolPeople.length;


// To be replaced with a good algorithm
var selectPerson = function (peopleWaiting) {
    return peopleWaiting.pop();
};


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

while (peopleRemaining > 0) {
    totalTimePast += numTimeIncrement;
    var results = getPeopleFromPool(totalTimePast, poolPeople);

    poolPeople = results.stillInPool;
    peopleWaiting = _.union(peopleWaiting, results.waitingForElevator);

    updateElevators(peopleWaiting, poolOfElevators);
}

