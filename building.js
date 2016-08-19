"use strict";

var _ = require('underscore');

var Person = require('./person');
var Elevator = require('./elevator');

class building {
  constructor(datafile) {
    this.peopleWaiting = [];
    this.poolPeople = [];
    this.poolOfElevators = [];
    this.numTimeIncrement = 1;
    this.thisstopId = 1;

    if(datafile){

      var data = require(datafile);
      this.output = {
        "challengeId": data.challengeId,
        "stops": []
      };

      this.PopulateElevators(data);
      this.PopulatePoolOfPeople(data);
    }
  }

  PopulateElevators(data){
    for (var k = 0; k < data.numberOfElevators; k++) {
      this.poolOfElevators.push(new Elevator(k, 1, data.maxCapacity));
    }
  }

  PopulatePoolOfPeople(data){

    for (var i = 0; i < data.calls.length; i++) {
      var call = data.calls[i];
      var newPerson = new Person(call.callId, call.callTime, call.startfloor, call.endfloor);
      this.poolPeople.push(newPerson);
    }

    this.peopleRemaining = this.poolPeople.length;
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
      var curElevator = this.poolOfElevators[i];
      var context = this;
      curElevator.updatePosition(this.totalTimePast, function(curFlr){ context.SelectNextFloor(curFlr);});
      if (curElevator.status === 1) {

        var peopleOnFloor = _.filter(this.poolWaiting, function (person) {
          return person.startFloor === this.poolOfElevators[i].curFlr;
        });

        peopleLeft += curElevator.exchangePeople(this.totalTimePast, peopleOnFloor);
      }

      this.poolOfElevators[i] = curElevator;
    }
    return peopleLeft;
  }

  run(callback) {
    this.totalTimePast = 0;

    var stopsThisPass = null;
    var results = null;
    while (this.peopleRemaining > 0) {
      this.totalTimePast += this.numTimeIncrement;
      console.log(this.totalTimePast);
      stopsThisPass = [];

      results = this.getPeopleFromPool(this.totalTimePast, this.poolPeople);

      this.poolPeople = results.stillInPool;
      this.peopleWaiting = _.union(this.peopleWaiting, results.waitingForElevator);
      this.peopleWaiting = _.sortBy(this.peopleWaiting, 'callId');

      if (this.peopleWaiting.length === 0) {
        continue;
      }

      stopsThisPass = this.updateElevators();
      this.peopleRemaining -= stopsThisPass;

      _.union(this.output.stops, stopsThisPass);

      callback(this.totalTimePast);
    }
    console.log('done');
  }

}

module.exports = building;