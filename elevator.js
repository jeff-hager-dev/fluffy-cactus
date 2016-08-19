/**
 * Created by CAM0729 on 8/19/2016.
 */
var possibleDirs = {"UP": 1, "STILL": 0, "DOWN": -1};
class elevator{
    constructor() {
        this.destFlr = -1;
        this.curFlr = -1;
        this.maxPpl = -1;
        this.numPpl = -1;
        this.curDir = possibleDirs.STILL;
    }
}