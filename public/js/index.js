const wss = new WebSocket("ws://1.241.111.101:81");

var textarea = "";

    wss.onopen = (event) => {
        wss.send("님이 참가했습니다");
    }
    
    wss.onmessage = (event) => {
        if (event.data.toString().startsWith("ws0")) {
            PrintChat(event.data.substring(3));
        } else if (event.data.toString().startsWith("ws1")) {
            PrintOnline(event.data.substring(3));
        }
    }
    
    function keydown() {
        if (window.event.keyCode == 13) {
            if(document.getElementById("chat_input_area").value.length == 0) {
                return;
            }
            let msg = document.getElementById("chat_input_area").value;
            document.getElementById("chat_input_area").value = null;
            wss.send(msg);
        }
    }

    function PrintChat(text) {
        
        textarea += text + "\r\n";
        document.getElementById("chat_output_area").value = textarea;
        document.getElementById("chat_output_area").scrollTop = document.getElementById("chat_output_area").scrollHeight;
    }

    function PrintOnline(userlist) {
        document.getElementById("chat_online").value = userlist;
    }