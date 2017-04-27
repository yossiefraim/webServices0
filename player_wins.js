var config = require("./config").events;
var emt = require('events');
var myEmt = new emt();
var logMsg = '';

//create player
class player{
    constructor(name){
        this.name = name;
        this.lap = 0;
        this.fastLap = 0;
    };
    //adding lap to total laps
    addLap(lap){
        this.lap += lap;
        myEmt.emit(config.addLap,this.name,this.lap,lap);
    };
    //adding fastests lap to total laps
    addFastestLap(fastLap){
        this.fastLap += fastLap;
        myEmt.emit(config.addFastestLap,this.name,this.fastLap,fastLap);
    };
    //remove lap from total laps
    removeLap(lap){
        if((this.lap-lap)>=0){
            this.lap = this.lap-lap;
            myEmt.emit(config.removeLap,this.name,this.lap,lap);
        }
        //if total laps <0, reset laps and sent genaric error msg
        else{
            this.lap=0;
            myEmt.emit(config.negativeLaps);
        }
    };
    //remove fastest lap from total fast lap
    removeFastestLap(fastlap){
        if((this.fastLap-fastlap)>=0){
            this.fastLap = this.fastLap-fastlap;
            myEmt.emit(config.removeFastestLap,this.name,this.fastLap,fastlap);
        }
        //if total fastests laps <0, reset the value and sent genaric error msg
        else{
            this.fastLap=0;
            myEmt.emit(config.negativeLaps);
        }
    };

};

//export the player class
exports.create = player;
//logMsg parm collect all the logs
//emit for adding lap
myEmt.on(config.addLap,
    (name,currLap,addedLap) =>{
        console.log(`${name} complete ${addedLap} more laps and now he have ${currLap} laps`);
        logMsg += `${name} complete ${addedLap} more laps and now he have ${currLap} laps
        `;
        exports.logs = logMsg;
    });
//emit for adding fast lap
myEmt.on(config.addFastestLap,
    (name,currFastLap,addedFastLap) =>{
        console.log(`${name} complete ${currFastLap} fastest laps and now he have ${addedFastLap} fastest laps`);
        logMsg += `${name} complete ${currFastLap} fastest laps and now he have ${addedFastLap} fastest laps
        `;
        exports.logs = logMsg;
    });
//emit for remove lap
myEmt.on(config.removeLap,
    (name,currLap,removeLaps) =>{
        console.log(`race judes punished ${name} and remove ${removeLaps} laps from his record and now he have ${currLap} laps`);
        logMsg += `race judes punished ${name} and remove ${removeLaps} laps from his record and now he have ${currLap} laps
        `;
        exports.logs = logMsg;
    });
//emit for remove fast lap
myEmt.on(config.removeFastestLap,
    (name,currLap,removeFastsLaps) =>{
        console.log(`race judes punished ${name} and remove ${removeFastsLaps} fastest laps from his record and now he have ${currLap} fastest laps`);
        logMsg += `race judes punished ${name} and remove ${removeFastsLaps} fastest laps from his record and now he have ${currLap} fastest laps
        `;
        exports.logs = logMsg;
    });
//emit for error
myEmt.on(config.negativeLaps,
    () =>{
        console.log(`can not be negative number, so now it's laps /fastest laps equal to 0 `);
        logMsg += `can not be negative number, so now it's laps /fastest laps equal to 0 
        `;
        exports.logs = logMsg;
    });







