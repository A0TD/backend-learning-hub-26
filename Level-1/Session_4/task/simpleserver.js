const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Request method: " + req.method);
  console.log("Request url: " + req.url);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to Cairo Metro Control - Line 3");
  } 
  else if (req.url === "/next-train") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    let date = new Date().toISOString();
    res.end("The next train arrives at: " + date);
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Platform not found");
  }
});

server.listen(3000, () => console.log("server running"));
