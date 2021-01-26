const ws = require("ws");


let ClientArray = new Array();


  module.exports = (server) => {
    const wss = new ws.Server(server);
    


    wss.on("connection", (ws, req) => {
        let ip = req.connection.remoteAddress.substring(7);
        

        
        
        ClientArray.push([ws, ip]);

        console.log("[" + GetTime() + "]" + ip + " 로 부터 연결요청");

        ws.on("message", (msg) => {
            if (msg.startsWith("ws2")) {
                console.log(msg);
            }
            console.log("[" + GetTime() + "]" + ip + " 로부터 받은 메세지 : " + msg);
            SendUserlist();
            BroadcastAll(msg, ip);
        });
        ws.on("error", (err) => {
            console.error("error : " + err);
        });
        ws.on("close", () => {
            console.log("[" + GetTime() + "]" + ip + " 님이 퇴장하였습니다");
            BroadcastAll(" 님이 퇴장하였습니다", ip);
            ClientArray.splice(ClientArray.indexOf([ws, req]), 1);
            SendUserlist();
        });
    });
}

function BroadcastAll (msg, ip) {
    for (var cnt=0; cnt < ClientArray.length; cnt++) {
        ClientArray[cnt][0].send("ws0[" + GetTime() + "]" + "(" + ip + ") : " + msg);
    }
}

function GetTime() {
    let date = new Date();

    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function SendUserlist() {
    var userlist = "";
        
        for (var cnt=0; cnt < ClientArray.length; cnt++) {
            userlist += ClientArray[cnt][1] + "\r\n";
        }

        for (var cnt=0; cnt < ClientArray.length; cnt++) {
            ClientArray[cnt][0].send("ws1" + userlist);
        }
}