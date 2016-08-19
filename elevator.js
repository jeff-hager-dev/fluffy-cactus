'use strict';
var possibleDirs = {"UP": 1, "STILL": 0, "DOWN": -1};
var status = {"AT_FLOOR": 1, "BETWEEN_FLOORS": 2, "PICKING_UP": 3, "ON_FIRE": 4};


class elevator {
  constructor(name, startFlr, capacity) {
    this.destFlr = -1;
    this.curFlr = startFlr;
    this.startFlr = startFlr;
    this.status = 0;
    this.maxPpl = capacity;
    this.numPpl = -1;
    this.curDir = possibleDirs.STILL;
    this.people = [];
    this.name = name;
    this.startWaitTime = -1;
    this.endWaitTime = -1;
  };

  pickupPerson(time, person) {
    if (this.numPpl < this.maxPpl) {
      if(this.status)
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

  updatePosition(time, selectNextFloorFunc){

      //Current floor inc/dec
      //update status
      //call setDir
      //call move
      //set time
      //select next floor if current and dest ===
      if(this.status)

      if(time % 2 == 0) {
          this.move(this.curDir);

      }


      console.log("TODO");
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
    this.curFlor += possibleDirs[dir];
  };


  setDir(flr) {
    if (flr < this.curFlr) {
      this.curDir = possibleDirs.DOWN;
    }

    else {
      this.curDir = possibleDirs.UP;
    }
  }
}

module.exports = elevator;