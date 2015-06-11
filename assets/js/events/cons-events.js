// Setup events for the Vehicle Dashboard Page
// --> Set vehicle ID
// --> Initialise maps
// --> Initialise graphs
// --> Open websocket
function init_cons_page(){
	console.log("OnPageLoad: Consumer-page");

	// Set Page ID to Vehicle Dash
	GLB.pgID = GLB.PGCONS;

	// Initialise VDvehicle object
	GLB.vehicle=new CONSvehicle();

	// -- Load map first to reduce page load times
	// Initial position
	var initLat = 55.748223;
	var initLng = -4.168670;

	// Load Road Map, with marker, but no heat overlay
	initalizeMaps('#cons-Map-obj', initLat,initLng, 15, google.maps.MapTypeId.ROADMAP, true, "Vehicle Here!", true, false);

	// Load the Speed Pie Chart & Bar Graph (pass in HTML IDs to update)
	google.load('visualization', '1.0', {'packages':['corechart'], 'callback':function(){initGraphs(true,'#cons-Speed-obj',false,null,false,null,false,null)}});


	// Query the variables in the URL and load the appropriate mode
	GLB.currVID = getQueryVariable("vid");

	// Set the Vehicle ID of the VDvehicle object
	GLB.vehicle.setVehicle(GLB.currVID-1);
	
	// Update the Nav menu to include the current vehicle.
	navMenuStatusSetVeh();

	// If debug mode (99)
	// #Workaround adds 1 to GLB.currVID, to avoid case of undefined being confused with VID=0, need
	// to remove the +1 before passing into other functions
	if((GLB.currVID) == 100){
		GLB.currVID = GLB.currVID-1;		//#Workaround
		init_consDemo();
		console.log('Debug Mode Detected');
	}
	// If vehicle ID > 9 or null/undefined-> invalid case
	else if (GLB.currVID > 9 || GLB.currVID < 0 || GLB.currVID==false){
		GLB.currVID = GLB.currVID-1;		//#Workaround
		init_consDemo();
		console.log('Invalid Mode Detected - set to Debug Mode');
	}
	// Should catch all vehicles between 0 & 9
	else{
		GLB.currVID = GLB.currVID-1;		//#Workaround
		GLB.sockAddr = GLB.SOCKROOT + GLB.SOCKETVEH[GLB.currVID];
		init_websocket(GLB.SOCKETVEH[GLB.currVID], GLB.sockAddr);
	}

}