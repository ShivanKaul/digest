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
    var all = '';

    for (var i= 0; i < data.length; i++){
        var linkParts = data[i].id.split('_');
        var link = 'https://www.facebook.com/groups/' + linkParts[0] + '/permalink/'+linkParts[1];
        var full = data[i].message.replace('\n','')
                .replace('\\"','"')
                .replace("\\'","'");
        var div = '<div style="max-width: 500px; margin:auto">'+full+'\n';
        var a = '<a href="'+link+'">See Likes and Comments</a>';
        all += '<div style="margin: auto; font-size: 14px; font-family: sans-serif; ">\n'+ div+'<br/>'+a+'</div><br/><br/>\n</div>\n';
    }
    return all;
}

module.exports={
    'dummydata':dummydata,
    'getHTML':prettyHTML

};