/**
 * Created by yusaira-khan on 25/07/15.
 */
var http = require('http');
var htdocs = '/../htdocs';
var db = require('./database_adder');
var fs = require('fs');

serveStatic = function (req, res) {
    var file = req.url;

    if (file == '/') {
        file = '/index.html';

    } else if (file == '/subscribe') {
        //TODO:send confirmation email
        //TODO: have a pending confirmation field in database
        file = 'check.html';

    } else if (file.split('&')[1] == 'confirmed') {
        //TODO: store in database
        file = 'confirmed.html'

    } else {
        res.writeHead(404);
        return res.end('404 not found')
    }

    fs.readFile(__dirname + htdocs + file,
        function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
};
var server = http.createServer(serveStatic);
server.listen(process.env.PORT || 8080);
