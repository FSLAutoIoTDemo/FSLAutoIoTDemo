function init_stress_page() {
    console.log("OnPageLoad: Stessful Street-page"), GLB.pgID = GLB.PGSTRESS, GLB.fleet = new SSFleet();
    var a = GLB.DEFAULTLAT, b = GLB.DEFAULTLNG;
    initalizeMaps("#stress-Map-obj", a, b, 15, google.maps.MapTypeId.ROADMAP, !1, "", !1, !0), 
    GLB.currVID = getQueryVariable("vid"), navMenuStatusSetVeh(), 50 == GLB.currVID ? (console.log("Live Mode Detected"), 
    GLB.sockAddr = GLB.SOCKROOT + GLB.SOCKETSTRESS, init_websocket(GLB.SOCKETSTRESS, GLB.sockAddr)) : (init_stressDemo(), 
    console.log("Debug Mode Detected"));
}