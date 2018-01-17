const fs 	= require('fs');
const url 	= require('url');
const path 	= require('path');
const http 	= require('http');

const root = path.resolve(process.argv[2] || '.');

console.log('root: ' + root);

var server = http.createServer(function(request, response) {
	var pathname = url.parse(request.url).pathname;
	console.log('pathname: ' + pathname);

	var filepath = path.join(root, pathname);

	if (path == '/') {
		filepath = path.join(root, 'index.html');
		console.log('newFilePath: ' + filepath);
	}

	fs.stat(filepath, function (err, stats) {
		if (!err && stats.isFile()) {
			response.writeHead(200);
			fs.createReadStream(filepath).pipe(response);
		} else {
			filepath = path.join(root, '/index.html');
			fs.stat(filepath, function(err, stats) {
				if (!err && stats.isFile()) {
					response.writeHead(200);
					fs.createReadStream(filepath).pipe(response);
				} else {
					response.writeHead(404);
					response.end('404 not found!')
				}
			})
		}
	})
})

server.listen(7200);
