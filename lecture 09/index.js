var http = require('http');
var urlTool = require('url');
var querystring = require('querystring');
var fs = require('fs');
var validator = require('./validator');
var users = {}

http.createServer(function(req, res) {
	readFromJson();
	switch(req.url) {
		case '/validator.js':
			sendFile(res, 'validator.js', 'text/javascript');
			break;
		case '/signup.js':
			sendFile(res, 'signup.js', 'text/javascript');
			break;
		case '/style.css':
			sendFile(res, 'style.css', 'text/css');
			break;
		default:
		req.method === 'POST' ? registUser(req, res): sendHtml(req, res);
	}	
}).listen(8000);

console.log("signup server is listening at 8000");

function readFromJson() {
	var temp = fs.readFile('data.json','utf-8', function(err, data){ 
		if(err) console.log(err);
		else if(data) {
			var result1 = data.split("\n");
			for(var i = 0; i < result1.length; i++) {
				if (result1[i]) {
					var result = JSON.parse(result1[i]);
					users[result.username] = result;
				}
			}
		}
	});
}

function sendFile(res, filepath, mime) {
	res.writeHead(200, {"Content-Type": mime});
	res.end(fs.readFileSync(filepath));
}

function registUser(req, res) {
	req.on('data', function(chunk){
		try {
			var user = parseUser(chunk.toString());
			checkUser(user);
			users[user.username] = user;
			res.writeHead(301, {Location: '?username=' + user.username});
			res.end();
		} catch (error) {
			console.warn("regist error", error);
			showSignup(res, user, error.message);
		}
	});
}

function checkUser(user) {
	var errorMessage = [];
	for (var key in user) {
		if (!validator.isFieldValid(key, user[key]))
			errorMessage.push(validator.form[key].errorMessage);
		if (!validator.isAttrValueUnique(users, user, key))
			errorMessage.push(key + "被占用！");
	}
	if (errorMessage.length > 0)
		throw new Error(errorMessage.join("<br />"));
}

function parseUser(message) {
	params = message.match(/username=(.+)&sid=(.+)&phone=(.+)&email=(.+)/);
	var user = {username: params[1], sid: params[2], phone: params[3], email: decodeURIComponent(params[4])};
	console.log("user parsed is: ", user);
	return user;
}

function sendHtml(req, res) {
	var username = parseUsername(req);
	if(!username || !isRegistedUser(username)) {
		showSignup(res, {username: username}, null);
	} else {
		showDetail(res, users[username]);
		fs.appendFile("data.json", JSON.stringify(users[username]) + "\n", function(err) {
			if(err) console.log("write data error!");
		});
	}
}

function parseUsername(req) {
	return querystring.parse(urlTool.parse(req.url).query).username;
}

function isRegistedUser(username) {
	return !!users[username];
}

function showSignup(res, user, error) {
	if ('/signup.html') {
		res.writeHead(200, {"Content-Type": 'text/html'});
		if (error) res.write("<!DOCTYPE html><html><head><title>注册</title><link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\"><script type=\"text/javascript\" src=\"http:\/\/code.jquery.com\/jquery-3.1.1.js\"></script><script type=\"text/javascript\" src=\"validator.js\"></script><script type=\"text/javascript\" src=\"signup.js\"></script></head><body><form id=\"signup\" method=\"post\"><h1>注册用户</h1><div class=\"error\">" + error + "</div><div class=\"username\"><label for=\"username\">用户名</label><input id=\"username\" name=\"username\" value=\"sst123456\"><br><span class=\"error\"></span></div><div class=\"sid\"><label for=\"sid\">学号</label><input id=\"sid\" name=\"sid\" value=\"12345678\"><br><span class=\"error\"></span></div><div class=\"phone\"><label for=\"phone\">电话</label><input id=\"phone\" name=\"phone\" value=\"12345678910\"><br><span class=\"error\"></span></div><div class=\"email\"><label for=\"email\">邮箱</label><input id=\"email\" name=\"email\" value=\"songsiting@sst.com\"><br><span class=\"error\"></span></div><div class=\"button\"><input type=\"reset\" value=\"重置\" class=\"button reset\"><input type=\"submit\" value=\"提交\" class=\"button submit\"></div></form></body></html>");
		else res.write("<!DOCTYPE html><html><head><title>注册</title><link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\"><script type=\"text/javascript\" src=\"http:\/\/code.jquery.com\/jquery-3.1.1.js\"></script><script type=\"text/javascript\" src=\"validator.js\"></script><script type=\"text/javascript\" src=\"signup.js\"></script></head><body><form id=\"signup\" method=\"post\"><h1>注册用户</h1><div class=\"username\"><label for=\"username\">用户名</label><input id=\"username\" name=\"username\" value=\"sst123456\"><br><span class=\"error\"></span></div><div class=\"sid\"><label for=\"sid\">学号</label><input id=\"sid\" name=\"sid\" value=\"12345678\"><br><span class=\"error\"></span></div><div class=\"phone\"><label for=\"phone\">电话</label><input id=\"phone\" name=\"phone\" value=\"12345678910\"><br><span class=\"error\"></span></div><div class=\"email\"><label for=\"email\">邮箱</label><input id=\"email\" name=\"email\" value=\"songsiting@sst.com\"><br><span class=\"error\"></span></div><div class=\"button\"><input type=\"reset\" value=\"重置\" class=\"button reset\"><input type=\"submit\" value=\"提交\" class=\"button submit\"></div></form></body></html>");
		res.end();
	}
}

function showDetail(res, user) {
	if ('/detail.html') {
		res.writeHead(200, {"Content-Type": 'text/html'});
		res.write("<!DOCTYPE html><html><head><title>详情</title></head><body><h1>用户详情</h1><p>用户名<span>" + user.username + "</span></p><p>学号<span>" + user.sid + "</span></p><P>电话<span>" + user.phone + "</span></P><p>邮箱<span>" + user.email + "</span></p></body></html>");
		res.end();
	}
}
