var http = require("http");
var fs = require('fs'); 
var url = require('url');
var querystring = require('querystring');
var user = new Array();  // 用户信息库

http.createServer(function(request, response) {
    // request：表单action
    // 接收postData
    var postData = "";
    request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
    });
    request.addListener("end", function(){console.log(postData);});  // 将转化的用户数据输出控制台，便于理解与调试
    // 当浏览器访问 http://localhost:8000?username=abc时，如果abc是已经注册的用户，则显示abc的“详情”界面
    var userSearch = -1;  // 标记在用户信息库的查找，未找到则为-1
    var userreq = request.url.substr(request.url.indexOf('=')+1, request.url.length-request.url.indexOf('=')-1);
    for (var i = 0; i < user.length; i++) {
        if (userreq == user[i][0])
            userSearch = i;  // 在用户信息库中第i个用户符合要求
    }
    // 找到username=abc时
    if (userSearch != -1) {
        fs.readFile('./info.html', 'utf-8', function (err, data) {
            if (err) throw err; 
            response.writeHead(200, {"Content-Type": "text/html"}); 
            response.write(data.replace(/#username/, user[userSearch][0]).replace(/#studentid/, user[userSearch][1])
                               .replace(/#phone/, user[userSearch][2]).replace(/#mail/, user[userSearch][3]));
            response.end();
        });
    } else {  // 找不到username=abc时，返回注册页面
        // console.log(request.url); 输出：/(默认)、/index.css、/favicon.ico
        var pathname = url.parse(request.url).pathname; 
        var ext = pathname.match(/(\.[^.]+|)$/)[0];  //取得后缀名 
        switch(ext){
            case ".html":   // info.html
                fs.readFile('./info.html', 'utf-8', function (err, data) {
                    if (err)
                        throw err;
                    // 存储用户输入数据
                    var newuser = querystring.parse(postData);
                    var newinfo = new Array();
                    var repeat = -1;
                    for (var i in newuser) {
                        newinfo.push(newuser[i]);
                    }
                    // 遍历判断新用户数据是否重复
                    for (var i = 0; i < user.length; i++) {
                        for (var j = 0; j < newinfo.length; j++) {
                            if (user[i][j] == newinfo[j]) {
                                repeat = j;
                                break;
                            }
                        }                    
                    }
                    // 用户数据不重复
                    if (repeat == -1) {
                        user.push(newinfo);
                    }
                    response.writeHead(200, {"Content-Type": "text/html"});
                    if (repeat == -1) {
                        response.write(data.replace(/#username/, newinfo[0]).replace(/#studentid/, newinfo[1])
                                           .replace(/#phone/, newinfo[2]).replace(/#mail/, newinfo[3]));
                    } else {  // 用户数据重复
                        response.write(data);
                        if (repeat == 0) {
                            response.write("<p>该用户名已被注册，请重新输入</p>");
                        } else if (repeat == 1) {
                            response.write("<p>该学号已被注册，请重新输入</p>");
                        } else if (repeat == 2) {
                            response.write("<p>该电话已被注册，请重新输入</p>");
                        } else if (repeat == 3) {
                            response.write("<p>该邮箱已被注册，请重新输入</p>");
                        }
                    }
                    response.end();
                });
                break;
            case ".ico":
                break;
            case ".jpg":
                fs.readFile("."+request.url, 'binary',function (err, data) {
                if (err) throw err; 
                response.writeHead(200, { "Content-Type": "image/jpeg"}); 
                response.write(data, "binary");
                response.end(); 
                }); 
                break;
            case ".css":
            case ".js": 
                fs.readFile("."+request.url,'utf-8',function (err, data) {
                if (err)
                    throw err; 
                response.writeHead(200, {
                "Content-Type": { 
                ".css":"text/css", 
                ".js":"application/javascript", 
                }[ext] 
                }); 
                response.write(data); 
                response.end(); 
                });
                break; 
            default: 
                fs.readFile('./index.html', 'utf-8', function (err, data) {
                    if (err)
                        throw err;
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(data); 
                    response.end();
                }); 
        }
    }
}).listen(8000);  // 监听的端口号
console.log("Server running at http://127.0.0.1:8000/");
