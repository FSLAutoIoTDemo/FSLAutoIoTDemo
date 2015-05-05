// Page loader
jQuery(document).ready(function($){

// --> For debug purposes
//	alert("pageload event fired!");

	

	var initLat = 55.748223;
	var initLng = -4.168670;

	// Load Map
	initalizeMaps(initLat,initLng);

	// Load the Speed Pie Chart & Accel Graph
	google.load("visualization", "1", {packages:["corechart"],"callback":initGraphs});

});


