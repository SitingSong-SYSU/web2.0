var fs = require('fs');
var querystring = require('querystring');
var newhtml = require('./newhtml');

function user_log_in(res, search, json_usersave) {
	search = search.substr(10, search.length-8);
    var l = json_usersave.user.length;
    for (var i = 0; i < l; i++) {
        if (json_usersave.user[i] == search) {
            var user_information = "user="+json_usersave.user[i]+"&number="+json_usersave.number[i]+"&phone="+json_usersave.phone[i]+"&email="+json_usersave.email[i];
            var json_information = querystring.parse(user_information);
            newhtml.newpage(res, json_information);
            return true;
        }
    }
    return false;
}

exports.user_log_in = user_log_in;