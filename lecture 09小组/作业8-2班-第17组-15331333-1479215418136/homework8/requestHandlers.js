var querystring = require("querystring");
var fs = require('fs');

var contentTypes = {
	".ico": "image/x-icon",
	".jpg": "image/jpg",
	".css": "text/css",
	".js": "text/javascript",
	".html": "text/html"
};

var toChinese = {
	"username": "用户名",
	"id": "学号",
	"phone": "电话",
	"email": "邮箱"
}

var allUser = [];


function loadData (response, postData, pathname, query) {
	var flag = false;
	if (query == null) {
		load(pathname, response, "", "");
	} else {
		for (var i = 0; i < allUser.length; i++) {
			if (allUser[i]['username'] == query.match(/=.*/)[0].slice(1)) {
				load('/detail.html', response, "", allUser[i]);
				flag = true;
			}
		}
		if (!flag) {
			load(pathname, response, "", "");
		}
	}
}

function userIsExist(user) {
	if (allUser.length == 0) {
		return "";
	} else {
		for (var i = 0; i < allUser.length; i++) {
			if (user['username'] == allUser[i]['username']) return 'username';
			if (user['id'] == allUser[i]['id']) return 'id';
			if (user['phone'] == allUser[i]['phone']) return 'phone';
			if (user['email'] == allUser[i]['email']) return 'email';
		}
		return "";
	}
}

function load(pathname, response, repeat, user) {
	console.log('this is loadData');
	var ext = pathname.match(/(\.[^.]+|)$/)[0];  // 取得后缀名  ??
	console.log(pathname + '\'s ext is: ' + ext);
	if (ext.length == 0) ext = '.html';
	if (pathname.length == 1) pathname = '/register.html';

	fs.readFile('./' + pathname, 'utf-8', function(err, data){
		console.log('read the file: ./' + pathname);
		// console.log('data: '+data);
		if (err) throw err;
		response.writeHead(200, {"Content-Type": contentTypes[ext]});
		if (repeat != "" && ext == '.html') {
			response.write(correctData(data, repeat), 'utf-8');
			// alert(repeat + " repeat!");
			response.end();
		}
		else if (pathname == '/detail.html') {
			response.write(detailData(data, user), 'utf-8');
		} else {
			response.write(data, 'utf-8');
			response.end();
		}
	});
}

function detailData(data, user) {
	var newData = data.replace("<input name=\"username\" id=\"username\" type=\"text\" oninput=\"checkName()\" />",
		 "<p>" + user['username'] + "</p>").replace("<input name=\"id\" id=\"id\" type=\"text\" oninput=\"checkId()\" />",
		 "<p>" + user['id'] + "</p>").replace("<input name=\"phone\" id=\"phone\" type=\"text\" oninput=\"checkPhone()\" />",
		 "<p>" + user['phone'] + "</p>").replace("<input name=\"email\" id=\"email\" type=\"text\" oninput=\"checkEmail()\" />",
		 "<p>" + user['email'] + "</p>").replace("<input type=\"submit\" name=\"提交\" />", "").replace("<input type=\"reset\" name=\"重置\" />", "");
	return newData;
}

function correctData(data, repeat) {
	var newData = data.replace(/<div id=\"notice\">invisible<\/div>/,
	"<div id=\"repeat_notice\">"+ toChinese[repeat] +"重复！<\/div>")
	return newData;
}

function getPost(response, postData, pathname, query) {
	console.log('get post data: ' + postData);
	var user = querystring.parse(postData);
	var repeat = userIsExist(user);
	if (repeat != "") {
		load('/', response, repeat, "");
	} else {
		allUser.push(user);
		load('/detail.html', response, "", user);
		// response.end('register successfully');
	}
}

exports.loadData = loadData;
exports.getPost = getPost;



