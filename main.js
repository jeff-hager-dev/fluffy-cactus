(function(){
    var poolPeople = [];
    var peopleWaiting = [];
    var poolOfElevators = [];
    var numTimeIncrement = 1;

    var getPersonFromPool = function(time, poolPeople){};
    var updateElevators = function (time, poolWaiting, poolOfElevators) {

    };

    var totalTimePast = 0;
    while(poolPeople.length < 0){

        // Add person to people waiting: Grab the next peron if it is their time

        peopleWaiting.push(getPersonFromPool(totalTimePast, poolPeople));

        // Update Elevators

        updateElevators(poolWaiting, poolOfElevators);

        totalTimePast+=numTimeIncrement;
    }


})();