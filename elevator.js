'use strict';

var Log = require('./log');

var possibleDirs = {"UP": 1, "STILL": 0, "DOWN": -1};
var statuses = {"AT_FLOOR": 1, "BETWEEN_FLOORS": 2, "PICKING_UP": 3};


class elevator {

    constructor(name, startFlr, capacity) {
        this.destFlr = -1;
        this.curFlr = startFlr;
        this.maxPpl = capacity;
        this.curDir = possibleDirs.STILL;
        this.people = [];
        this.name = name;
        this.startWaitTime = -1;
        this.endWaitTime = -1;
        this.status = status.AT_FLOOR;
    };

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
                this.destFlr = person.destFlr;
                this.setDir(this.destFlr);
            }
            return person;

        }
    }

    updatePosition(time, selectNextFloorFunc) {
        console.log("TODO");
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
    }

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