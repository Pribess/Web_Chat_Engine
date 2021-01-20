const ws = require("ws");

let ClientArray = new Array();

module.exports = (server) => {
    const wss = new ws.Server(server);
    
    wss.on("connection", (ws, req) => {
        let ip = req.connection.remoteAddress;
        
        ClientArray.push(ws);

        console.log(ip + "로 부터 연결요청");

        ws.on("message", (msg) => {
            console.log(ip + " 로부터 받은 메세지 : " + msg);
            BroadcastAll(msg, ip);
        });
        ws.on("error", (err) => {
            console.error("error : " + err);
        });
        ws.on("close", () => {
            console.log(ip + "님이 퇴장하였습니다");
        });
    });
}

function BroadcastAll (msg, ip) {
    for (var cnt=0; cnt < ClientArray.length; cnt++) {
        ClientArray[cnt].send("(" + ip.substring(7) + ") : " + msg);
    }
}