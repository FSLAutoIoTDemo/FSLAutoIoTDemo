function BDFleet() {}

inherit(BDFleet, Fleet), BDFleet.prototype.modifyBDEventHtmlText = function() {
    var a = String.fromCharCode(65 + this.eventVehicle.vehicle);
    $("#bigd-evt-id").text(a);
    var b = this.eventVehicle.time.match(/.{1,2}/g);
    $("#bigd-evt-time").text(b[0] + ":" + b[1] + "." + b[2]), $("#bigd-evt-speed").text(this.eventVehicle.speed), 
    updateMap(this.eventVehicle.lat, this.eventVehicle.lng, !1);
}, BDFleet.prototype.requestBDEvent = function(a) {
    console.log("Requesting Event Information"), sockSendMessage(GLB.SOCKETBIGDEVREQ_S + a + GLB.SOCKETBIGDEVREQ_E);
}, BDFleet.prototype.modifyBDGforceGraph = function() {
    updateGforceData(this.gforce);
}, BDFleet.prototype.processSocketBIGD = function(a) {
    if ("Fleet Data" == a.packetType) this.updategForce(a.gforce), console.log("Fleet Data Received for BD Page"), 
    this.modifyBDGforceGraph(); else if ("Event Data" == a.packetType) {
        var b = new Vehicle();
        b.updateData(null, a.vehicle, a.speed, null, null, null, null, null, a.location.lat, a.location.lng, null, a.time), 
        this.eventVehicle = b, console.log("Event Data Received for BD Page"), this.modifyBDEventHtmlText();
    } else console.log("Unknown Packet received for BD Page");
};