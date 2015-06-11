function CONSvehicle() {}

inherit(CONSvehicle, Vehicle), CONSvehicle.prototype.modifyVdHtmlText = function() {
    $("#cons-Speed-speedtext").text(this.speed), $("#cons-Metric-speedtext").text(this.speed), 
    $("#cons-Metric-acceltext").text(this.speed), updateSpeedData(this.speed);
}, CONSvehicle.prototype.modifyVdMap = function() {
    updateMap(this.lat, this.lng, !0);
}, CONSvehicle.prototype.modifyVdDriverImg = function() {
    $("#cons-DriverCam-img").attr("src", this.driverimg);
}, CONSvehicle.prototype.processSocketVD = function(a) {
    a.vehicle != this.vehicle ? (console.log("### WARNING ####"), console.log("Data received for Vehicle: " + a.vehicle), 
    console.log("Page is expecting data from Vehicle: " + this.vehicle)) : "data" == a.info ? (this.updateData(a._id, a.vehicle, a.speed, "", a.heart, a.fGax, a.fGay, a.fGaz, a.lat, a.lng, a.insurance), 
    this.modifyVdHtmlText(), this.modifyVdMap(a.lng, a.lat), console.log("Data Received for CONS Page")) : "image_road" == a.info ? console.log("Road Image Received. Do Nothing") : "image_driver" == a.info ? (this.updateDriverImg(a.image), 
    this.modifyVdDriverImg(), console.log("Driver Image Received for CONS Page")) : console.log("Unknown Packet received for CONS Page");
};