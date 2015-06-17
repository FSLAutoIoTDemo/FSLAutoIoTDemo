function init_bigdDemo() {
    console.log("OnPageLoad: Big Data - Demo Mode Started"), watchdogClear(), initBigdDemoData(), 
    setInterval(bigdDemo_modifyBigdData, 1e4), setInterval(watchdogClear, 1e4), bigdDemo_modifyBigdData(), 
    bigdDemo_setBigdEvent();
}

function bigdDemo_modifyBigdData() {
    var a = GLB.bigdDemoIdx;
    GLB.fleet.updategForce(GLB.bigdDemoData[a].gforce), console.log("Fleet Data Received for BD Page"), 
    GLB.fleet.modifyBDGforceGraph(), a == GLB.bigdDemoData.length - 1 ? GLB.bigdDemoIdx = 0 : GLB.bigdDemoIdx++;
}

function bigdDemo_setBigdEvent() {
    var a = new Vehicle();
    a.updateData(null, "B", 12, null, null, null, null, null, GLB.DEFAULTLAT, GLB.DEFAULTLNG, null, "12:34"), 
    GLB.fleet.eventVehicle = a, console.log("Event Data Received for BD Page"), GLB.fleet.modifyBDEventHtmlText();
}