/**
 * Created by yusaira-khan on 25/07/15.
 */
var fs = require('fs');

/*If you can't connect to the database*/
function dummydata() {
    var filedata = fs.readFileSync(__dirname + '/../node_modules/data.json');
    filedata = JSON.parse(filedata);
    data = prettyHTML(filedata);
    fs.writeFileSync(__dirname+'/w.html',data);
    /* Beginning of normal code*/
}

function prettyHTML(data){

    var all = '<h1 style="font-family: sans-serif; color:#3b5998 ">FB Digest</h1><br/><br/><br/>';
    for (var i= 0; i < data.length; i++) {
        if (data[i].message == undefined) {
            continue;
        }
        var likes = data[i].likes;
        var comments = data[i].comments;
        var likeString = likes.toString();
        var com = comments.toString();
        if (likes == 25) {
            likeString = "25+"
        }
        if (comments == 25){
            com = "25+"
        }


        var from = data[i].from.name;
        var fromId = data[i].from.id;

        var fromLink = 'https://facebook.com/' + fromId;

        var linkParts = data[i].id.split('_');
        var link = 'https://www.facebook.com/groups/' + linkParts[0] + '/permalink/' + linkParts[1];
        var full = data[i].message.replace('/\n/','');

        var div = '<div style="max-width: 500px">';
        var fromTag = '<a href="'+ fromLink +'">'+from+'</a>';
        div += fromTag + "<br/>";
        div += full;
        var a = '<a href="'+ link +'">'+likeString +' Likes and ' + com + ' Comments</a>';
        all += '<div style="font-size: 14px; font-family: sans-serif; ">'+ div+'<br/>'+a+'</div><br/><br/></div>';
    }

    return all;
}

module.exports={
    'dummydata':dummydata,
    'getHTML':prettyHTML
};
