var app = require('../app');
var http = require('http');


var server = http.createServer(app);
server.listen(4200);
