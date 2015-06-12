function VDvehicle() {}

inherit(VDvehicle, Vehicle), Vehicle.prototype.modifyHtmlText = function() {
    $("#vd-Speed-speedtext").text(this.speed), $("#vd-xAccel-acceltext").text(this.fGax), 
    $("#vd-yAccel-acceltext").text(this.fGay), $("#vd-HR-hrtext").text(this.heart), 
    updateSpeedData(this.speed), updateAccelData(this.fGax, this.fGay);
}, Vehicle.prototype.modifyMap = function() {
    updateMap(this.lat, this.lng, !0);
}, Vehicle.prototype.modifyDriverImg = function() {
    $("#vd-DriverCam-img").attr("src", this.driverimg);
}, Vehicle.prototype.modifyRoadImg = function() {
    $("#vd-RoadCam-img").attr("src", this.roadimg);
}, Vehicle.prototype.processSocketVD = function(a) {
    a.vehicle != this.vehicle ? (console.log("### WARNING ####"), console.log("Data received for Vehicle: " + a.vehicle), 
    console.log("Page is expecting data from Vehicle: " + this.vehicle)) : "data" == a.info ? (this.updateData(a._id, a.vehicle, a.speed, "", a.heart, a.fGax, a.fGay, a.fGaz, a.lat, a.lng, a.insurance), 
    this.modifyHtmlText(), this.modifyMap(a.lng, a.lat), console.log("Data Received for VD Page")) : "image_road" == a.info ? (this.updateRoadImg(a.image), 
    this.modifyRoadImg(), console.log("Road Image Received for VD Page")) : "image_driver" == a.info ? (this.updateDriverImg(a.image), 
    this.modifyDriverImg(), console.log("Driver Image Received for VD Page")) : console.log("Unknown Packet received for VD Page");
};