function init_consDemo() {
    console.log("OnPageLoad: CONS-Demo Mode Started"), watchdogClear(), initDemoData(), 
    GLB.vehicle = new CONSvehicle(), setInterval(consDemo_updateData, 3e3), setInterval(consdDemo_modifyMaps, 3e3), 
    setInterval(consdDemo_modifyImgs, 15e3), setInterval(watchdogClear, 1e4);
}

function consDemo_updateData() {
    var a = GLB.vdDemoData[GLB.vdDemoIdx];
    GLB.vehicle.calcAccelProf(a[10]), GLB.vehicle.updateData(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10]), 
    GLB.vehicle.updateDriverImg(a[11]), GLB.vehicle.modifyHtmlText(), GLB.vdDemoIdx == GLB.vdDemoData.length - 1 ? GLB.vdDemoIdx = 0 : GLB.vdDemoIdx++;
}

function consdDemo_modifyMaps() {
    GLB.vehicle.modifyMap();
}

function consdDemo_modifyImgs() {
    GLB.vehicle.modifyDriverImg();
}