//### Will remove the document.ready function in long run - will
// be initiated by NAV button click
// Page loader
/*
jQuery(document).ready(function($){
	if($("#vd-page").length){init_vdDemo()};
});
*/

// Start events to provide page with Demo Data
function init_vdDemo(){
	console.log("OnPageLoad: VD-Demo Mode Started");

	// Load data for Vehicle Dash page
	initDemoData();

	// Create new VDvehicle object
	GLB.vehicle=new VDvehicle();

	// SETUP TIMERS TO KICK OFF UPDATES
	//-> Update information & Modify text @t1
	//-> Modify map @t2
	//-> Modify imgs @t3

	setInterval(vdDemo_updateData,10000);	// 1 second
	setInterval(vdDemo_modifyMaps,10000) 	// 1 seconds
	setInterval(vdDemo_modifyImgs,15000);	// 5 seconds
}



// Store new data in VDVechicle obj, then update HTML text elements
function vdDemo_updateData(){
	var d=GLB.vdDemoData[GLB.vdDemoIdx];	// Use current index row of Demo Data Array
	
	// Update VDvehicle obj with data: [id,vehicle,speed,accel,heart,X,Y,Z,lat,lng,insurance]
	GLB.vehicle.updateData(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10]);
	GLB.vehicle.updateDriverImg(d[11]);
	GLB.vehicle.updateRoadImg(d[12]);

	// Update the Text elements on the page
	GLB.vehicle.modifyVdHtmlText();

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
	GLB.vehicle.modifyVdMap();
}

// Update Vehicle Dash Driver & Road Images with Vehicle data
function vdDemo_modifyImgs(){
	GLB.vehicle.modifyVdRoadImg();
	GLB.vehicle.modifyVdDriverImg();
}