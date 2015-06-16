function SocketOptions(sock,addr,status,openReq){
	
	// Socket Object
	this.socket = sock;

	// Socket address
	this.sockAddr = addr;

	// Socket ID
	this.sockID = null;

	// Socket status - false=closed, true=open
	this.sockStatus = status;

	// Request to open socket at requested address
	this.sockOpenReq = openReq;

	// Requested address to be opened
	this.sockAddrReq = null;
}

// Update the VD Page Map with Vehicle object data
SocketOptions.prototype.latestStatus = function(){
	console.log( this.sockAddr + " status is " + this.sockStatus);
}