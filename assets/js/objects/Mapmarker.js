//######### MAP MARKER OBJECT & PROTOTYPES #############################
//
//######################################################################
function MarkerOptions(_lat,_lng,_valid,_icon,_title){
	
	// Map Marker object
	this.markerObj = null;

	// LatLng Object
	this.latlng = new google.maps.LatLng(_lat,_lng);

	// Valid - should this marker be shown
	this.valid = _valid;

	// Colour of the marker
	this.icon = _icon;

	// Title of the marker
	this.title = _title;

	this.carRoute = null;
}

MarkerOptions.prototype.updateMarkerPos = function(_lat,_lng){
	this.latlng = new google.maps.LatLng(_lat,_lng);
}

MarkerOptions.prototype.updateIcon = function(colour,letter){
	if(colour=="Red")
		this.icon = "imgs/icons/red_Marker" + letter + ".png";
	if(colour=="Orange")
		this.icon = "imgs/icons/orange_Marker" + letter + ".png";
	if(colour=="Green")
		this.icon = "imgs/icons/green_Marker" + letter + ".png";
}
