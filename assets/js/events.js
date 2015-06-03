// Page loader
jQuery(document).ready(function($){

	if($("#debug-page").length){init_debug_page()};

	if($("#vd-page").length){init_vd_page()};

// --> For debug purposes
//	alert("pageload event fired!");


});


function init_debug_page(){
	alert("debug-page");

	// Initialise websocket
	init_websocket();
	pageID = "";

	$("#useCaseBut").click(function(){
		
		// TRIGGER PACKET SENT TO SERVER HERE
		alert("buttonClick");
	});
}

function init_vd_page(){
	alert("vd-page");

	// Initialise websocket
	init_websocket();
	pageID = "vd";

	var initLat = 55.748223;
	var initLng = -4.168670;

	// Load Map
	initalizeMaps(initLat,initLng);

	// Load the Speed Pie Chart & Accel Graph
	google.load("visualization", "1", {packages:["corechart"],"callback":initGraphs});
}