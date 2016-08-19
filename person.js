'use strict';
class person {
    constructor(){
        this.curFlr = -1;
        this.destFlr = -1;
        this.callTime = -1;
        this.TotalWait = -1;
      this.callId = callId;
      this.callTime = callTime;
      this.startFloor = startFloor;
      this.endFloor = endFloor;
      this.totalWait = -1;

    }

    isItMyTurn(time){
        return this.callTime <= time;
    }
}

module.exports = person;