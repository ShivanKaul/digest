//function sendEmail (fbResponse) {
fbResponse='Hi! I am a potato!';
    var sendgrid_username = process.env.SENDGRID_USERNAME;
    var sendgrid_password = process.env.SENDGRID_PASSWORD;
    var from = "no-reply@fbdigest.com";
    var to = "shivankaul.1993@gmail.com";

    var sendgrid = require('sendgrid')(sendgrid_username, sendgrid_password);
    var email = new sendgrid.Email();

    email.addTo(to);
    email.setFrom(from);
    email.setSubject('Test');
    email.setText(fbResponse);
    email.addHeader('X-Sent-Using', 'SendGrid-API');
    email.addHeader('X-Transport', 'web');

    sendgrid.send(email, function (err, json) {
        if (err) {
            return console.error(err);
        }
        console.log(json);
    });
//}
//module.exports = sendEmail;