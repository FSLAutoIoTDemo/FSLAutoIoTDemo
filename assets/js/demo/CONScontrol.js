//### Will remove the document.ready function in long run - will
// be initiated by NAV button click
// Page loader
/*
jQuery(document).ready(function($){
	if($("#vd-page").length){init_vdDemo()};
});
*/

// Start events to provide page with Demo Data
function init_consDemo(){
	console.log("OnPageLoad: CONS-Demo Mode Started");

	// Clear watchdog
	watchdogClear();

	// Load data for Vehicle Dash page
	initVDDemoData();

	// Change Image Root to Local
	GLB.IMGROOT = "imgs/demo/dash/";
	GLB.IMGAPPEND = ".jpg";

	// Create new CONSvehicle object
	GLB.vehicle=new CONSvehicle();

	// SETUP TIMERS TO KICK OFF UPDATES
	//-> Update information & Modify text @t1
	//-> Modify map @t2
	//-> Modify imgs @t3

	setInterval(consDemo_updateData,1000);	// 1 second
	setInterval(consDemo_modifyMaps,1000) 	// 1 seconds
	setInterval(consDemo_modifyImgs,10000);	// 10 seconds
	setInterval(watchdogClear,10000);			// Clear Watchdog every 10 seconds

	consDemo_updateData();
	consDemo_modifyMaps();
	consDemo_modifyImgs();
}



// Store new data in CONSVechicle obj, then update HTML text elements
function consDemo_updateData(){
	var d=GLB.vdDemoData[GLB.vdDemoIdx];	// Use current index row of Demo Data Array
	
	// ##HACK Add acceleration profile - not done in backend
	GLB.vehicle.calcAccelProf(d[10]);

	// Update CONSvehicle obj with data: [id,vehicle,speed,accel,heart,X,Y,Z,lat,lng,insurance]
	GLB.vehicle.updateData(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10]);
	GLB.vehicle.updateDriverImg(d[11]);

	// Update the Text elements on the page
	GLB.vehicle.modifyHtmlText();

	// Check if index has reached end of array
	// - If no: update by 1
	// - If yes: rollover
	if(GLB.vdDemoIdx==(GLB.vdDemoData.length-1))
		GLB.vdDemoIdx=0;
	else
		GLB.vdDemoIdx++;
}

// Update Vehicle Dash Map with Vehicle data
function consDemo_modifyMaps(){
	GLB.vehicle.modifyMap();
}

// Update Vehicle Dash Driver & Road Images with Vehicle data
function consDemo_modifyImgs(){
	GLB.vehicle.modifyDriverImg();
}