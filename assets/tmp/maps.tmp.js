function initalizeMaps(a, b, c, d, e, f, g, h, i) {
    var j = new google.maps.LatLng(b, c), k = {
        zoom: d,
        center: j,
        mapTypeId: e
    };
    GLB.map = new google.maps.Map($(a)[0], k), f && (GLB.mapMarker = new google.maps.Marker({
        position: j,
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
    }), GLB.heatmap.setMap(GLB.map)), GLB.mapCurrCenter = GLB.map.getCenter(), google.maps.event.addListener(GLB.map, "resize", recentreMaps(GLB.mapCurrCenter));
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
    for (var b = a[0].A, c = a[0].F, d = a[0].A, e = a[0].F, f = 0; f < a.length; f++) a[f].A > b && (b = a[f].A), 
    a[f].F > c && (c = a[f].F), a[f].A < d && (d = a[f].A), a[f].F < e && (e = a[f].F);
    fitBound(b, c, d, e);
}