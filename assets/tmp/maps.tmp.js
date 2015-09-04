function initalizeMaps(a, b, c, d, e, f, g, h, i, j) {
    var k = new google.maps.LatLng(b, c), l = {
        zoom: d,
        center: k,
        mapTypeId: e
    };
    GLB.map = new google.maps.Map($(a)[0], l), f && (GLB.mapMarker = new google.maps.Marker({
        position: k,
        map: GLB.map,
        title: g
    })), h && (GLB.carRoute = new google.maps.Polyline({
        geodesic: !0,
        strokeColor: GLB.mapStrokeColour,
        strokeOpacity: 1,
        strokeWeight: 2
    }), GLB.carRoute.setMap(GLB.map)), i && (console.log("Here Maps"), GLB.heatmap = new google.maps.visualization.HeatmapLayer({
        data: [],
        fitBounds: !0
    }), GLB.heatmap.setMap(GLB.map)), j && mapsInitFleetMarkers(), GLB.mapCurrCenter = GLB.map.getCenter(), 
    google.maps.event.addListener(GLB.map, "resize", recentreMaps(GLB.mapCurrCenter));
}

function updateMap(a, b, c) {
    var d = new google.maps.LatLng(a, b);
    if (GLB.mapMarker.setPosition(d), recentreMaps(d), GLB.mapCurrCenter = GLB.map.getCenter(), 
    c) {
        var c = GLB.carRoute.getPath();
        c.length > 9 && c.getArray().shift(), c.push(d);
    }
}

function updateHeatMapData(a) {
    GLB.heatmap.setData(a), console.log("Updated Heat Map Layer");
}

function recentreMaps(a) {
    GLB.map.setCenter(a);
}

function fitBound(a, b, c, d) {
    var e = new google.maps.LatLng(c, d), f = new google.maps.LatLng(a, b), g = new google.maps.LatLngBounds(e, f);
    GLB.map.fitBounds(g);
}

function findMapBounds(a) {
    for (var b = a[0].G, c = a[0].K, d = a[0].G, e = a[0].K, f = 0; f < a.length; f++) a[f].G > b && (b = a[f].G), 
    a[f].K > c && (c = a[f].K), a[f].G < d && (d = a[f].G), a[f].K < e && (e = a[f].K);
    fitBound(b, c, d, e);
}

function mapsInitFleetMarkers() {
    for (var a = 0; a < GLB.MaxVeh; a++) if (1 == GLB.fleet.vehicles[a].marker.valid) {
        GLB.fleet.vehicles[a].marker.markerObj = addFleetMarker(GLB.fleet.vehicles[a].marker), 
        GLB.fleet.vehicles[a].marker.markerObj.setMap(GLB.map), GLB.fleet.vehicles[a].marker.carRoute = new google.maps.Polyline({
            geodesic: !0,
            strokeColor: GLB.mapStrokeColour,
            strokeOpacity: 1,
            strokeWeight: 2
        }), GLB.fleet.vehicles[a].marker.carRoute.setMap(GLB.map);
        var b = a;
        google.maps.event.addListener(GLB.fleet.vehicles[a].marker.markerObj, "click", function() {
            GLB.fleet.loadNewVehicle(b);
        });
    }
}

function mapsUpdateFleetMarkers(a, b) {
    a.markerObj.setMap(null), a.markerObj = addFleetMarker(a), a.markerObj.setMap(GLB.map);
    var c = a.carRoute.getPath();
    c.length > 40 && c.getArray().shift(), c.push(a.latlng), google.maps.event.addListener(a.markerObj, "click", function() {
        GLB.fleet.loadNewVehicle(b);
    });
}

function addFleetMarker(a) {
    var b = new google.maps.Marker({
        position: a.latlng,
        map: GLB.map,
        title: a.markerText,
        icon: a.icon
    });
    return b;
}