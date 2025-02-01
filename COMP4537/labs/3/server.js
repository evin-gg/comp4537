let http = require("http");

let dt = require("./modules/utils");

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write("Now: " + dt.Date());
    res.write("Now: ");
    res.end();
}).listen(8888);