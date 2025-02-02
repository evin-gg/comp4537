let http = require("http");
let url = require("url");

let adr = ''

let dt = require("./modules/utils");
let text = require("./lang/en/en");

http.createServer(function (req, res) {

    const query = url.parse(req.url, true).query;
    const name = query.name || "Guest";

    res.writeHead(200, {'Content-Type': 'text/html'});

    const message = text.msg.greeting.replace("%1", name);
    res.write(text.msg.open_tag + message + dt.getDate() + text.msg.close_tag);
    res.end();
}).listen(8888);

console.log("Listening on 8888");