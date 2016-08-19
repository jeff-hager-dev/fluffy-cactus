'use strict';
class person {
    constructor(callId, callTime, startFloor, endFloor){
        this.callId = callId;
        this.callTime = callTime;
        this.startFloor = startFloor;
        this.endFloor = endFloor;
        this.totalWait = -1;
    }
}

module.exports = person;