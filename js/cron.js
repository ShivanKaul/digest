var sendEmail = require('./mailsender');
var CronJob = require('cron').CronJob;
var getPosts = require('./getPosts');

var job = new CronJob('00 30 22 * * *', function() {
        /*
         * Runs every day at 10.30 pm
         */
        var posts = getPosts("759985267390294"); // only HH for now
        sendEmail(posts);
    }, null,
    true, /* Start the job right now */
    'America/Montreal' /* Time zone of this job. */
);