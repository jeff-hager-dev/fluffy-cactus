class person {
    constructor(){
        this.curFlr = -1;
        this.destFlr = -1;
        this.callTime = -1;
        this.TotalWait = -1;

    }

    isItMyTurn(time){
        return this.callTime <= time;
    }
}