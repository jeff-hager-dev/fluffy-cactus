/**
 * Created by CAM0729 on 8/19/2016.
 */
var possibleDirs = {"UP": 1, "STILL": 0, "DOWN": -1};

class elevator {

    var status = {"AT_FLOOR": 1, "BETWEEN_FLOORS": 2, "ON_FIRE": 3};

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


    dropPerson = function (person) {
        this.people = people.filter(function (p) {
            return p.callId != person.callId;
        });
        this.numPpl -= 1;
        if (this.numPpl === 0) {
            this.curDir = possibleDirs.STILL;
        }
    };

    move = function (dir) {
        this.curFlor += possibleDirs[dir];
        this.status = status.BETWEEN_FLOORS;
    };


    setDir = function (flr) {
        if (flr < this.curFlr) {
            this.curDir = possibleDirs.DOWN;
        }

        else {
            this.curDir = possibleDirs.UP;
        }
    }
}