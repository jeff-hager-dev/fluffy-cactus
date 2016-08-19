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
        peopleWaiting.push(getPersonFromPool(totalTimePast, poolPeople));
        updateElevators(peopleWaiting, poolOfElevators);
        totalTimePast+=numTimeIncrement;
    }


})();