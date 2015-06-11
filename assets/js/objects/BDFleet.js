//######### VDVEHICLE obj - Child Obj of VEHICLE ###########################/
// Create child element of Vehicle, specifically for Vehicle Dashboard Page
function BDFleet(){}

inherit(BDFleet, Fleet);

BDFleet.prototype.modifyBDEventHtmlText = function(){
	$('#bigd-evt-id').text(this.eventVehicle.vehicle);		// Event Vehicle ID
	$('#bigd-evt-time').text(this.eventVehicle.time);		// Event Time
	$('#bigd-evt-speed').text(this.eventVehicle.speed);		// Event Speed

	// Update Map with event location
	updateMap(this.eventVehicle.lat, this.eventVehicle.lng, false);	
}

BDFleet.prototype.requestBDEvent = function(id){
	sockSendMessage(GLB.SOCKETBIGDEVREQ_S + id + GLB.SOCKETBIGDEVREQ_E);
}


BDFleet.prototype.modifyBDGforceGraph = function(){
	updateGforceData(this.gforce);
}	

/*
// Update the VD Page HMTL text with Vehicle object data
BDFleet.prototype.modifyVdHtmlText = function(){
	
	

	updateSpeedData(this.speed);					// Update Speed Pie Graph
	updateAccelData(this.fGax, this.fGay);			// Update Accel Chart
}

// Update the VD Page Map with Vehicle object data
BDFleet.prototype.modifyVdMap = function(){
	updateMap(this.lat, this.lng);
}

// Update the VD Page Driver Image with Vehicle object data
BDFleet.prototype.modifyVdDriverImg = function(){
	$('#vd-DriverCam-img').attr('src', this.driverimg);
}

// Update the VD Page Road Image with Vehicle object data
BDFleet.prototype.modifyVdRoadImg = function(){
	$('#vd-RoadCam-img').attr('src', this.roadimg);
}
*/

BDFleet.prototype.processSocketBIGD = function(dIn){
	
	// Then, test to see whether input is Fleet Data / Event Information
	if(dIn.packetType == 'Fleet Data'){
		
		// Update BDFleet object with Array of gForces
		this.updategForce(dIn.gforce);

		console.log('Fleet Data Received for BD Page');

		// Write new values to the graph
		this.modifyBDGforceGraph();

	}
	else if (dIn.packetType == 'Event Data')
	{
		// Create Vehicle object - for Vehicle event data
		var _eventVehicle=new Vehicle();

		// Update vehicle event information
		// updateData(_id, _vehicle, _speed, _accel, _heart, _fGax, _fGay, _fGaz, _lat, _lng, _insurance,_time)
		_eventVehicle.updateData(null,dIn.vehicle,dIn.speed,null,null,null,null,null,dIn.location.lat,dIn.location.lng,null,dIn.time);

		// Store vehicle object in fleet object
		this.eventVehicle=_eventVehicle;
		console.log('Event Data Received for BD Page');

		// Modify HTML with new values
		this.modifyBDEventHtmlText();
	}
	else
	{
		// Catch for anything else - not expected
		console.log('Unknown Packet received for BD Page');
	}
}