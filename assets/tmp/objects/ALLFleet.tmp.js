function ALLFleet() {}

inherit(ALLFleet, Fleet), ALLFleet.prototype.updateDriverText = function(a) {
    updateText("#fleet-speed-data", this.vehicles[a].speed);
    var b = String.fromCharCode(65 + a);
    updateText("#fleet-vehicleId-data", b);
}, ALLFleet.prototype.updateDriverImg = function(a) {
    var b = this.vehicles[a].driverimg;
    b ? updateImg("#fleet-RoadCam-img", b) : (updateImg("#fleet-RoadCam-img", "imgs/fill.svg"), 
    console.log("No Vehicle Image Found for Vehicle:" + a));
}, ALLFleet.prototype.updateMapMarker = function(a) {
    this.vehicles[a].marker.updateMarkerPos(this.vehicles[a].lat, this.vehicles[a].lng);
    var b = String.fromCharCode(65 + a);
    this.vehicles[a].marker.updateIcon("Green", b), mapsUpdateFleetMarkers(this.vehicles[a].marker, a);
}, ALLFleet.prototype.loadNewVehicle = function(a) {
    GLB.currVID = a, this.updateDriverText(GLB.currVID), this.updateDriverImg(GLB.currVID);
}, ALLFleet.prototype.processSocketFLEETvehicle = function(a) {
    a.vehicle > 10 || a.vehicle < 0 ? (console.log("### WARNING ####"), console.log("Data received for Vehicle: " + a.vehicle), 
    console.log("Page is expecting data from Vehicle: " + this.vehicle)) : "data" == a.info ? (this.vehicles[a.vehicle].updateData(a._id, a.vehicle, a.speed, "", a.heart, a.fGax, a.fGay, a.fGaz, a.lat, a.lng, a.insurance), 
    this.vehicles[a.vehicle].vehicle == GLB.currVID && (this.updateDriverText(GLB.currVID), 
    this.vehicles[a.vehicle].marker.updateMarkerPos(a.lat, a.lng), this.updateMapMarker(GLB.currVID)), 
    console.log("Data Received for VD Page")) : "image_road" == a.info ? (this.vehicles[a.vehicle].updateRoadImg(a.image), 
    this.vehicles[a.vehicle].vehicle == GLB.currVID && this.updateDriverImg(GLB.currVID), 
    console.log("Road Image Received for VD Page")) : "image_driver" == a.info ? (this.vehicles[a.vehicle].updateDriverImg(a.image), 
    console.log("Driver Image Received for VD Page")) : console.log("Unknown Packet received for VD Page");
};