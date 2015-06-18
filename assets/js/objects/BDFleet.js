//######### VDVEHICLE obj - Child Obj of VEHICLE ###########################/
// Create child element of Vehicle, specifically for Vehicle Dashboard Page
function BDFleet(){}

inherit(BDFleet, Fleet);

BDFleet.prototype.modifyBDEventHtmlText = function(){
	// Get vehicle letter
	var vehicleLetter = String.fromCharCode(65+this.eventVehicle.vehicle); 
	$('#bigd-evt-id').text(vehicleLetter);					// Event Vehicle ID

	var time = this.eventVehicle.time.match(/.{1,2}/g);

	// Adjust for users local time
	var now = new Date();

	// Get timezone offset in mins
	var minsOffset = now.getTimezoneOffset()
	console.log("##########" + minsOffset);
	// Get timezone offet in hours (BST to UTC to local time)
	var hrsOffset = parseInt(time[0]) - 1 - Math.floor(minsOffset / 60);

//	$('#bigd-evt-time').text(time[0] + ":" + time[1] + "." + time[2]);		// Event Time
	$('#bigd-evt-time').text(hrsOffset + ":" + time[1] + "." + time[2]);		// Event Time

	$('#bigd-evt-speed').text(this.eventVehicle.speed);		// Event Speed

	// Update Map with event location
	updateMap(this.eventVehicle.lat, this.eventVehicle.lng, false);	
}

BDFleet.prototype.requestBDEvent = function(id){
	console.log("Requesting Event Information");
	sockSendMessage(GLB.SOCKETBIGDEVREQ_S + id + GLB.SOCKETBIGDEVREQ_E);
}


BDFleet.prototype.modifyBDGforceGraph = function(){
	updateGforceData(this.gforce);
}	


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