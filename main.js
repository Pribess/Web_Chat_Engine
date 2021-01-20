const http = require("http");
const fs = require("fs")
const websocket = require("./src/socket");

const date = new Date();

const app = http.createServer((req, res) => {
    let url = req.url;

    if (url == "/") {
        url = "/index.html";
    }

    fs.readFile("./content" + url, (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(404);
        } else {
            res.writeHead(200);
            res.write(data.toString());
        }
        res.end();
    })
    
    console.log("Sent to " + req.connection.remoteAddress + "  " + date);
});

websocket({port : 81});
app.listen(80);