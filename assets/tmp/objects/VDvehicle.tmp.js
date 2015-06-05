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
};