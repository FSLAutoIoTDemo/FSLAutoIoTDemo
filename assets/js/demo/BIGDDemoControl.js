// Start events to provide page with Demo Data
function init_bigdDemo(){
	console.log("OnPageLoad: Big Data - Demo Mode Started");

	// Clear watchdog
	watchdogClear();

	// Load data for Stressful Street Dash page
	initBigdDemoData();
	
	// SETUP TIMERS TO KICK OFF UPDATES
	//-> Update information @t1

	setInterval(bigdDemo_modifyBigdData,10000);		// 10 seconds
	setInterval(watchdogClear,10000);				// Clear Watchdog every 10 seconds

	// Update data
	bigdDemo_modifyBigdData();

	// Add event location
	bigdDemo_setBigdEvent();
}


// Update Big Data data
function bigdDemo_modifyBigdData(){
	
	var idx=GLB.bigdDemoIdx;

	// Update BDFleet object with Array of gForces
	GLB.fleet.updategForce(GLB.bigdDemoData[idx].gforce);

	console.log('Fleet Data Received for BD Page');

	// Write new values to the graph
	GLB.fleet.modifyBDGforceGraph();

	// Check if index has reached end of array
	// - If no: update by 1
	// - If yes: rollover
	if(idx==(GLB.bigdDemoData.length-1))
		GLB.bigdDemoIdx=0;
	else
		GLB.bigdDemoIdx++;
}

// Create an event location for the demo mode
function bigdDemo_setBigdEvent(){
	// Create Vehicle object - for Vehicle event data
	var _eventVehicle=new Vehicle();

	// Update vehicle event information
	// updateData(_id, _vehicle, _speed, _accel, _heart, _fGax, _fGay, _fGaz, _lat, _lng, _insurance,_time)
	_eventVehicle.updateData(null,"B",12,null,null,null,null,null,GLB.DEFAULTLAT,GLB.DEFAULTLNG,null,"12:34");

	// Store vehicle object in fleet object
	GLB.fleet.eventVehicle=_eventVehicle;
	console.log('Event Data Received for BD Page');

	// Modify HTML with new values
	GLB.fleet.modifyBDEventHtmlText();
}