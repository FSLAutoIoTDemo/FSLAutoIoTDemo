//######### VDVEHICLE obj - Child Obj of VEHICLE ###########################/
// Create child element of Vehicle, specifically for Stressfull Street
function ALLFleet(){
}

inherit(ALLFleet, Fleet);


// Update Driver Text
ALLFleet.prototype.updateDriverText = function(vid){
	updateText('#fleet-speed-data',this.vehicles[vid].speed);

	// Get vehicle letter
	var vehicleLetter = String.fromCharCode(65+vid); 
	updateText('#fleet-vehicleId-data',vehicleLetter);
}

// Update Driver Image
ALLFleet.prototype.updateRoadImg = function(vid){

	var img = this.vehicles[vid].roadimg;
	if(img)
		updateImg('#fleet-RoadCam-img', img);
	else{
		updateImg('#fleet-RoadCam-img', "imgs/fill.svg");
		console.log("No Vehicle Image Found for Vehicle:" + vid);
	}
}

// Update Driver Image
ALLFleet.prototype.updateMapMarker = function(vid){
	
	// Update the marker position
	this.vehicles[vid].marker.updateMarkerPos(this.vehicles[vid].lat,this.vehicles[vid].lng);

	// Get vehicle letter
	var vehicleLetter = String.fromCharCode(65+vid);

	// Update the marker to the green icon (i.e. active)
	this.vehicles[vid].marker.updateIcon("Green",vehicleLetter);	

	// Update the marker on the map
	mapsUpdateFleetMarkers(this.vehicles[vid].marker,vid);
}

ALLFleet.prototype.loadNewVehicle = function(vid){
	
	// Update current vehicle ID to clicked vehicle
	GLB.currVID = vid;

	// Close existing vehicle websocket & request to open new socket
	GLB.multiSocket[2].sockOpenReq = true;
	GLB.multiSocket[2].sockAddrReq = GLB.SOCKROOT + GLB.SOCKETVEH[vid];
	open_multiWebsocket();
	//multiSockOnClose(null,2);

	// Update the text/image to match the new vehicle
	// Uodate text
	this.updateDriverText(GLB.currVID);

	// Push changes into the HTML
	this.updateRoadImg(GLB.currVID);
}


// Update vehicle information that arrives from /ws/vehicleX & /ws/vehicleAll
ALLFleet.prototype.processSocketFLEETvehicle = function(dIn){
	
	// First - test that data received is for current vehicle
	if(dIn.vehicle > 10 || dIn.vehicle < 0){
		console.log('### WARNING ####');
		console.log('Data received for Vehicle: ' + dIn.vehicle);
		console.log('Page is expecting data from Vehicle: ' + this.vehicle);
	}

	// Then, test to see whether input is data / roadIMG / driverIMG
	else if(dIn.info == 'data'){
		// Update VDvehicle object with Socket data
		this.vehicles[dIn.vehicle].updateData(dIn._id, dIn.vehicle, dIn.speed, "", dIn.heart, dIn.fGax, dIn.fGay, dIn.fGaz, dIn.lat, dIn.lng, dIn.insurance);
		
		// If new data is for the vehicle showing current status
		if(this.vehicles[dIn.vehicle].vehicle == GLB.currVID){
			
			// Push changes into the HTML
			this.updateDriverText(GLB.currVID);

			
		}

		// Update Marker Position
		this.vehicles[dIn.vehicle].marker.updateMarkerPos(dIn.lat,dIn.lng);
		
		// Update Map
		this.updateMapMarker(dIn.vehicle);

		console.log('Data Received for Fleet Page');
	}
	else if (dIn.info == 'image_road')
	{
		// Update VDvehicle object with Road Img src
		this.vehicles[dIn.vehicle].updateRoadImg(dIn.image);

		// If new data is for the vehicle showing current status
		if(this.vehicles[dIn.vehicle].vehicle == GLB.currVID){
			
			// Push changes into the HTML
			this.updateRoadImg(GLB.currVID);

		}
		console.log('Road Image Received for Fleet Page');
	}
	else if (dIn.info == 'image_driver')
	{
		// Update VDvehicle object with Driver Img src
		this.vehicles[dIn.vehicle].updateDriverImg(dIn.image);

		console.log('Driver Image Received for Fleet Page');
	}
	else
	{
		// Catch for anything else - not expected
		console.log('Unknown Packet received for VD Page');
	}
}
