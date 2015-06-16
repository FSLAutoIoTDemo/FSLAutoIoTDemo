// Setup events for the Vehicle Dashboard Page
// --> Initialise maps
// --> Open websocket
function init_fleet_page(){
	console.log("OnPageLoad: Fleet-page");

	// Set Page ID to Stressful Street
	GLB.pgID = GLB.PGFLEET;

	// Init Vehicle ID for showing image/info
	GLB.currVID = 6;

	// Initialise SSFleet object
	GLB.fleet = new ALLFleet();

	// -- Load map first to reduce page load times
	// Initial position (EKB)
	var initLat = 55.748223;
	var initLng = -4.168670;

	// Initialise 10 vehicles, using the VDvehicle object
	for (var i=0; i<10;i++){
		GLB.fleet.vehicles[i] = new VDvehicle;
		var vehicleLetter = String.fromCharCode(65+i);
		GLB.fleet.vehicles[i].marker = new MarkerOptions(initLat,initLng,true,"imgs/icons/red_Marker"+vehicleLetter+".png",vehicleLetter);
	}
	
	// Load Hybrid Map, with heat overlay
	initalizeMaps('#fleet-Map-obj', initLat,initLng, 15, google.maps.MapTypeId.ROADMAP, false, "", false, false,true);

	// Create and Initialise the required websockets
	var sockAddrArgs = [GLB.SOCKROOT + GLB.SOCKETVEHALL,
					GLB.SOCKROOT + GLB.SOCKETDEBUG,
					GLB.SOCKROOT + GLB.SOCKETVEH[GLB.currVID]]

	var sockIDArgs = [GLB.SOCKETVEHALL,
					GLB.SOCKETDEBUG,
					GLB.SOCKETVEH[GLB.currVID]]					
	
	configureMultiSockets(3,sockAddrArgs,sockIDArgs);

}



