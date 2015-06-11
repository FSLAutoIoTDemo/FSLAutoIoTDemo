//######### FLEET obj - Parent Obj ###########################/
// Create object that contains data for all vehicles in the fleet
function Fleet(){
	
	// Top stress vehicle locations, contains
	// {Google Maps LatLng object}
	var locations = [];
	
	// Most stressful streets, contains:
	// {"streetName", "camPic", "heartDelta"}
	var mostStressful = [];

	// Array of fleet g-forces, 50 points of {gLat, gLng}
	var gforce = [];

	// Stores the vehicle object where the event took place
	var eventVehicle = null;
}


//######### FLEET obj - PROTOTYPES ###########################/

// Prototype function to update new locations & top stress streets
Fleet.prototype.updateStessData = function(_locations, _mostStressful){
	
	// Delete existing arrays (resets length)
	this.locations = [];
	this.mostStressful = [];

	// Update with new data
	for (var i=0;i<_locations.length; i++){
		this.locations[i] = new google.maps.LatLng(_locations[i].lat, _locations[i].lng);
	}

	this.mostStressful = _mostStressful;
}

// Prototype function to update new gforce for fleet
Fleet.prototype.updategForce = function(_gforce){
	
	this.gforce = _gforce;
}

// Prototype function to update the vehicle information for the event
Fleet.prototype.updateEventVehicle = function(_vehicle){
	
	this.eventVehicle = _vehicle;
}