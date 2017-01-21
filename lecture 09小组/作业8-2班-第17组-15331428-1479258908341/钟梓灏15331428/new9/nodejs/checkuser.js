var http = require('http');

function check_repeat_user(res, req, json_usersave) {
	var postData = "", flag, tmp = "";
    req.addListener('data', function(data) {
        postData += data;
        tmp = postData;
        postData = postData.substr(0, postData.length-1);
        flag = tmp.substr(tmp.length-1, 1);
    });
    req.addListener('end', function() {
        var result = 'true';
        if (json_usersave != "") {
            var l = json_usersave.user.length;
            for (var i = 0; i < l; i++) {
                if (flag == '0' && postData == json_usersave.user[i]) result = 'false';
                if (flag == '1' && postData == json_usersave.number[i]) result = 'false';
                if (flag == '2' && postData == json_usersave.phone[i]) result = 'false';
                if (flag == '3' && postData == json_usersave.email[i]) result = 'false';
            }
        }
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end(result);
    });
}

exports.check_repeat_user = check_repeat_user;