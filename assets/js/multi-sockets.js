// Socket Functions for pages using multiple websockets

// Create a socket object for each requested socket
function configureMultiSockets(noSockets,_sockAddrReq,_sockID){
	
	// For number for sockets, create new socket object, initialised with socket address
	for(var i=0; i < noSockets; i++){
		// Create new socket object
		GLB.multiSocket[i] = new SocketOptions(null,null,false,false);
		// Set addresses of sockets, and set open request flag
		GLB.multiSocket[i].sockAddrReq = _sockAddrReq[i];
		GLB.multiSocket[i].sockOpenReq = true;
		// Set ID of sockets
		GLB.multiSocket[i].sockID = _sockID[i];
	}

	// Initialise sockets
	open_multiWebsocket();
}

// Initialise sockets
// --> socketID - Array of 
function open_multiWebsocket(){
	// Determine number of websockets requested & create new sockets
	for (var i=0; i < GLB.multiSocket.length; i++){

		// If this socket object has a request to open a socket
		if(GLB.multiSocket[i].sockOpenReq == true){
			// Check to see if socket is already open
			if(GLB.multiSocket[i].sockStatus == true){
				// Close the socket
				GLB.multiSocket[i].socket.close();
			}
			// Assume socket is closed & wants to be opened
			else{
				console.log("Opening new socket for VID=" + i);
				// Create new websocket
				GLB.multiSocket[i].socket = new WebSocket(GLB.multiSocket[i].sockAddrReq);
				
				// Update Socket Option object, now socket request has been made
				GLB.multiSocket[i].sockAddr = GLB.multiSocket[i].sockAddrReq;
				GLB.multiSocket[i].sockOpenReq = false;


				console.log('Sock Init - Websocket Initialising:' + GLB.multiSocket[i].sockID);
				console.log('Sock Init - Socket Address:' + GLB.multiSocket[i].sockAddr);

				// Store current socket index
				var sockIdx = i;

				// Bind socket events to functions
				GLB.multiSocket[i].socket.onopen = function(evt) { multiSockOnOpen(evt,sockIdx) }; 
				GLB.multiSocket[i].socket.onclose = function(evt) { multiSockOnClose(evt,sockIdx) }; 
				GLB.multiSocket[i].socket.onmessage = function(evt) { multiSockOnMessage(evt,sockIdx) };
				GLB.multiSocket[i].socket.onerror = function(evt) { multiSockOnError(evt,sockIdx) };
			}
		}
	}
}



function multiSockOnOpen(evt,idx){ 

	console.log("Sock Open - Connected to websocket: " + evt.currentTarget.url);

	// Set socket status to open
	GLB.multiSocket[idx].sockStatus = true;

	if(evt.currentTarget.url== (GLB.SOCKROOT + GLB.SOCKETSTRESS))
	{
		// Send request for map data
		GLB.sock.send(GLB.SOCKETSTRESSREQ);
	}
	else if (evt.currentTarget.url==(GLB.SOCKROOT + GLB.SOCKETBIGD))
	{
		// Send request for graph data
		GLB.sock.send(GLB.SOCKETBIGDFLEETREQ);	
	}

	// Other sockets are push only (i.e. don't need requests)
};


// On closing a socket...
function multiSockOnClose(evt,idx) {
	if(evt)
		console.log("Sock Close - Websocket Connection closed: " + evt.currentTarget.url);

	// Set socket status to open
	GLB.multiSocket[idx].sockStatus = false;

	// Callback to open any sockets with pending open request
	// --> i.e. socket.close may have been from socket looking to change addr
	open_multiWebsocket();
};

function multiSockOnError(evt){
	console.log("Sock Error - Websocket error detected: " + evt.currentTarget.url);
};


// On receiving new data, parse the packet and call approp function
//GLB.sock.onmessage = function(dataRawSOCK){
function multiSockOnMessage(dataRawSOCK){

	console.log('Sock OnMessage - Data received from socket: ' + dataRawSOCK.currentTarget.url);

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

	if(GLB.pgID == GLB.PGFLEET){
		if(dataRawSOCK.currentTarget.url == (GLB.SOCKROOT + GLB.SOCKETVEHALL))
			// If from the all vehicles feed, process vehicle data
			GLB.fleet.processSocketFLEETvehicle(dataJsonSOCK);		
		else if(dataRawSOCK.currentTarget.url == (GLB.SOCKROOT + GLB.SOCKETDEBUG))
			// If from the debug feed, process fleet data
			//GLB.fleet.processSocketFLEET(dataJsonSOCK);		
			console.log("Debug Message Ready for processing");
		else
			// If from the individual vehicle feed, process vehicle data
			GLB.fleet.processSocketFLEETvehicle(dataJsonSOCK);		
	}
		

};

function multiSockSendMessage(data){
	GLB.sock.send(data);
}