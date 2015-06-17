function init_vd_page() {
    console.log("OnPageLoad: VD-page"), GLB.pgID = GLB.PGVD, GLB.vehicle = new VDvehicle();
    var a = GLB.DEFAULTLAT, b = GLB.DEFAULTLNG;
    initalizeMaps("#vd-Map-obj", a, b, 15, google.maps.MapTypeId.ROADMAP, !0, "Vehicle Here!", !0, !1), 
    google.load("visualization", "1.0", {
        packages: [ "corechart" ],
        callback: function() {
            initGraphs(!0, "#vd-Speed-obj", !0, "#vd-Accel-obj", !1, null, !1, null);
        }
    }), GLB.currVID = getQueryVariable("vid"), GLB.vehicle.setVehicle(GLB.currVID - 1), 
    navMenuStatusSetVeh(), 100 == GLB.currVID ? (GLB.currVID = GLB.currVID - 1, init_vdDemo(), 
    console.log("Debug Mode Detected")) : GLB.currVID > 9 || GLB.currVID < 0 || 0 == GLB.currVID ? (GLB.currVID = GLB.currVID - 1, 
    init_vdDemo(), console.log("Invalid Mode Detected - set to Debug Mode")) : (GLB.currVID = GLB.currVID - 1, 
    GLB.sockAddr = GLB.SOCKROOT + GLB.SOCKETVEH[GLB.currVID], init_websocket(GLB.SOCKETVEH[GLB.currVID], GLB.sockAddr));
}