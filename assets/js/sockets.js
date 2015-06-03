var socketaddr  = "ws://fslautoiotdemobackend.mybluemix.net/ws/car0";
var sock;
var pageID = "";	// Variable used to identify the use case	  


function init_websocket(){

	// Create new websocket
	// ## I THINK I SHOULD PASS "PROTOCOL" WITH THIS STATEMENT. IDENTIFIES WHICH WEBPAGE I'M OPENING THE SOCKET FROM
	sock = new WebSocket(socketaddr /*, pageID*/ );

}


sock.onopen = function(){ 
	console.log("Connected websocket");

	// Send the pageID to the server 
	// MAY NOT NEED IF DONE IN init_websocket
	socket.send(pageID);
};

sock.onclose = function() {console.log("Connection closed");};
sock.onerror = function(){console.log("Websocket error detected");};

// On receiving new data, parse the packet and call approp function
sock.onmessage = function(evt){

	msg = JSON.parse(evt.data);
	console.log(msg);

	switch(msg.type){
		case "vdData":
			update_vdData(msg);
			break;
		case "vdImg":
			update_vdImg(msg);
			break;
	}
};