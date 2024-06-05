// create web server
// create a server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// create a server
http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var filepath = path.join(__dirname, 'comments', pathname);
    fs.exists(filepath, function(exists) {
        if (exists) {
            fs.readFile(filepath, function(err, data) {
                response.writeHead(200);
                response.write(data);
                response.end();
            });
        } else {
            response.writeHead(404);
            response.write('404 Not Found\n');
            response.end();
        }
    });
}).listen(8080);
console.log('Server running at http://
