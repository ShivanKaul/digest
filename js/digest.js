
var url = "https://graph.facebook.com/v2.4/759985267390294/feed?access_token="
$.ajax({
    url: url,
    dataType: "json",
    statusCode: {
        502: function () {
            console.log("Error 502 thrown.")
        }
    },
    success: function (queryResult) {
        // get array of all results
        var results = queryResult.data;
        var numResults = results.length;
        var map = [];
        if (numResults > 0) {
            var bound = Math.min(25, numResults); // get either first 25 or however many we got if below 25
            for (i = 0; i < bound; i++) {
                var tuple = results[i];
                var message = tuple.message;
                var story = tuple.story;
                map.push({message: message, story: story})

            }
            console.log(map)
        }
    }
})
