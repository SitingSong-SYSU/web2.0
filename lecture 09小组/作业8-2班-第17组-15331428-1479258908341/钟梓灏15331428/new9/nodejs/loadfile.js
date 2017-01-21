var http = require('http');
var path = require('path');
var fs = require('fs');

function load_in_file(res, pathname) {
	switch(path.extname(pathname)){
        case ".html":
            res.writeHead(200, {"Content-Type": "text/html"});
            pathname = "./html/" + pathname;
            break;
        case ".js":
            res.writeHead(200, {"Content-Type": "text/javascript"});
            pathname = "./javascript" + pathname;
            break;
        case ".css":
            res.writeHead(200, {"Content-Type": "text/css"});
            pathname = "./css" + pathname;
            break;
        case ".jpg":
            res.writeHead(200, {"Content-Type": "image/jpeg"});
            pathname = "./image" + pathname;
            break;
        default:
            res.writeHead(200, {"Content-Type": "text/html"});
            pathname = "./html/index.html";
            break;
    };
    fs.readFile(pathname, function(err, data) {
        if (err) throw err;
        res.end(data);
    });
};

exports.load_in_file = load_in_file;