var pg = require('pg');

function addToDatabase(email, name) {
    pg.connect(process.env.USERS_DB_URL, function(err, client) {
        if (err) {
            console.log("Error is " + err.message);
        }
        var query = "INSERT INTO users (email, name) VALUES (\'" + email + "\',\'" + name + "\');";
        client.query(query);
    });
}

module.exports = {
    add:addToDatabase
};
