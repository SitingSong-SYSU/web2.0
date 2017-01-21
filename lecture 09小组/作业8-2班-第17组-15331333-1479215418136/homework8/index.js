var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = {};

handle['/'] = requestHandlers.loadData;
handle['/js/jquery.js'] = requestHandlers.loadData;
handle['/js/lodash.js'] = requestHandlers.loadData;
handle['/js/register.js'] = requestHandlers.loadData;
// handler['/favicon.ico'] = requestHandler.loadData;
handle['/css/register.css'] = requestHandlers.loadData;
// handler['/css/img/bkg.jpg'] = requestHandler.loadData;
handle['/getPost'] = requestHandlers.getPost;

server.start(router.route, handle);