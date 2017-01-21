var http = require('http');
var url = require('url');

// http.createServer(function (request, response) {
// 	response.writeHead(200, {'Content-Type' : 'text/plain'});
// 	response.write('Hello, world!');
// 	response.end();
// }).listen(8888);

function start (route, handle) {
	function onRequest (request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		console.log('Request for pathname: ' + pathname + ' received');
		var query = url.parse(request.url).query;
		console.log('Request for query: ' + query + ' received');

		request.setEncoding("utf-8");

		request.addListener("data", function (postDataChunk) {
			postData += postDataChunk;
			// console.log(typeof postDataChunk + '' + postDataChunk);
			console.log("Received POST data chunk '" + postDataChunk + "'.");
		});
		
		request.addListener("end", function() {
			route(handle, pathname, response, postData, query);
		});
		// route(handle, pathname, response);

		// response.writeHead(200, {'Content-Type' : 'text/plain'});
		// response.write('Hello, world!');
		// response.end();
	}
	http.createServer(onRequest).listen(8000);
	console.log('Server has started');
}

exports.start = start;