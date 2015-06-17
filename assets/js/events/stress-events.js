// Setup events for the Vehicle Dashboard Page
// --> Initialise maps
// --> Open websocket
function init_stress_page(){
	console.log("OnPageLoad: Stessful Street-page");

	// Set Page ID to Stressful Street
	GLB.pgID = GLB.PGSTRESS;

	// Initialise SSFleet object
	GLB.fleet=new SSFleet();

	// -- Load map first to reduce page load times
	// Initial position (EKB)
	var initLat = GLB.DEFAULTLAT;
	var initLng = GLB.DEFAULTLNG;

	// Load Hybrid Map, with heat overlay
	initalizeMaps('#stress-Map-obj', initLat,initLng, 15, google.maps.MapTypeId.ROADMAP, false, "", false, true);

	// Query the variables in the URL and load the appropriate mode
	GLB.currVID = getQueryVariable("vid");

	// Update the Nav menu to include the current vehicle.
	navMenuStatusSetVeh();

	// If live (vid=50), load websocket
	if((GLB.currVID) == 50){
		console.log('Live Mode Detected');
		GLB.sockAddr = GLB.SOCKROOT + GLB.SOCKETSTRESS;
		init_websocket(GLB.SOCKETSTRESS, GLB.sockAddr);
	}
	// Else, load demo mode
	else{
		init_stressDemo();
		console.log('Debug Mode Detected');
	}

}