var querystring = require('querystring');

function newpage(res, json_usersave) {
    var newhtml = "<!DOCTYPE html><html lang='en'><head><title>登陆成功！</title><meta charset='utf-8'></head>"+"<link href='test.css' type='text/css' rel='stylesheet' />"+"<body><h1>用户详情！</h1><div id='mid'><p>用户名：" + json_usersave.user + "</p><p>学号：" + json_usersave.number + "</p><p>电话：" + json_usersave.phone + "</p><p>邮箱：" + json_usersave.email + "</p></div></body></html>";
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(newhtml);
};

exports.newpage = newpage;