function initalizeMaps(a, b) {
    var c = new google.maps.LatLng(a, b), d = {
        zoom: 15,
        center: c
    };
    map = new google.maps.Map($("#vd-Map-obj")[0], d);
    new google.maps.Marker({
        position: c,
        map: map,
        title: "Vehicle A"
    });
    currCenter = map.getCenter(), google.maps.event.addListener(map, "resize", recentreMaps());
}

function recentreMaps() {
    map.setCenter(currCenter);
}

var map, currCenter;