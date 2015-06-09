function init_vd_page() {
    console.log("OnPageLoad: VD-page"), GLB.vehicle = new VDvehicle();
    var a = 55.748223, b = -4.16867;
    initalizeMaps("#vd-Map-obj", "Vehicle Here!", a, b), google.load("visualization", "1.0", {
        packages: [ "corechart" ],
        callback: function() {
            initGraphs("#vd-Speed-obj", "#vd-Accel-obj");
        }
    }), GLB.currVID = getQueryVariable("vid"), GLB.vehicle.setVehicle(GLB.currVID - 1), 
    100 == GLB.currVID ? (GLB.currVID = GLB.currVID - 1, init_vdDemo(), console.log("Debug Mode Detected")) : GLB.currVID > 9 || GLB.currVID < 0 || 0 == GLB.currVID ? (GLB.currVID = GLB.currVID - 1, 
    init_vdDemo(), console.log("Invalid Mode Detected - set to Debug Mode")) : (GLB.currVID = GLB.currVID - 1, 
    GLB.sockAddr = GLB.SOCKROOT + GLB.SOCKETVEH[GLB.currVID], init_websocket(GLB.SOCKETVEH[GLB.currVID], GLB.sockAddr));
}