const ws = require("ws");

let datec;

let ClientArray = new Array();

module.exports = (server) => {
    const wss = new ws.Server(server);
    
    setInterval(() => {
        let date = new Date();

        datec = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    }, 1000);

    wss.on("connection", (ws, req) => {
        let ip = req.connection.remoteAddress.substring(7);
        


        setInterval(() => {
            var userlist = "";

            for(var cnt_1 = 0 ; cnt_1 < ClientArray.length ; cnt_1++) {
                for(var cnt_2 = 0 ; cnt_2 < ClientArray[cnt_2] ; cnt_2++) {
                    console.log(cnt_1, cnt_2)
                }
            }
        }, 1000);

        ClientArray.push([ws, req]);

        console.log("[" + datec + "]" + ip + " 로 부터 연결요청");

        ws.on("message", (msg) => {
            console.log("[" + datec + "]" + ip + " 로부터 받은 메세지 : " + msg);
            BroadcastAll(msg, ip);
        });
        ws.on("error", (err) => {
            console.error("error : " + err);
        });
        ws.on("close", () => {
            console.log("[" + datec + "]" + ip + " 님이 퇴장하였습니다");
            BroadcastAll(" 님이 퇴장하였습니다");
        });
    });
}

function BroadcastAll (msg, ip) {
    for (var cnt=0; cnt < ClientArray.length; cnt++) {
        ClientArray[cnt][0].send("[" + datec + "]" + "(" + ip + ") : " + msg);
    }
}