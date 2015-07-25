var sendEmails = require('./mailsender');
var CronJob = require('cron').CronJob;
var getPostsFromGroup = require('./getPosts');

var pg = require('pg');

function sendTo (users) {

    console.log("Got posts, about to send emails...");
    var posts = getPostsFromGroup("759985267390294", function (posts) { sendEmails(posts, users) } ); // only HH for now
}

var job = new CronJob('*/10 * * * * *', function() {

        console.log("tick!");

        var users = [];

        pg.connect(process.env.USERS_DB_URL, function(err, client) {
            var query = client.query('SELECT users.email FROM users');
            query.on('row', function(row) {
                users.push(JSON.stringify(row.email));
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