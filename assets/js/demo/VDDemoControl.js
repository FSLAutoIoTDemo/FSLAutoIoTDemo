// Start events to provide page with Demo Data
function init_vdDemo(){
	console.log("OnPageLoad: VD-Demo Mode Started");

	// Clear watchdog
	watchdogClear();

	// Load data for Vehicle Dash page
	initVDDemoData();

	// Change Image Root to Local
	GLB.IMGROOT = "imgs/demo/dash/";
	GLB.IMGAPPEND = ".jpg";
	
	// Create new VDvehicle object
	GLB.vehicle=new VDvehicle();

	// SETUP TIMERS TO KICK OFF UPDATES
	//-> Update information & Modify text @t1
	//-> Modify map @t2
	//-> Modify imgs @t3

	setInterval(vdDemo_updateData,1000);	// 1 second
	setInterval(vdDemo_modifyMaps,1000) 	// 1 seconds
	setInterval(vdDemo_modifyImgs,10000);	// 10 seconds
	setInterval(watchdogClear,10000);		// Clear Watchdog every 10 seconds

	vdDemo_updateData();
	vdDemo_modifyMaps();
	vdDemo_modifyImgs();
}



// Store new data in VDVechicle obj, then update HTML text elements
function vdDemo_updateData(){
	var d=GLB.vdDemoData[GLB.vdDemoIdx];	// Use current index row of Demo Data Array
	
	// Update VDvehicle obj with data: [id,vehicle,speed,accel,heart,X,Y,Z,lat,lng,insurance]
	GLB.vehicle.updateData(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10]);
	GLB.vehicle.updateDriverImg(d[11]);
	GLB.vehicle.updateRoadImg(d[12]);

	// Update the Text elements on the page
	GLB.vehicle.modifyHtmlText();

	//UPDATE CHARTS HERE

	// Check if index has reached end of array
	// - If no: update by 1
	// - If yes: rollover
	if(GLB.vdDemoIdx==(GLB.vdDemoData.length-1))
		GLB.vdDemoIdx=0;
	else
		GLB.vdDemoIdx++;
}

// Update Vehicle Dash Map with Vehicle data
function vdDemo_modifyMaps(){
	GLB.vehicle.modifyMap();
}

// Update Vehicle Dash Driver & Road Images with Vehicle data
function vdDemo_modifyImgs(){
	GLB.vehicle.modifyRoadImg();
	GLB.vehicle.modifyDriverImg();
}