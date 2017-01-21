var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var newuser = require('./nodejs/newuser');
var login = require('./nodejs/login');
var checkuser = require('./nodejs/checkuser');
var loadfile = require('./nodejs/loadfile');

http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var search = url.parse(req.url).search;
    fs.readFile('./data/data.txt', 'utf-8', function(err, data) {
        if (err) throw err;
        var json_usersave = data;
        var flag = false;
        if (json_usersave != "") json_usersave = JSON.parse(json_usersave);
        if (search != null && json_usersave != "") {
            flag = login.user_log_in(res, search, json_usersave);
        }
        if (flag == false) {
            if (req.method == "POST") {
                if (pathname == '/check') {
                    checkuser.check_repeat_user(res, req, json_usersave);
                }
                else {
                    newuser.create_new_user(res, req, json_usersave);
                }
            }
            else {
                loadfile.load_in_file(res, pathname);
            }
        }
    });
}).listen(8000, function(){
    console.log('8000 is listened!');
});