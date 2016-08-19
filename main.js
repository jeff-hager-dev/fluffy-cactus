(function(){
    'use strict';

    var Person = require('./person');
    var poolPeople = [];
    var peopleWaiting = [];
    var poolOfElevators = [];
    var numTimeIncrement = 1;
    var data = require('./data/challenge1input.json');

    for(var i = 0; i < data.calls.length; i++) {
        var call = data.calls[i];
        var newPerson = new Person(call.callId, call.callTime, call.startFloor, call.endFloor);
        poolPeople.push(newPerson);
        console.log(poolPeople);
    }

    // console.log(data);

    var getPersonFromPool = function(time, poolPeople){};
    var updateElevators = function (time, poolWaiting, poolOfElevators) {

    };

    var totalTimePast = 0;
/*
    while(poolPeople.length < 0){
        peopleWaiting.push(getPersonFromPool(totalTimePast, poolPeople));
        updateElevators(peopleWaiting, poolOfElevators);
        totalTimePast+=numTimeIncrement;
    }*/

})();