function Fleet() {
    this.vehicles = [];
}

Fleet.prototype.updateStessData = function(a, b) {
    this.locations = [], this.mostStressful = [];
    for (var c = 0; c < a.length; c++) this.locations[c] = new google.maps.LatLng(a[c].lat, a[c].lng);
    this.mostStressful = b;
}, Fleet.prototype.updategForce = function(a) {
    this.gforce = a;
}, Fleet.prototype.updateEventVehicle = function(a) {
    this.eventVehicle = a;
};