
function initalizeMaps(htmlId,markerText,lat,lng) {
	var myLatlng = new google.maps.LatLng(lat,lng);

	var mapOptions = {
		zoom: 15,
		center: myLatlng
	}

//	GLB.map = new google.maps.Map($('#vd-Map-obj')[0],mapOptions);
	GLB.map = new google.maps.Map($(htmlId)[0],mapOptions);
//	map = new google.maps.Map(mapContainer,mapOptions);

	GLB.mapMarker = new google.maps.Marker({
    	position: myLatlng,
    	map: GLB.map,
    	title: markerText
  	});

  	GLB.carRoute = new google.maps.Polyline({
        geodesic: true,
        strokeColor: GLB.mapStrokeColour,
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
       
    GLB.carRoute.setMap(GLB.map);
	
	// Update current centre position
	GLB.mapCurrCenter = GLB.map.getCenter();

	// Add event listener to re-center map when page is resized
	google.maps.event.addListener(GLB.map, 'resize', recentreMaps(GLB.mapCurrCenter));
};

	
// Update the marker & re-centers map to the position passed into function
function updateMap(lat,lng){
	// Create Lat/Long Google object
	var myLatlng = new google.maps.LatLng(lat,lng);
	
	// Update position of marker to Lat/Long
	GLB.mapMarker.setPosition(myLatlng);

	// Update the map to centre position
	recentreMaps(myLatlng);

	// Update current centre position variable
	GLB.mapCurrCenter = GLB.map.getCenter();

	// Update path on map
	var path = GLB.carRoute.getPath();		// Assign route to 'path'
        //remove oldest entry
        if (path.length >9) {
            //temp = path.getArray();
            //temp.shift();
            (path.getArray()).shift();	// Clear trailing entry if >9 entires
        }
    path.push(myLatlng);				// Update path with new location
}

// Re-centers the map to the position passed into function
function recentreMaps(latlng){

	// Centre map to new position
	GLB.map.setCenter(latlng);
}