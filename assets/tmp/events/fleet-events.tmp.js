function init_fleet_page() {
    console.log("OnPageLoad: Fleet-page"), GLB.pgID = GLB.PGFLEET, GLB.currVID = 6, 
    GLB.fleet = new ALLFleet();
    for (var a = GLB.DEFAULTLAT, b = GLB.DEFAULTLNG, c = 0; 10 > c; c++) {
        GLB.fleet.vehicles[c] = new VDvehicle();
        var d = String.fromCharCode(65 + c);
        7 > c ? GLB.fleet.vehicles[c].marker = new MarkerOptions(a, b, !0, "imgs/icons/red_Marker" + d + ".png", d) : GLB.fleet.vehicles[c].marker = new MarkerOptions(a, b, !1, "imgs/icons/red_Marker" + d + ".png", d);
    }
    initalizeMaps("#fleet-Map-obj", a, b, 15, google.maps.MapTypeId.ROADMAP, !1, "", !1, !1, !0);
    var e = [ GLB.SOCKROOT + GLB.SOCKETVEHALL, GLB.SOCKROOT + GLB.SOCKETDEBUG, GLB.SOCKROOT + GLB.SOCKETVEH[GLB.currVID] ], f = [ GLB.SOCKETVEHALL, GLB.SOCKETDEBUG, GLB.SOCKETVEH[GLB.currVID] ];
    configureMultiSockets(3, e, f);
}