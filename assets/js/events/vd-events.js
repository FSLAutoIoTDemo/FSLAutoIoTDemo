function init_vd_page(){
	console.log("OnPageLoad: VD-page");

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

	// -- Now open web socket
	// Initialise websocket
	init_websocket();
	pageID = "vd";

	init_vdDemo();
}