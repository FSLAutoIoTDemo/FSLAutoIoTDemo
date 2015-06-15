function init_vdDemo() {
    console.log("OnPageLoad: VD-Demo Mode Started"), watchdogClear(), initDemoData(), 
    GLB.vehicle = new VDvehicle(), setInterval(vdDemo_updateData, 3e3), setInterval(vdDemo_modifyMaps, 3e3), 
    setInterval(vdDemo_modifyImgs, 15e3), setInterval(watchdogClear, 1e4);
}

function vdDemo_updateData() {
    var a = GLB.vdDemoData[GLB.vdDemoIdx];
    GLB.vehicle.updateData(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10]), 
    GLB.vehicle.updateDriverImg(a[11]), GLB.vehicle.updateRoadImg(a[12]), GLB.vehicle.modifyHtmlText(), 
    GLB.vdDemoIdx == GLB.vdDemoData.length - 1 ? GLB.vdDemoIdx = 0 : GLB.vdDemoIdx++;
}

function vdDemo_modifyMaps() {
    GLB.vehicle.modifyMap();
}

function vdDemo_modifyImgs() {
    GLB.vehicle.modifyRoadImg(), GLB.vehicle.modifyDriverImg();
}