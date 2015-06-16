function configureMultiSockets(a, b, c) {
    for (var d = 0; a > d; d++) GLB.multiSocket[d] = new SocketOptions(null, null, !1, !1), 
    GLB.multiSocket[d].sockAddrReq = b[d], GLB.multiSocket[d].sockOpenReq = !0, GLB.multiSocket[d].sockID = c[d];
    open_multiWebsocket();
}

function open_multiWebsocket() {
    for (var a = 0; a < GLB.multiSocket.length; a++) 1 == GLB.multiSocket[a].sockOpenReq && (1 == GLB.multiSocket[a].sockStatus ? GLB.multiSocket[a].socket.close() : (GLB.multiSocket[a].socket = new WebSocket(GLB.multiSocket[a].sockAddrReq), 
    GLB.multiSocket[a].sockAddr = GLB.multiSocket[a].sockAddrReq, GLB.multiSocket[a].sockOpenReq = !1, 
    console.log("Sock Init - Websocket Initialising:" + GLB.multiSocket[a].sockID), 
    console.log("Sock Init - Socket Address:" + GLB.multiSocket[a].sockAddr), GLB.multiSocket[a].socket.onopen = function(a) {
        multiSockOnOpen(a);
    }, GLB.multiSocket[a].socket.onclose = function(a) {
        multiSockOnClose(a);
    }, GLB.multiSocket[a].socket.onmessage = function(a) {
        multiSockOnMessage(a);
    }, GLB.multiSocket[a].socket.onerror = function(a) {
        multiSockOnError(a);
    }));
}

function multiSockOnOpen(a) {
    console.log("Sock Open - Connected to websocket: " + a.currentTarget.url), a.currentTarget.url == GLB.SOCKROOT + GLB.SOCKETSTRESS ? GLB.sock.send(GLB.SOCKETSTRESSREQ) : a.currentTarget.url == GLB.SOCKROOT + GLB.SOCKETBIGD && GLB.sock.send(GLB.SOCKETBIGDFLEETREQ);
}

function multiSockOnClose(a) {
    console.log("Sock Close - Websocket Connection closed: " + a.currentTarget.url), 
    open_multiWebsocket();
}

function multiSockOnError(a) {
    console.log("Sock Error - Websocket error detected: " + a.currentTarget.url);
}

function multiSockOnMessage(a) {
    console.log("Sock OnMessage - Data received from socket: " + a.currentTarget.url), 
    watchdogClear(), console.log("Clearing watchog");
    var b = JSON.parse(a.data);
    console.log("Sock OnMessage - Object Data follows..."), console.log(b), GLB.pgID == GLB.PGVD && GLB.vehicle.processSocketVD(b), 
    GLB.pgID == GLB.PGCONS && GLB.vehicle.processSocketCONS(b), GLB.pgID == GLB.PGSTRESS && GLB.fleet.processSocketStress(b), 
    GLB.pgID == GLB.PGBIGD && GLB.fleet.processSocketBIGD(b), GLB.pgID == GLB.PGFLEET && (a.currentTarget.url == GLB.SOCKROOT + GLB.SOCKETVEHALL ? GLB.fleet.processSocketFLEETvehicle(b) : a.currentTarget.url == GLB.SOCKROOT + GLB.SOCKETDEBUG ? console.log("Debug Message Ready for processing") : GLB.fleet.processSocketFLEETvehicle(b));
}

function multiSockSendMessage(a) {
    GLB.sock.send(a);
}