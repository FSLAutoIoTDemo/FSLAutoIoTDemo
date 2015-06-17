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
	var initLat = GLB.DEFAULTLAT;
	var initLng = GLB.DEFAULTLNG;

	// Initialise 10 vehicles, using the VDvehicle object
	for (var i=0; i<10;i++){
		GLB.fleet.vehicles[i] = new VDvehicle;
		var vehicleLetter = String.fromCharCode(65+i);
		// #### BIT OF A HACK - HOW TO MAKE USER SELECT NUMBER OF VALID VEHICLES???
		// Only want to make first 7 map markers valid (i.e. Only Using 7 vehciles)
		if(i<7)
			// MarkerOptions( lat, lng, valid?, icon link)
			GLB.fleet.vehicles[i].marker = new MarkerOptions(initLat,initLng,true,"imgs/icons/red_Marker"+vehicleLetter+".png",vehicleLetter);
		else
			GLB.fleet.vehicles[i].marker = new MarkerOptions(initLat,initLng,false,"imgs/icons/red_Marker"+vehicleLetter+".png",vehicleLetter);
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



