//######### VDVEHICLE obj - Child Obj of VEHICLE ###########################/
// Create child element of Vehicle, specifically for Vehicle Dashboard Page
function VDvehicle(){}

inherit(VDvehicle, Vehicle);

// Update the VD Page HMTL text with Vehicle object data
Vehicle.prototype.modifyVdHtmlText = function(){
	
	$('#vd-Speed-speedtext').text(this.speed);		// Speed
	$('#vd-xAccel-acceltext').text(this.fGax);		// X-Accel + Y-Accel
	$('#vd-yAccel-acceltext').text(this.fGay);		// X-Accel + Y-Accel
	$('#vd-HR-hrtext').text(this.heart);			// Heart Rate

	updateSpeedData(this.speed);					// Update Speed Pie Graph
	updateAccelData(this.fGax, this.fGay);			// Update Accel Chart
}

// Update the VD Page Map with Vehicle object data
Vehicle.prototype.modifyVdMap = function(){
	updateMap(this.lat, this.lng);
}

// Update the VD Page Driver Image with Vehicle object data
Vehicle.prototype.modifyVdDriverImg = function(){
	$('#vd-DriverCam-img').attr('src', this.driverimg);
}

// Update the VD Page Road Image with Vehicle object data
Vehicle.prototype.modifyVdRoadImg = function(){
	$('#vd-RoadCam-img').attr('src', this.roadimg);
}

