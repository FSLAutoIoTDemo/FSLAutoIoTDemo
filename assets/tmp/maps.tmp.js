function initalizeMaps(a, b, c, d) {
    var e = new google.maps.LatLng(c, d), f = {
        zoom: 15,
        center: e
    };
    GLB.map = new google.maps.Map($(a)[0], f), GLB.mapMarker = new google.maps.Marker({
        position: e,
        map: GLB.map,
        title: b
    }), GLB.mapCurrCenter = GLB.map.getCenter(), google.maps.event.addListener(GLB.map, "resize", recentreMaps(GLB.mapCurrCenter));
}

function updateMap(a, b) {
    var c = new google.maps.LatLng(a, b);
    GLB.mapMarker.setPosition(c), recentreMaps(c), GLB.mapCurrCenter = GLB.map.getCenter();
}

function recentreMaps(a) {
    GLB.map.setCenter(a);
}