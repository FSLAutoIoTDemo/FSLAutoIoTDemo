function init_bigd_page() {
    console.log("OnPageLoad: Big Data-page"), GLB.pgID = GLB.PGBIGD, GLB.fleet = new BDFleet();
    var a = GLB.DEFAULTLAT, b = GLB.DEFAULTLNG;
    initalizeMaps("#bigd-Map-obj", a, b, 15, google.maps.MapTypeId.ROADMAP, !0, "Event Here", !1, !1), 
    google.load("visualization", "1.0", {
        packages: [ "corechart" ],
        callback: function() {
            initGraphs(!1, null, !1, null, !0, "#bigd-graph-obj", !1, null);
        }
    }), GLB.currVID = getQueryVariable("vid"), navMenuStatusSetVeh();
}

function start_bigd_session() {
    50 == GLB.currVID ? (console.log("Live Mode Detected"), GLB.sockAddr = GLB.SOCKROOT + GLB.SOCKETBIGD, 
    init_websocket(GLB.SOCKETBIGD, GLB.sockAddr)) : (init_bigdDemo(), console.log("Debug Mode Detected"));
}