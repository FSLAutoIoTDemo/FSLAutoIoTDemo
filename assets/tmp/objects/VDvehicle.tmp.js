function VDvehicle() {}

inherit(VDvehicle, Vehicle), Vehicle.prototype.modifyVdHtmlText = function() {
    $("#vd-Speed-speedtext").text(this.speed), $("#vd-Accel-acceltext").text(this.fGax), 
    $("#vd-Accel-acceltext").text(this.fGay), $("#vd-Accel-acceltext").text(this.fGaz), 
    $("#vd-HR-hrtext").text(this.heart);
}, Vehicle.prototype.modifyVdMap = function() {
    updateMap(this.lat, this.lng);
}, Vehicle.prototype.modifyVdDriverImg = function() {
    $("#vd-DriverCam-img").attr("src", this.driverimg);
}, Vehicle.prototype.modifyVdRoadImg = function() {
    $("#vd-RoadCam-img").attr("src", this.roadimg);
};