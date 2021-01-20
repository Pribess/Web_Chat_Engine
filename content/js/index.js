const wss = new WebSocket("ws://1.241.111.101:81");
    
let textarea;

    wss.onopen = (event) => {
        wss.send("님이 참가했습니다");
    }
    
    wss.onmessage = (event) => {
        addText(event.data);
    }
    
    function keydown() {
        if (window.event.keyCode == 13) {
            let msg = document.getElementById("chat_input_area").value;
            document.getElementById("chat_input_area").value = null;
            wss.send(msg);
        }
    }

    function addText(text) {
        textarea += text + "\r\n";
        document.getElementById("chat_output_area").value = textarea;
        document.getElementById("chat_output_area").scrollTop = document.getElementById("chat_output_area").scrollHeight;
    }
