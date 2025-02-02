let http = require("http");
let url = require("url");
let dt = require("./modules/utils");
let text = require("./lang/en/en");

http.createServer(function (req, res) {

    const parsedUrl = url.parse(req.url, true);

    const propertyUrl = parsedUrl.query;
    const name = propertyUrl.name || "Guest";

    if (parsedUrl.pathname === "/COMP4537/labs/3/getDate/") {
        const message = text.msg.greeting.replace("%1", name);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(text.msg.open_tag + message + dt.getDate() + text.msg.close_tag);
        res.end();
    }

    

    
}).listen(8888);

console.log("Listening on 8888");