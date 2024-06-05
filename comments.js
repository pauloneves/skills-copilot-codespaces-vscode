// Create web server that listens on port 3000
// Respond to GET requests to /comments with a list of comments
// Respond to POST requests to /comments by adding a new comment
// Respond to DELETE requests to /comments by deleting the last comment
// Respond to PUT requests to /comments by updating the last comment
// Respond to all other requests with a 404 status code

const http = require('http');
const url = require('url');
const qs = require('querystring');
const port = 3000;

const comments = [];

const server = http.createServer((req, res) => {
  const method = req.method;
  const path = url.parse(req.url).pathname;
  const query = qs.parse(url.parse(req.url).query);

  if (method === 'GET' && path === '/comments') {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(comments));
    res.end();
  } else if (method === 'POST' && path === '/comments') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      comments.push(JSON.parse(body));
      res.end();
    });
  } else if (method === 'DELETE' && path === '/comments') {
    comments.pop();
    res.end();
  } else if (method === 'PUT' && path === '/comments') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      comments[comments.length - 1] = JSON.parse(body);
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});