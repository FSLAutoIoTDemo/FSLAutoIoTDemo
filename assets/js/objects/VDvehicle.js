//######### VDVEHICLE obj - Child Obj of VEHICLE ###########################/
// Create child element of Vehicle, specifically for Vehicle Dashboard Page
function VDvehicle(){}

inherit(VDvehicle, Vehicle);

// Update the VD Page HMTL text with Vehicle object data
Vehicle.prototype.modifyVdHtmlText = function(){
	
	$('#vd-Speed-speedtext').text(this.speed);		// Speed
	$('#vd-Accel-acceltext').text(this.fGax);		// X-Accel
	$('#vd-Accel-acceltext').text(this.fGay);		// Y-Accel
	$('#vd-Accel-acceltext').text(this.fGaz);		// Z-Accel
	$('#vd-HR-hrtext').text(this.heart);			// Heart Rate
}

// Update the VD Page Map with Vehicle object data
Vehicle.prototype.modifyVdMap = function(){
	
	// CALL TO FUNCTION THAT UPDATES MAP
	// this.lng / this.lat
	updateMap(this.lat, this.lng);
}

// Update the VD Page Driver Image with Vehicle object data
Vehicle.prototype.modifyVdDriverImg = function(){

	$('#vd-DriverCam-img').attr('src', this.driverimg);
}

// Update the VD Page Driver Image with Vehicle object data
Vehicle.prototype.modifyVdRoadImg = function(){
	
	$('#vd-RoadCam-img').attr('src', this.roadimg);
}