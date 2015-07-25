require('dev_resolver')();
var sendgrid_username   = process.env.SENDGRID_USERNAME;
var sendgrid_password   = process.env.SENDGRID_PASSWORD;
var api_key = process.env.SENDGRID_API_KEY;
var to                  = "yusairamk@hotmail.com";

var sendgrid   = require('sendgrid')(api_key);
var email      = new sendgrid.Email();

email.addTo(to);
email.setFrom(to);
email.setSubject('[sendgrid-php-example] Owl');
email.setText('Owl are you doing?');
email.setHtml('<strong>%how% are you doing?</strong>');
email.addSubstitution("%how%", "Owl");
email.addHeader('X-Sent-Using', 'SendGrid-API');
email.addHeader('X-Transport', 'web');


sendgrid.send(email, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});

