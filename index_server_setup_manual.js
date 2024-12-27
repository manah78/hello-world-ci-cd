const http = require('http');

const hostname = '127.0.0.1';; // Localhost
const port = 3000; // Port number

const server = http.createServer((req, res) => {
    res.statusCode = 200; // HTTP Status OK
    res.setHeader('Content-Type', 'text/html'); // Change content type to HTML
    res.end('<h1>Hello World!</h1><p>Welcome to my Node.js app.</p>');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
