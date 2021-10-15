const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.write("HOME");
    res.end();
  }
  if (req.url === "/login") {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.write("LOGIN");
    res.end();
  }
});

function startServer() {
  server.listen(port, hostname, function () {
    console.log("server is running on localhost:3000");
  });
}

module.exports.startServer = startServer;
