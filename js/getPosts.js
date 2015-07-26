var https = require('https');
var prettify = require('./prettify');

function getPosts (groupId, callback) {

// Note: remember to set FB ACCESS TOKEN as env variable on dev machine.
    var url = "https://graph.facebook.com/v2.4/" + groupId +"/feed?access_token=" + "CAACEdEose0cBAH5J4gQx6wWK4xuTROIplZAM7HHnpQazZCIq0jU23Tk0E24T2hzlfxtRNnS3ZCuKR6FvRARiuQe5mo3phWls7ZCMuHJUCtB49DW4UtCTFEjpulRgEgE5HnPkiUKnKAQF79KJdWJPJavsDxNWja7ZAvqmqZCPJhUxkVH6CBbR4pUWIw1T6mRMoexZBgHwrhLI7KZAW8waUTLB3cEgGZAT6cp0ZD" + "&fields=likes,from,comments,message";//process.env.ACCESS_TOKEN;//

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
            // Sanitize
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].likes) posts[i].likes = posts[i].likes.data.length;
                else posts[i].likes = 0;
                if (posts[i].comments) posts[i].comments = posts[i].comments.data.length;
                else posts[i].comments = 0;
            }
            // Sort
            // https://www.socialbakers.com/edgerankchecker/blog/2011/11/comments-4x-more-valuable-than-likes/
            posts.sort(function(a, b) {
                return parseFloat( (b.likes * 0.5) + (b.comments) ) - parseFloat( (a.likes * 0.5) + (a.comments) );
            });
            // Prettify
            var prettyHTML = prettify.getHTML(posts);
            // Send
            //callback(prettyHTML);
        });

    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

}

module.exports = getPosts;