// Page loader
jQuery(document).ready(function($){

// --> For debug purposes
//	alert("pageload event fired!");

	// Load map
	initalizeMaps();
});
;var map;
var mapContainer = $('#vd-Map-obj')[0];


function initalizeMaps() {

	var mapOptions = {
		zoom: 15,
		center: new google.maps.LatLng(30.264534,-97.743403)};

	map = new google.maps.Map($('#vd-Map-obj')[0],mapOptions);
//	map = new google.maps.Map(mapContainer,mapOptions);

};


//google.maps.event.addDomListener(window, 'load', initialize);
