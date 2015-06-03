function init_websocket() {
    sock = new WebSocket(socketaddr);
}

var socketaddr = "ws://fslautoiotdemobackend.mybluemix.net/ws/car0", sock, pageID = "";

sock.onopen = function() {
    console.log("Connected websocket"), socket.send(pageID);
}, sock.onclose = function() {
    console.log("Connection closed");
}, sock.onerror = function() {
    console.log("Websocket error detected");
}, sock.onmessage = function(a) {
    switch (msg = JSON.parse(a.data), console.log(msg), msg.type) {
      case "vdData":
        update_vdData(msg);
        break;

      case "vdImg":
        update_vdImg(msg);
    }
};