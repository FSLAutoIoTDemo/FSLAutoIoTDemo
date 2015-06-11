function init_cons_page() {
    console.log("OnPageLoad: Consumer-page"), GLB.pgID = GLB.PGCONS, GLB.vehicle = new CONSvehicle();
    var a = 55.748223, b = -4.16867;
    initalizeMaps("#cons-Map-obj", a, b, 15, google.maps.MapTypeId.ROADMAP, !0, "Vehicle Here!", !0, !1), 
    google.load("visualization", "1.0", {
        packages: [ "corechart" ],
        callback: function() {
            initGraphs(!0, "#cons-Speed-obj", !1, null, !1, null, !1, null);
        }
    }), GLB.currVID = getQueryVariable("vid"), GLB.vehicle.setVehicle(GLB.currVID - 1), 
    navMenuStatusSetVeh(), 100 == GLB.currVID ? (GLB.currVID = GLB.currVID - 1, init_consDemo(), 
    console.log("Debug Mode Detected")) : GLB.currVID > 9 || GLB.currVID < 0 || 0 == GLB.currVID ? (GLB.currVID = GLB.currVID - 1, 
    init_consDemo(), console.log("Invalid Mode Detected - set to Debug Mode")) : (GLB.currVID = GLB.currVID - 1, 
    GLB.sockAddr = GLB.SOCKROOT + GLB.SOCKETVEH[GLB.currVID], init_websocket(GLB.SOCKETVEH[GLB.currVID], GLB.sockAddr));
}