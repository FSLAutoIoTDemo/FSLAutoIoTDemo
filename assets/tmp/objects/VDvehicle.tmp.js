function VDvehicle() {}

inherit(VDvehicle, Vehicle), Vehicle.prototype.modifyVdHtmlText = function() {
    $("#vd-Speed-speedtext").text(this.speed), $("#vd-xAccel-acceltext").text(this.fGax), 
    $("#vd-yAccel-acceltext").text(this.fGay), $("#vd-HR-hrtext").text(this.heart), 
    updateSpeedData(this.speed), updateAccelData(this.fGax, this.fGay);
}, Vehicle.prototype.modifyVdMap = function() {
    updateMap(this.lat, this.lng);
}, Vehicle.prototype.modifyVdDriverImg = function() {
    $("#vd-DriverCam-img").attr("src", this.driverimg);
}, Vehicle.prototype.modifyVdRoadImg = function() {
    $("#vd-RoadCam-img").attr("src", this.roadimg);
}, Vehicle.prototype.processSocketVD = function(a) {
    a.vehicle != this.vehicle ? (console.log("### WARNING ####"), console.log("Data received for Vehicle: " + a.vehicle), 
    console.log("Page is expecting data from Vehicle: " + this.vehicle)) : "data" == a.info ? (this.updateData(a._id, a.vehicle, a.speed, "", a.heart, a.fGax, a.fGay, a.fGaz, a.lat, a.lng, a.insurance), 
    this.modifyVdHtmlText(), console.log("Data Received for VD Page")) : "image_road" == a.info ? (this.updateRoadImg(a.image), 
    this.modifyVdRoadImg(), console.log("Road Image Received for VD Page")) : "image_driver" == a.info ? (this.updateDriverImg(a.image), 
    this.modifyVdDriverImg(), console.log("Driver Image Received for VD Page")) : console.log("Unknown Packet received for VD Page");
};