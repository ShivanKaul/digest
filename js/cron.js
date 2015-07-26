var sendEmails = require('./mailsender');
var CronJob = require('cron').CronJob;
var getPostsFromGroup = require('./getPosts');

var pg = require('pg');

function sendTo (users) {

    console.log("Got posts, about to send emails...");
    var posts = getPostsFromGroup("1469290070036317", function (posts) { sendEmails(posts, users) } ); // only HH for now
    // HH : 759985267390294
    // SUM Hacks : 1469290070036317
}

var job = new CronJob('*/10 * * * * *', function() {

        console.log("tick!");

        var users = [];

        pg.connect(process.env.USERS_DB_URL, function(err, client) {
            if (err) {
                console.log("Error is " + err.message);
            }
            var query = client.query('SELECT users.email FROM users LIMIT 150');
            query.on('row', function(row) {
                users.push(row.email);
            });
            query.on('end', function () { client.end(); sendTo(users) });
        });

        /*
         * Runs every day at 10.30 pm
         */

    }, null,
    true, /* Start the job right now */
    'America/Montreal' /* Time zone of this job. */
)