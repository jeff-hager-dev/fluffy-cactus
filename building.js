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


class building {
  constructor(datafile) {
    this.peopleWaiting = [];
    this.poolOfElevators = [];
    this.numTimeIncrement = 1;
    var data = require(datafile);
    this.output = {
      "challengeId": data.challengeId,
      "stops": []
    };
    this.thisstopId = 1;

    for (var i = 0; i < data.calls.length; i++) {
      var call = data.calls[i];
      var newPerson = new Person(call.callId, call.callTime, call.startFloor, call.endFloor);
      poolPeople.push(newPerson);
    }

    this.peopleRemaining = poolPeople.length;
  }

  SelectNextFloor(curFlr) {
    for (var i = 0; i < this.peopleWaiting.length; i++) {
      var nextPossibleFloor = this.peopleWaiting[i].startFloor;
      var elevatorWithFloor = _.filter(this.poolOfElevators, function (elevator) {
        return elevator.destFlr === nextPossibleFloor
      });
      if (elevatorWithFloor.length === 0) {
        return nextPossibleFloor;
      }
    }
    return -1;
  }

  getPeopleFromPool(time, poolPeople) {

    var isItMyTurn = function (person) {
      return person.isItMyTurn(time)
    };

    return {
      "waitingForElevator": _.filter(poolPeople, isItMyTurn),
      "stillInPool": _.reject(poolPeople, isItMyTurn)
    };
  }

  updateElevators() {
    var peopleLeft = 0;
    for (let i = 0; i < this.poolOfElevators.length; i++) {
      this.poolOfElevators[i].updatePosition(this.totalTimePast, SelectNextFloor);
      if (this.poolOfElevators[i].status === 1) {


        var peopleOnFloor = _.filter(this.poolWaiting, function (person) {
          return person.startFloor === this.poolOfElevators[i].curFlr;
        });

        peopleLeft += this.poolOfElevators[i].exchangePeople(this.totalTimePast, peopleOnFloor);
      }
      console.log(this.poolOfElevators[i]);
    }
    return peopleLeft;
  }

  run(callback) {
    this.totalTimePast = 0;
    while (this.peopleRemaining > 0) {
      this.totalTimePast += numTimeIncrement;
      var stopsThisPass = [];
      var results = this.getPeopleFromPool(this.totalTimePast, poolPeople);
      this.poolPeople = results.stillInPool;
      this.peopleWaiting = _.union(peopleWaiting, results.waitingForElevator);
      this.peopleWaiting = _.sortBy(peopleWaiting, 'callId');
      if (this.peopleWaiting.length === 0) {
        continue;
      }
      stopsThisPass = this.updateElevators(this.totalTimePast, this.peopleWaiting, this.poolOfElevators);
      this.peopleRemaining -= stopsThisPass.length;
      _.union(output.stops, stopsThisPass);

      callback(this.totalTimePast);
    }
  }

}

module.exports = building;