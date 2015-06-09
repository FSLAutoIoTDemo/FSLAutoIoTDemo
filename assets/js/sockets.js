// OPEN SOCKET, pass in addr / VID / 

// PARSE FUNCTION -> use case on ID?? to then open apprope page function
// PAGE FUNCTION -> attached to page object, applys data and configures anything else.

function init_websocket(socketID, address){

	// Create new websocket
	GLB.sock = new WebSocket(address);
	
	// Save which socket is being used
	GLB.currSOCK = socketID;

	console.log('Sock Init - Websocket Initialising:' + GLB.currSOCK);
	console.log('Sock Init - Socket Address:' + address);

	// Bind socket events to functions
	GLB.sock.onopen = function(evt) { sockOnOpen(evt) }; 
	GLB.sock.onclose = function(evt) { sockOnClose(evt) }; 
	GLB.sock.onmessage = function(evt) { sockOnMessage(evt) };
	GLB.sock.onerror = function(evt) { sockOnError(evt) };

}


function sockOnOpen(evt){ 

	console.log("Sock Open - Connected to websocket: " + GLB.currSOCK);

	if(GLB.currSOCK==GLB.SOCKETSTRESS)
	{
		// Send request for map data
		GLB.socket.send(GLB.SOCKETSTRESSREQ);
	}
	else if (GLB.currSOCK==GLB.SOCKETBIGD)
	{
		// Send request for graph data
		GLB.socket.send(GLB.SOCKETBIGDFLEETREQ);	
	}

	// Other sockets are push only (i.e. don't need requests)
};

function sockOnClose(evt) {
	console.log("Sock Close - Websocket Connection closed: " + GLB.currSOCK);
	GLB.sock = null;		// Terminate object
};

function sockOnError(evt){
	console.log("Sock Error - Websocket error detected: " + GLB.currSOCK);
};


// On receiving new data, parse the packet and call approp function
//GLB.sock.onmessage = function(dataRawSOCK){
function sockOnMessage(dataRawSOCK){

	console.log('Sock OnMessage - Data received from socket: ' + GLB.currSOCK);

	// JSON parsed data received from socket
	var dataJsonSOCK = JSON.parse(dataRawSOCK.data);
		
	console.log('Sock OnMessage - Object Data follows...');
	console.log(dataJsonSOCK);

	// Determine from Page ID, which processing function should be called
	if(pgID = GLB.PGVD)
		GLB.vehicle.processSocketVD(dataJsonSOCK);
	if(pgID = GLB.PGCONS){}
//		processSocketCONS(dataJsonSOCK);
	if(pgID = GLB.PGSTRESS){}
//		processSocketSTRESS(dataJsonSOCK);
	if(pgID = GLB.PGBIGD){}
//		processSocketBIGD(dataJsonSOCK);
};
