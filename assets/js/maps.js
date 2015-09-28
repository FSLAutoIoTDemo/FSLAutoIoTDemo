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
function initalizeMaps(htmlId,lat,lng,_zoom,mapType,marker,markerText,route,heat,fleet) {
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
                data: [],
                fitBounds: true
        });

		GLB.heatmap.setMap(GLB.map);
 	}
	
 	if(fleet){
 		mapsInitFleetMarkers();
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

// Fits map viewport within a specific bound of sw/ne
function fitBound(latn,lnge,lats,lngw){
	var sw = new google.maps.LatLng(lats,lngw);
	var ne = new google.maps.LatLng(latn,lnge);
	var bounds = new google.maps.LatLngBounds(sw,ne);
	
	GLB.map.fitBounds(bounds);
}


// Finds ne/sw corners of map, then updates map to fit to these bounds
function findMapBounds(locations){

//	var maxLat = locations[0].G;
//	var maxLng = locations[0].K;

//	var minLat = locations[0].G;
//	var minLng = locations[0].K;

	var maxLat = locations[0].lat();
	var maxLng = locations[0].lng();

	var minLat = locations[0].lat();
	var minLng = locations[0].lng();


	for(var i=0; i<locations.length; i++){
	
		if (locations[i].G > maxLat)
				maxLat = locations[i].lat();

		if (locations[i].K > maxLng)
				maxLng = locations[i].lng();

		if (locations[i].G < minLat)
				minLat = locations[i].lat();

		if (locations[i].K < minLng)
				minLng = locations[i].lng();
	}
	// Fit map to new bounds
	fitBound(maxLat,maxLng,minLat,minLng);
}

// Add markers & path for all valid vehicles
function mapsInitFleetMarkers(){

	// For each vehicle, check if marker should be set
	for (var i=0;i<GLB.MaxVeh; i++){
		// If marker is to be set
		if(GLB.fleet.vehicles[i].marker.valid == true){
			// Create new marker
			GLB.fleet.vehicles[i].marker.markerObj = addFleetMarker(GLB.fleet.vehicles[i].marker)
	  		
	  		// Add marker to the map
	  		GLB.fleet.vehicles[i].marker.markerObj.setMap(GLB.map);

	  		// Create new path
	  		GLB.fleet.vehicles[i].marker.carRoute = new google.maps.Polyline({
		        geodesic: true,
		        strokeColor: GLB.mapStrokeColour,
		        strokeOpacity: 1.0,
		        strokeWeight: 2
	   		 });
        
        	// Add path to map
 	   		GLB.fleet.vehicles[i].marker.carRoute.setMap(GLB.map);

 	   		
 	   		// Add onclick event to change the vid and load new vehciles data
 	   		var _vid=i;			// Set current vehicle ID
 	   		google.maps.event.addListener(GLB.fleet.vehicles[i].marker.markerObj, 'click', function() {GLB.fleet.loadNewVehicle(_vid);});
	  	}	  	
	}
}

// Remove old marker and update to new position
function mapsUpdateFleetMarkers(_marker,vid){

	// Remove old marker
	_marker.markerObj.setMap(null);

	// Create updated marker object
	_marker.markerObj = addFleetMarker(_marker)

	// Update the map
	_marker.markerObj.setMap(GLB.map);

	// Update path on map
	var path = _marker.carRoute.getPath();		// Assign route to 'path'
	        //remove oldest entry
	        if (path.length >40) {
	            (path.getArray()).shift();	// Clear trailing entry if >20 entires
	        }
	path.push(_marker.latlng);				// Update path with new location


	// Add onclick event to change the vid and load new vehciles data
	google.maps.event.addListener(_marker.markerObj, 'click', function() {GLB.fleet.loadNewVehicle(vid);});
}

function addFleetMarker(_marker){

	var mapMarker = new google.maps.Marker({
	    	position: _marker.latlng,
	    	map: GLB.map,
	    	title: _marker.markerText,
	    	icon: _marker.icon
	});

	return mapMarker;
}


/*
GLB.carRoute = new google.maps.Polyline({
	        geodesic: true,
	        strokeColor: GLB.mapStrokeColour,
	        strokeOpacity: 1.0,
	        strokeWeight: 2
	    });
        
 	   GLB.carRoute.setMap(GLB.map);
*/