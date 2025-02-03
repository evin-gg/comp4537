const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const dt = require("./modules/utils");
const text = require("./lang/en/en");

const empty = "";
const readPath = "/COMP4537/labs/3/readFile/file.txt";
const writePath = "/COMP4537/labs/3/writeFile/";
const datePath = "/COMP4537/labs/3/getDate/";
const content_type = "Content-Type";
const utf8 = "utf8";
const text_plain = "text/plain";
const text_html = "text/html";
const delimiter = "%1";
const fname = "file.txt";
const newline = "\n";
const filepath = path.join(__dirname, fname);

// responsible for readFile page
class ReadingPage {

    readRespond(res) {
        fs.readFile(filepath, utf8, (err, data) => {
            res.writeHead(200, { content_type: text_plain });
            res.end(data || empty);
        });
    }
}

// responsible for writeFile page
class WritingPage {

    modifyFile(text) {
        fs.appendFile(filepath, text, (err) => {
            if (err) throw err;
        });
    }
}

// responsible for getDate page
class DatePage {
    constructor(req) {
        this.parsedUrl = url.parse(req.url, true);
        this.propertyUrl = this.parsedUrl.query;
    }
    
    renderText() {
        const name = this.propertyUrl.name || text.msg.undefined_user;
        const message = text.msg.greeting.replace(delimiter, name);
        const displayText = text.msg.open_tag + message + dt.getDate() + text.msg.close_tag;

        return displayText;
    }
}

// responsible for handling server related actions
class Server {

    write404(res) {
        res.writeHead(404, {content_type: text_html});
        res.end(text.msg.msg404);
    }

    startServer() {
        http.createServer((req, res) => {

            const parsedUrl = url.parse(req.url, true);
            const propertyUrl = parsedUrl.query;
            
        
            if (parsedUrl.pathname === datePath) {
                const datePage = new DatePage(req);
                res.writeHead(200, {content_type: text_html});
                res.write(datePage.renderText());
                res.end();
            }
        
            else if (parsedUrl.pathname === writePath) {
                const writingPage = new WritingPage();
                const text = propertyUrl.text;
        
                if (text) {
                    writingPage.modifyFile(text + newline);
                    res.end();
                }
            }
        
            else if (parsedUrl.pathname === readPath) {
                const readingPage = new ReadingPage();
                readingPage.readRespond(res);
            }
        
            else {
                this.write404(res);
            }
        }).listen(8888);
    }
}

const server = new Server();
server.startServer();