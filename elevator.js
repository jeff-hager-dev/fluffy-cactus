'use strict';

var Log = require('./log');

var possibleDirs = {"UP": 1, "STILL": 0, "DOWN": -1};
var statuses = {"AT_FLOOR": 1, "BETWEEN_FLOORS": 2, "PICKING_UP": 3};


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
    }

    updatePosition(time, selectNextFloorFunc) {

        if (this.destFlr === -1) {
            this.destFlr = selectNextFloorFunc(this.curFlr);
            this.setDir(this.destFlr);
        }

        //time = endwaittime - START MOVING
        if (this.status = statuses.PICKING_UP) {
            if (time > this.endWaitTime) {
                this.status = statuses.BETWEEN_FLOORS;
            }
        }

        if (!(this.status === statuses.PICKING_UP)) {
            if ((time % 2 == 0) && (this.status === statuses.BETWEEN_FLOORS)) {
                this.status = statuses.AT_FLOOR;
                this.move(this.curDir);
            }
            else {
                this.status = statuses.BETWEEN_FLOORS;
            }
        }
    }

    letPersonOn(time, person) {
        if (this.status === statuses.AT_FLOOR) {
            if (this.people.length >= this.maxPpl) {
                return;
            }

            if (this.endWaitTime < 0) {
                this.status = statuses.PICKING_UP;
                this.endWaitTime = time + 10;
            }

            this.people.push(person);
            if (this.destFlr === -1) {
                this.destFlr = person.endFloor;
                this.setDir(this.destFlr);
            }
            return person;

        }
    }

    letPeopleOff() {
        if (this.people.length > 0) {
            var peopleWhoLeft = this.people.filter(function (p) {
                return p.endFloor === this.curFlor;
            }, this);

            this.people = peopleWhoLeft;

            return peopleWhoLeft;
        }

        return [];
    }

    exchangePeople(time, peopleOnFloor) {
        var peopleWhoGotOn = [];
        _.each(peopleOnFloor, function (p) {
            peopleWhoGotOn.push(this.letPersonOn(time, p));
        });


        var peopleWhoLeft = this.letPeopleOff();

        console.log("Got On: " + peopleWhoGotOn);
        console.log("Got Off: " + peopleWhoLeft);
      return peopleWhoLeft.length;
    }

    move(dir) {
        this.curFlor += possibleDirs[dir];
    }


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