// Initialise Google Maps
// --> htmlID: Map HTML ID
// --> lat: Latitude
// --> lat: Longtitude
// --> _zoom: Zoom depth
// --> mapType: ROADMAP / SATELLITE / HYBRID / TERAIN
// --> marker: Map Marker on/off. True=ON, False:OFF
// --> markerText: Text for Marker if present, blank if not
// --> route: Route trail on/off. True=ON, False:OFF
// --> heat: Heat map on/off. True=ON, False:OFF
// --> heatLoc: Heat Map locations (array of Google LatLng objects)
function initalizeMaps(htmlId,lat,lng,_zoom,mapType,marker,markerText,route,heat) {
	var myLatlng = new google.maps.LatLng(lat,lng);

	var mapOptions = {
		zoom: _zoom,
		center: myLatlng,
		mapTypeId: mapType
	}

	GLB.map = new google.maps.Map($(htmlId)[0],mapOptions);

	// Create Marker for map
	if(marker){
		GLB.mapMarker = new google.maps.Marker({
	    	position: myLatlng,
	    	map: GLB.map,
	    	title: markerText
	  	});
	}

	// Create Route trail for map
	if(route){
	  	GLB.carRoute = new google.maps.Polyline({
	        geodesic: true,
	        strokeColor: GLB.mapStrokeColour,
	        strokeOpacity: 1.0,
	        strokeWeight: 2
	    });
        
 	   GLB.carRoute.setMap(GLB.map);
 	}

 	if(heat){
 		console.log('Here Maps');
 		// Create heatmap, initialised with no points
 		GLB.heatmap = new google.maps.visualization.HeatmapLayer({
                data: []
        });

		GLB.heatmap.setMap(GLB.map);
 	}
	
	// Update current centre position
	GLB.mapCurrCenter = GLB.map.getCenter();

	// Add event listener to re-center map when page is resized
	google.maps.event.addListener(GLB.map, 'resize', recentreMaps(GLB.mapCurrCenter));
};

	
// Update the marker & re-centers map to the position passed into function
function updateMap(lat,lng,path){
	// Create Lat/Long Google object
	var myLatlng = new google.maps.LatLng(lat,lng);
	
	// Update position of marker to Lat/Long
	GLB.mapMarker.setPosition(myLatlng);

	// Update the map to centre position
	recentreMaps(myLatlng);

	// Update current centre position variable
	GLB.mapCurrCenter = GLB.map.getCenter();

	if(path){
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
}

// Update the heat map overlay
function updateHeatMapData(heatLoc){
    // Push to page
	GLB.heatmap.setData(heatLoc);
	console.log('Updated Heat Map Layer');
}

// Re-centers the map to the position passed into function
function recentreMaps(latlng){

	// Centre map to new position
	GLB.map.setCenter(latlng);
}