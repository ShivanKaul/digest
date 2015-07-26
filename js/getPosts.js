var https = require('https');
var prettify = require('./prettify');

function getPosts (groupId, callback) {

// Note: remember to set FB ACCESS TOKEN as env variable on dev machine.
    var url = "https://graph.facebook.com/v2.4/" + groupId +"/feed?access_token=" + "CAACEdEose0cBAGMbZAvFEviBLemryB0rpRL2xNdAhHIoohakYiVyrIPPijm7VzulSUZATZCKoHUC9t82Hn82DFvAh5ZBuvqcCRQbLtzDfHxu73gmCG6FhkULlwjisb4UvhZBmZAYKeGO0e1megMkPOtna3B8P6dOA8ZCOaKnopbZBETgoYXMgWbUZBfHOJbNpZAQgaPo0cJMcirY2pjOxuYoH9x1xgZC1pmLzMZD" + "?fields=likes,from";//process.env.ACCESS_TOKEN;//

    https.get(url, function(responseFB) {

        responseFB.setEncoding('utf8');
        var body = "";
        console.log("Got response: " + responseFB.statusCode);

        responseFB.on('data', function(chunk) {
            body += chunk;
        });

        responseFB.on('end', function() {
            var json = JSON.parse(body);
            var posts = json.data;
            var prettyHTML = prettify.getHTML(posts);
            callback(prettyHTML);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

}

module.exports = getPosts;