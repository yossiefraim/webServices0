var http = require("http");
var f1Racer = require('./player_wins');

//create server
http.createServer(
    (req,res) =>{
    let theBestRacer = new f1Racer.create("Lewis Hamilton");
    theBestRacer.addLap(2);
    theBestRacer.addFastestLap(2);
    theBestRacer.removeLap(1);
    theBestRacer.removeFastestLap(1);
    theBestRacer.addLap(3);
    theBestRacer.addFastestLap(2);
    theBestRacer.removeFastestLap(2);
    theBestRacer.removeLap(10);
    theBestRacer.addLap(1);

    res.writeHeader(200);
// write the logs to http client page
    res.write(f1Racer.logs);
//write success msg
    res.end('success');
}).listen(3000);

console.log('listen on port 3000');