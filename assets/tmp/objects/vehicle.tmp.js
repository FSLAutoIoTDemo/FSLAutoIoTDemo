function Vehicle() {
}

Vehicle.prototype.updateData = function(a, b, c, d, e, f, g, h, i, j, k) {
    this.id = a, this.vehicle = b, this.speed = c, this.accel = d, this.heart = e, this.fGax = f, 
    this.fGay = g, this.fGaz = h, this.lat = i, this.lng = j, this.insurance = k;
}, Vehicle.prototype.updateDriverImg = function(a) {
    this.driverimg = GLB.IMGROOT + a + GLB.IMGAPPEND;
}, Vehicle.prototype.updateRoadImg = function(a) {
    this.roadimg = GLB.IMGROOT + a + GLB.IMGAPPEND;
}, Vehicle.prototype.getVehicle = function() {
    return this.vehicle;
}, Vehicle.prototype.setVehicle = function(a) {
    this.vehicle = a;
};