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
	GLB.sock.onclose = function(evt) { sockOnClose(evt, socketID, address) }; 
	GLB.sock.onmessage = function(evt) { sockOnMessage(evt) };
	GLB.sock.onerror = function(evt) { sockOnError(evt, socketID, address) };

}


function sockOnOpen(evt){ 

	console.log("Sock Open - Connected to websocket: " + GLB.currSOCK);

	if(GLB.currSOCK==GLB.SOCKETSTRESS)
	{
		// Send request for map data
		GLB.sock.send(GLB.SOCKETSTRESSREQ);
	}
	else if (GLB.currSOCK==GLB.SOCKETBIGD)
	{
		// Send request for graph data
		GLB.sock.send(GLB.SOCKETBIGDFLEETREQ);	
	}

	// Other sockets are push only (i.e. don't need requests)
};

function sockOnClose(evt, socketID, address) {
	console.log("Sock Close - Websocket Connection closed: " + GLB.currSOCK);
	GLB.sock = null;		// Terminate object

	// Attempt to create new socket connection (i.e. persistant socket)
	init_websocket(socketID, address);
};

function sockOnError(evt){
	console.log("Sock Error - Websocket error detected: " + GLB.currSOCK);

	// Attempt to create new socket connection (i.e. persistant socket)
	init_websocket(socketID, address);
};


// On receiving new data, parse the packet and call approp function
//GLB.sock.onmessage = function(dataRawSOCK){
function sockOnMessage(dataRawSOCK){

	console.log('Sock OnMessage - Data received from socket: ' + GLB.currSOCK);

	// Clearing watchdog
	watchdogClear();
	console.log('Clearing watchog');

	// JSON parsed data received from socket
	var dataJsonSOCK = JSON.parse(dataRawSOCK.data);
		
	console.log('Sock OnMessage - Object Data follows...');
	console.log(dataJsonSOCK);

	// Determine from Page ID, which processing function should be called
	if(GLB.pgID == GLB.PGVD)
		GLB.vehicle.processSocketVD(dataJsonSOCK);

	if(GLB.pgID == GLB.PGCONS)
		GLB.vehicle.processSocketCONS(dataJsonSOCK);

	if(GLB.pgID == GLB.PGSTRESS)
		GLB.fleet.processSocketStress(dataJsonSOCK);

	if(GLB.pgID == GLB.PGBIGD)
		GLB.fleet.processSocketBIGD(dataJsonSOCK);

};

function sockSendMessage(data){
	GLB.sock.send(data);
}