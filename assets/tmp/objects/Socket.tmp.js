function SocketOptions(a, b, c, d) {
    this.socket = a, this.sockAddr = b, this.sockID = null, this.sockStatus = c, this.sockOpenReq = d, 
    this.sockAddrReq = null;
}

SocketOptions.prototype.latestStatus = function() {
    console.log(this.sockAddr + " status is " + this.sockStatus);
};