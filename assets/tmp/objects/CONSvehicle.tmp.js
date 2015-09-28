function CONSvehicle() {}

inherit(CONSvehicle, Vehicle), CONSvehicle.prototype.modifyHtmlText = function() {
    $("#cons-Speed-speedtext").text(this.speed), $("#cons-Metric-speedtext").text(this.speed), 
    $("#cons-Metric-acceltext").text(this.acceleration), updateSpeedData(this.speed), 
    updateInsurGraphData(this.insurance);
}, CONSvehicle.prototype.modifyMap = function() {
    updateMap(this.lat, this.lng, !0);
}, CONSvehicle.prototype.modifyDriverImg = function() {
    $("#cons-DriverCam-img").attr("src", this.driverimg);
}, CONSvehicle.prototype.calcAccelProf = function(a) {
    500 > a ? this.acceleration = "Smooth" : a >= 400 && 800 > a ? this.acceleration = "Moderate" : this.acceleration = "Fast";
}, CONSvehicle.prototype.processSocketCONS = function(a) {
    a.vehicle != this.vehicle ? (console.log("### WARNING ####"), console.log("Data received for Vehicle: " + a.vehicle), 
    console.log("Page is expecting data from Vehicle: " + this.vehicle)) : "data" == a.info ? (this.calcAccelProf(a.insurance), 
    this.updateData(a._id, a.vehicle, a.speed, "", a.heart, a.fGax, a.fGay, a.fGaz, a.lat, a.lng, a.insurance), 
    this.modifyHtmlText(), this.modifyMap(a.lng, a.lat), 1 == GLB.initDataFlg && (this.updateDriverImg(a.imageDriver), 
    this.modifyDriverImg(), GLB.initDataFlg = !1), console.log("Data Received for CONS Page")) : "image_road" == a.info ? console.log("Road Image Received. Do Nothing") : "image_driver" == a.info ? (this.updateDriverImg(a.image), 
    this.modifyDriverImg(), console.log("Driver Image Received for CONS Page")) : console.log("Unknown Packet received for CONS Page");
};