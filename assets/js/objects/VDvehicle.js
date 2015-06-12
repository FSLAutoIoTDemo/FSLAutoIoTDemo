//######### VDVEHICLE obj - Child Obj of VEHICLE ###########################/
// Create child element of Vehicle, specifically for Vehicle Dashboard Page
function VDvehicle(){}

inherit(VDvehicle, Vehicle);

// Update the VD Page HMTL text with Vehicle object data
Vehicle.prototype.modifyHtmlText = function(){
	
	$('#vd-Speed-speedtext').text(this.speed);		// Speed
	$('#vd-xAccel-acceltext').text(this.fGax);		// X-Accel + Y-Accel
	$('#vd-yAccel-acceltext').text(this.fGay);		// X-Accel + Y-Accel
	$('#vd-HR-hrtext').text(this.heart);			// Heart Rate

	updateSpeedData(this.speed);					// Update Speed Pie Graph
	updateAccelData(this.fGax, this.fGay);			// Update Accel Chart
}

// Update the VD Page Map with Vehicle object data
Vehicle.prototype.modifyMap = function(){
	updateMap(this.lat, this.lng, true);
}

// Update the VD Page Driver Image with Vehicle object data
Vehicle.prototype.modifyDriverImg = function(){
	$('#vd-DriverCam-img').attr('src', this.driverimg);
}

// Update the VD Page Road Image with Vehicle object data
Vehicle.prototype.modifyRoadImg = function(){
	$('#vd-RoadCam-img').attr('src', this.roadimg);
}


Vehicle.prototype.processSocketVD = function(dIn){
	
	// First - test that data received is for current vehicle
	if(dIn.vehicle != this.vehicle){
		console.log('### WARNING ####');
		console.log('Data received for Vehicle: ' + dIn.vehicle);
		console.log('Page is expecting data from Vehicle: ' + this.vehicle);
	}

	// Then, test to see whether input is data / roadIMG / driverIMG
	else if(dIn.info == 'data'){
		// Update VDvehicle object with Socket data
		this.updateData(dIn._id, dIn.vehicle, dIn.speed, "", dIn.heart, dIn.fGax, dIn.fGay, dIn.fGaz, dIn.lat, dIn.lng, dIn.insurance)
		
		// Push changes into the HTML
		this.modifyHtmlText();

		// Update Map
		this.modifyMap(dIn.lng,dIn.lat);
		console.log('Data Received for VD Page');
	}
	else if (dIn.info == 'image_road')
	{
		// Update VDvehicle object with Road Img src
		this.updateRoadImg(dIn.image);

		// Push changes into the HTML
		this.modifyRoadImg();
		console.log('Road Image Received for VD Page');
	}
	else if (dIn.info == 'image_driver')
	{
		// Update VDvehicle object with Road Img src
		this.updateDriverImg(dIn.image);

		// Push changes into the HTML
		this.modifyDriverImg();
		console.log('Driver Image Received for VD Page');
	}
	else
	{
		// Catch for anything else - not expected
		console.log('Unknown Packet received for VD Page');
	}
}