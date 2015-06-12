//######### VDVEHICLE obj - Child Obj of VEHICLE ###########################/
// Create child element of Vehicle, specifically for Vehicle Dashboard Page
function CONSvehicle(){}

inherit(CONSvehicle, Vehicle);

// Update the VD Page HMTL text with Vehicle object data
CONSvehicle.prototype.modifyHtmlText = function(){
	
	$('#cons-Speed-speedtext').text(this.speed);	// Speed
	$('#cons-Metric-speedtext').text(this.speed);	// Speed
	$('#cons-Metric-acceltext').text(this.acceleration);	// Acceleration

	updateSpeedData(this.speed);					// Update Speed Pie Graph
	updateInsurGraphData(this.insurance);			// Update Insurance Bar Graph
}

// Update the VD Page Map with Vehicle object data
CONSvehicle.prototype.modifyMap = function(){
	updateMap(this.lat, this.lng, true);
}

// Update the CONS Page Driver Image with Vehicle object data
CONSvehicle.prototype.modifyDriverImg = function(){
	$('#cons-DriverCam-img').attr('src', this.driverimg);
}

// Calculate the acceleration profile
// ## Bit of a hack, should be done in backend in long-term
CONSvehicle.prototype.calcAccelProf = function(insur){
	
	// Based on insurance premium, assign acceleration profile
	if(insur < 500)
		this.acceleration = "Smooth";
	else if(insur >= 400 && insur < 800)
		this.acceleration = "Moderate";
	else
		this.acceleration = "Fast";
}


CONSvehicle.prototype.processSocketCONS = function(dIn){
	
	// First - test that data received is for current vehicle
	if(dIn.vehicle != this.vehicle){
		console.log('### WARNING ####');
		console.log('Data received for Vehicle: ' + dIn.vehicle);
		console.log('Page is expecting data from Vehicle: ' + this.vehicle);
	}

	// Then, test to see whether input is data / roadIMG / driverIMG
	else if(dIn.info == 'data'){
		
		// ##HACK Add acceleration profile - not done in backend
		this.calcAccelProf(dIn.insurance);

		// Update VDvehicle object with Socket data
		this.updateData(dIn._id, dIn.vehicle, dIn.speed, "", dIn.heart, dIn.fGax, dIn.fGay, dIn.fGaz, dIn.lat, dIn.lng, dIn.insurance)
		
		// Push changes into the HTML
		this.modifyHtmlText();

		// Update Map
		this.modifyMap(dIn.lng,dIn.lat);
		console.log('Data Received for CONS Page');
	}
	else if (dIn.info == 'image_road')
	{
		console.log('Road Image Received. Do Nothing');
	}
	else if (dIn.info == 'image_driver')
	{
		// Update VDvehicle object with Road Img src
		this.updateDriverImg(dIn.image);

		// Push changes into the HTML
		this.modifyDriverImg();
		console.log('Driver Image Received for CONS Page');
	}
	else
	{
		// Catch for anything else - not expected
		console.log('Unknown Packet received for CONS Page');
	}
}