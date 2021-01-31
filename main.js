const http = require("http");
const fs = require("fs")
const websocket = require("./src/socket");



const app = http.createServer((req, res) => {
    let url = req.url;

    if (url == "/") {
      url = "/index.html";
    }

    fs.readFile("./public" + url, (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(404);
        } else {
            res.writeHead(200);
            res.write(data.toString());
        }
        res.end();
    })
    
});

try {
    websocket({port : 81});
    console.log("WsServer Successfully Init!");
} catch (e) {
    console.error(e);
}

try {
    app.listen(80);
    console.log("WebServer Successfully Init!");
} catch (e) {
    console.error(e);
}