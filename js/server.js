// Load the http module to create an http server.
var http = require('http');
var sendEmail = require('./mailsender');

var server = http.createServer(function (_, responseToSend) {
    responseToSend.writeHead(200, {"Content-Type": "text/plain"});



    responseToSend.end("Hi!")
});

server.listen(process.env.PORT || 8080);

console.log("Port currently being used is: " + (process.env.PORT || 8080));