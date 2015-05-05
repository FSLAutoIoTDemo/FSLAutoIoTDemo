var map;
var currCenter;


function initalizeMaps(lat,lng) {
	var myLatlng = new google.maps.LatLng(lat,lng);

	var mapOptions = {
		zoom: 15,
		center: myLatlng
	}

	map = new google.maps.Map($('#vd-Map-obj')[0],mapOptions);
//	map = new google.maps.Map(mapContainer,mapOptions);

	var marker = new google.maps.Marker({
    	position: myLatlng,
    	map: map,
    	title: 'Vehicle A'
  	});

	currCenter = map.getCenter();

	google.maps.event.addListener(map, 'resize', recentreMaps());
};

function recentreMaps(){
	map.setCenter(currCenter);
}