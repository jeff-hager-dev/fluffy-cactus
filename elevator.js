'use strict';
var possibleDirs = {"UP": 1, "STILL": 0, "DOWN": -1};
var statuses = {"AT_FLOOR": 1, "BETWEEN_FLOORS": 2, "PICKING_UP": 3, "ON_FIRE": 4};


class elevator {
  constructor(name, startFlr, capacity) {
    this.destFlr = -1;
    this.curFlr = startFlr;
    this.startFlr = startFlr;
    this.status = statuses.AT_FLOOR;
    this.maxPpl = capacity;
    this.numPpl = -1;
    this.curDir = possibleDirs.STILL;
    this.people = [];
    this.name = name;
    this.startWaitTime = -1;
    this.endWaitTime = -1;
    this.leftAtTime = -1;
  };

  pickupPerson(time, person) {
    if (this.numPpl < this.maxPpl) {
      if (this.status)
        this.people.push(person);
      this.numPpl += 1;
      if (this.destFlr === -1) {
        this.destFlr = person.destFlr;
        this.setDir(this.destFlr);
      }
    }
    else {
      throw new Error("Elevator " + this.name + "is full.");
    }
  };

  updatePosition(time, selectNextFloorFunc) {

    if(this.destFlr === -1) {
      this.destFlr = selectNextFloorFunc(this.curFlr);
      this.setDir(this.destFlr);
    }

    //time = endwaittime - START MOVING
    if(this.status = statuses.PICKING_UP){
      if(time > this.endWaitTime) {
        this.status = statuses.BETWEEN_FLOORS;
      }
    }

    if(!(this.status === statuses.PICKING_UP)) {
      if ((time % 2 == 0) && (this.status === statuses.BETWEEN_FLOORS)) {
        this.status = statuses.AT_FLOOR;
        this.move(this.curDir);
      }
      else {
        this.status = statuses.BETWEEN_FLOORS;
      }
    }
  }


  dropPerson(person) {
    this.people = people.filter(function (p) {
      return p.callId != person.callId;
    });
    this.numPpl -= 1;
    if (this.numPpl === 0) {
      this.curDir = possibleDirs.STILL;
    }
  };

  move(dir) {
    this.curFlr += possibleDirs[dir];
  };


  setDir(flr) {
    if (flr < this.curFlr) {
      this.curDir = possibleDirs.DOWN;

    }
    else if (flr > this.curFlr) {
      this.curDir = possibleDirs.UP;
    }
    else {
      this.curDir = possibleDirs.STILL;
    }
  }
}

module.exports = elevator;