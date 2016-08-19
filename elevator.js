'use strict';
var possibleDirs = {"UP": 1, "STILL": 0, "DOWN": -1};
var status = {"AT_FLOOR": 1, "BETWEEN_FLOORS": 2, "PICKING_UP": 3, "ON_FIRE": 4};


class elevator {
<<<<<<< HEAD


    constructor() {

        this.destFlr = -1;
        this.curFlr = -1;
        this.maxPpl = -1;
        this.numPpl = -1;
        this.curDir = possibleDirs.STILL;
        this.people = [];
        this.name = 1;
        this.status = status.AT_FLOOR;

    };

    pickupPerson = function (person) {
        this.status = status.AT_FLOOR;
        if (this.numPpl < this.maxPpl) {
=======
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
>>>>>>> d4932abed115d44fcb08ede86160a5226734297f
            this.people.push(person);
            this.numPpl += 1;
            if (this.destFlr === -1) {
                this.destFlr = person.destFlr;
                this.setDir(this.destFlr);
            }
            return true;
        }
        return false;


    };

<<<<<<< HEAD

    dropPerson = function (person) {
        this.status = status.AT_FLOOR;
        if (this.numPpl > 0) {
            this.people = people.filter(function (p) {
                return p.callId != person.callId;
            });
            this.numPpl -= 1;
            if (this.numPpl === 0) {
                this.curDir = possibleDirs.STILL;
            }
            return true;
=======
    dropPerson(person) {
      this.people = people.filter(function(p) {
          return p.callId != person.callId;
      });
        this.numPpl -= 1;
        if(this.numPpl === 0) {
            this.curDir = possibleDirs.STILL;
>>>>>>> d4932abed115d44fcb08ede86160a5226734297f
        }
        return false;

    };

<<<<<<< HEAD
    move = function (dir) {
=======
    move(dir) {
>>>>>>> d4932abed115d44fcb08ede86160a5226734297f
        this.curFlor += possibleDirs[dir];
        this.status = status.BETWEEN_FLOORS;
    };


<<<<<<< HEAD
    setDir = function (flr) {
        if (flr < this.curFlr) {
=======
    setDir(flr) {
        if(flr < this.curFlr) {
>>>>>>> d4932abed115d44fcb08ede86160a5226734297f
            this.curDir = possibleDirs.DOWN;
        }

        else {
            this.curDir = possibleDirs.UP;
        }
    }
}

module.exports = elevator;