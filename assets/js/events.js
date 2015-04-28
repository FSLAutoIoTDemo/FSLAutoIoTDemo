// Page loader
jQuery(document).ready(function($){

// --> For debug purposes
//	alert("pageload event fired!");

	

	var initLat = 55.748223;
	var initLng = -4.168670;

	// Load map
	initalizeMaps(initLat,initLng);

	google.maps.event.addListener(map, 'resize', recentreMaps());
});


