function ALLFleet() {}

inherit(ALLFleet, Fleet), ALLFleet.prototype.updateDriverText = function(a) {
    updateText("#fleet-speed-data", this.vehicles[a].speed);
    var b = String.fromCharCode(65 + a);
    updateText("#fleet-vehicleId-data", b);
}, ALLFleet.prototype.updateRoadImg = function(a) {
    var b = this.vehicles[a].roadimg;
    b ? updateImg("#fleet-RoadCam-img", b) : (updateImg("#fleet-RoadCam-img", "imgs/fill.svg"), 
    console.log("No Vehicle Image Found for Vehicle:" + a));
}, ALLFleet.prototype.updateMapMarker = function(a) {
    this.vehicles[a].marker.updateMarkerPos(this.vehicles[a].lat, this.vehicles[a].lng);
    var b = String.fromCharCode(65 + a);
    "Red" == this.vehicles[a].onlineStatus ? this.vehicles[a].marker.updateIcon("Red", b) : "Amber" == this.vehicles[a].onlineStatus ? this.vehicles[a].marker.updateIcon("Orange", b) : "Green" == this.vehicles[a].onlineStatus ? this.vehicles[a].marker.updateIcon("Green", b) : this.vehicles[a].marker.updateIcon("Red", b), 
    mapsUpdateFleetMarkers(this.vehicles[a].marker, a);
}, ALLFleet.prototype.loadNewVehicle = function(a) {
    GLB.currVID = a, GLB.multiSocket[2].sockOpenReq = !0, GLB.multiSocket[2].sockAddrReq = GLB.SOCKROOT + GLB.SOCKETVEH[a], 
    open_multiWebsocket(), this.updateDriverText(GLB.currVID), this.updateRoadImg(GLB.currVID);
}, ALLFleet.prototype.updateNavMenu = function() {
    for (var a = 0; a < GLB.MaxVeh; a++) {
        var b = String.fromCharCode(65 + a), c = "#nav" + b;
        updateText(c, this.vehicles[a].lastSocketSec), c += "parent", this.vehicles[a].onlineStatus ? "Red" == this.vehicles[a].onlineStatus ? $(c).css("background-color", "Red") : "Amber" == this.vehicles[a].onlineStatus ? $(c).css("background-color", "Orange") : "Green" == this.vehicles[a].onlineStatus ? $(c).css("background-color", "Green") : $(c).css("background-color", "Red") : $(c).attr("background-color", "Red");
    }
}, ALLFleet.prototype.setFleetStatus = function(a) {
    for (var b = 0; b < GLB.MaxVeh; b++) this.vehicles[b].setStatus(a.vehicle[b].vStatus, a.vehicle[b].lastMsgTime);
}, ALLFleet.prototype.recentreMap = function() {
    for (var a = [], b = 0; b < GLB.MaxVeh; b++) {
        if (this.vehicles[b].lat) var c = new google.maps.LatLng(this.vehicles[b].lat, this.vehicles[b].lng); else var c = new google.maps.LatLng(GLB.DEFAULTLAT, GLB.DEFAULTLNG);
        a.push(c);
    }
    findMapBounds(a);
}, ALLFleet.prototype.processSocketFLEETdebug = function(a) {
    this.setFleetStatus(a), this.updateNavMenu();
}, ALLFleet.prototype.processSocketFLEETvehicle = function(a) {
    a.vehicle > 10 || a.vehicle < 0 ? (console.log("### WARNING ####"), console.log("Data received for Vehicle: " + a.vehicle), 
    console.log("Page is expecting data from Vehicle: " + this.vehicle)) : "data" == a.info ? (this.vehicles[a.vehicle].updateData(a._id, a.vehicle, a.speed, "", a.heart, a.fGax, a.fGay, a.fGaz, a.lat, a.lng, a.insurance), 
    this.vehicles[a.vehicle].vehicle == GLB.currVID && this.updateDriverText(GLB.currVID), 
    this.vehicles[a.vehicle].marker.updateMarkerPos(a.lat, a.lng), this.updateMapMarker(a.vehicle), 
    console.log("Data Received for Fleet Page")) : "image_road" == a.info ? (this.vehicles[a.vehicle].updateRoadImg(a.image), 
    this.vehicles[a.vehicle].vehicle == GLB.currVID && this.updateRoadImg(GLB.currVID), 
    console.log("Road Image Received for Fleet Page")) : "image_driver" == a.info ? (this.vehicles[a.vehicle].updateDriverImg(a.image), 
    console.log("Driver Image Received for Fleet Page")) : console.log("Unknown Packet received for VD Page");
};