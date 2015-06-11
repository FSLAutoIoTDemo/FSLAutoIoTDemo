// Setup events for the Vehicle Dashboard Page
// --> Initialise maps & graphs
// --> Open websocket
function init_bigd_page(){
	console.log("OnPageLoad: Big Data-page");

	// Set Page ID to Stressful Street
	GLB.pgID = GLB.PGBIGD;

	// Initialise BDFleet object - for gForces
	GLB.fleet=new BDFleet();

	// -- Load map first to reduce page load times
	// Initial position (EKB)
	var initLat = 55.748223;
	var initLng = -4.168670;

	// Load Road Map, with heat overlay
	initalizeMaps('#bigd-Map-obj', initLat,initLng, 15, google.maps.MapTypeId.ROADMAP, true, "Event Here", false, false);

 	// Load the G-Force Graph (pass in HTML IDs to update)
	google.load('visualization', '1.0', {'packages':['corechart'], 'callback':function(){initGraphs(false,null,false,null,true,'#bigd-graph-obj',false,null)}});

	// Query the variables in the URL and load the appropriate mode
	GLB.currVID = getQueryVariable("vid");

	// Update the Nav menu to include the current vehicle.
	navMenuStatusSetVeh();

	// Wait for 
}

// Wait for GForce graph to be fully loaded before opening sockets
function start_bigd_session(){
	// If live (vid=50), load websocket
	if((GLB.currVID) == 50){
		console.log('Live Mode Detected');
		GLB.sockAddr = GLB.SOCKROOT + GLB.SOCKETBIGD;
		init_websocket(GLB.SOCKETBIGD, GLB.sockAddr);
	}
	// Else, load demo mode
	else{
//		init_vdDemo();		//#####TO ADD LATER
		console.log('Debug Mode Detected');
	}
}
