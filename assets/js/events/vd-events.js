// Setup events for the Vehicle Dashboard Page
// --> Set vehicle ID
// --> Initialise maps
// --> Initialise graphs
// --> Open websocket
function init_vd_page(){
	console.log("OnPageLoad: VD-page");

	// Initialise VDvehicle object
	GLB.vehicle=new VDvehicle();

	// -- Load map first to reduce page load times
	// Initial position
	var initLat = 55.748223;
	var initLng = -4.168670;

	// Load Map
	initalizeMaps('#vd-Map-obj',"Vehicle Here!", initLat,initLng);

	// NEED TO ADD TEST TO SEE WHICH MODE TO USE (VEHICLE "X", "Y", or DEMO)

	// MAY PUT CODE BELOW INTO OWN FUNCTION FOR VEHICLE "X"

	// Load the Speed Pie Chart & Accel Graph (pass in HTML IDs to update)
	google.load('visualization', '1.0', {'packages':['corechart'], 'callback':function(){initGraphs('#vd-Speed-obj','#vd-Accel-obj')}});


	// Query the variables in the URL and load the appropriate mode
	GLB.currVID = getQueryVariable("vid");

	// Set the Vehicle ID of the VDvehicle object
	GLB.vehicle.setVehicle(GLB.currVID-1);

	// If debug mode (99)
	// #Workaround adds 1 to GLB.currVID, to avoid case of undefined being confused with VID=0, need
	// to remove the +1 before passing into other functions
	if((GLB.currVID) == 100){
		GLB.currVID = GLB.currVID-1;		//#Workaround
		init_vdDemo();
		console.log('Debug Mode Detected');
	}
	// If vehicle ID > 9 or null/undefined-> invalid case
	else if (GLB.currVID > 9 || GLB.currVID < 0 || GLB.currVID==false){
		GLB.currVID = GLB.currVID-1;		//#Workaround
		init_vdDemo();
		console.log('Invalid Mode Detected - set to Debug Mode');
	}
	// Should catch all vehicles between 0 & 9
	else{
		GLB.currVID = GLB.currVID-1;		//#Workaround
		GLB.sockAddr = GLB.SOCKROOT + GLB.SOCKETVEH[GLB.currVID];
		init_websocket(GLB.SOCKETVEH[GLB.currVID], GLB.sockAddr);
	}

}