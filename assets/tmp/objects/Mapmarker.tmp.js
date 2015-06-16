function MarkerOptions(a, b, c, d, e) {
    this.markerObj = null, this.latlng = new google.maps.LatLng(a, b), this.valid = c, 
    this.icon = d, this.title = e, this.carRoute = null;
}

MarkerOptions.prototype.updateMarkerPos = function(a, b) {
    this.latlng = new google.maps.LatLng(a, b);
}, MarkerOptions.prototype.updateIcon = function(a, b) {
    "Red" == a && (this.icon = "imgs/icons/red_Marker" + b + ".png"), "Orange" == a && (this.icon = "imgs/icons/orange_Marker" + b + ".png"), 
    "Green" == a && (this.icon = "imgs/icons/green_Marker" + b + ".png");
};