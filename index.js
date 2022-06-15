const fs = require('fs');
const http = require('http');

const data = fs.readFileSync(`./data.json`, 'utf-8');
// console.log(data);

const server = http.createServer((req, res) => {
  const urlcha = req.url;
  if (urlcha === '/api') {
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
      'my-own-header': 'fail',
      q,
    });
    res.end('<h1>404</h1>');
  }
});

server.listen(7001, '127.0.0.1', () => {
  console.log('server is running');
});
