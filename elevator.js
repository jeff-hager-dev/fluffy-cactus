'use strict';
var possibleDirs = {"UP": 1, "STILL": 0, "DOWN": -1};

class elevator {
	constructor(name, startFlr, capacity) {
		this.destFlr = -1;
		this.curFlr = startFlr;
		this.maxPpl = capacity;
		this.numPpl = -1;
		this.curDir = possibleDirs.STILL;
		this.people = [];
        this.name = name;
	};

	pickupPerson(person) {
		if (this.numPpl < this.maxPpl) {
            this.people.push(person);
            this.numPpl+=1;
			if (this.destFlr === -1) {
				this.destFlr = person.destFlr;
                this.setDir(this.destFlr);
			}
		}
        else {
            throw new Error("Elevator " + this.name + "is full.");
        }
	};


    dropPerson(person) {
      this.people = people.filter(function(p) {
          return p.callId != person.callId;
      });
        this.numPpl -= 1;
        if(this.numPpl === 0) {
            this.curDir = possibleDirs.STILL;
        }
    };

    move(dir) {
        this.curFlor += possibleDirs[dir];
    };


    setDir(flr) {
        if(flr < this.curFlr) {
            this.curDir = possibleDirs.DOWN;
        }

        else {
            this.curDir = possibleDirs.UP;
        }
    }
}

module.exports = elevator;