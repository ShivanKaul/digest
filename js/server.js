// Load the http module to create an http server.
var http = require('http');
var https = require('https');
var sendEmail = require('./mailsender');

// Note: remember to set FB ACCESS TOKEN as env variable on dev machine.
var url = "https://graph.facebook.com/v2.4/759985267390294/feed?access_token=" + process.env.ACCESS_TOKEN;
console.log(url)

var server = http.createServer(function (_, responseToSend) {
    responseToSend.writeHead(200, {"Content-Type": "text/plain"});

    https.get(url, function(responseFB) {
        var json;
        responseFB.setEncoding('utf8');
        var body = "";
        console.log("Got response: " + responseFB.statusCode);
        responseFB.on('data', function(chunk) {
            body += chunk;
        });
        responseFB.on('end', function() {
            json = JSON.parse(body);
            var fbResponse = JSON.stringify(json, undefined, 2);
            sendEmail(fbResponse);
            responseToSend.end("Email sent!");
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});

server.listen(process.env.PORT || 8080);

console.log("Port currently being used is: " + (process.env.PORT || 8080));