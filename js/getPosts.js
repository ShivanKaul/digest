var https = require('https');

function getPosts (groupId) {

// Note: remember to set FB ACCESS TOKEN as env variable on dev machine.
    var url = "https://graph.facebook.com/v2.4/" + groupId +"/feed?access_token=" + process.env.ACCESS_TOKEN;

    https.get(url, function(responseFB) {

        responseFB.setEncoding('utf8');
        var body = "";
        console.log("Got response: " + responseFB.statusCode);

        responseFB.on('data', function(chunk) {
            body += chunk;
        });

        responseFB.on('end', function() {
            var json = JSON.parse(body);
            return JSON.stringify(json, undefined, 2);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

}

module.exports = getPosts;