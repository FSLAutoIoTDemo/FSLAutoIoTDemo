function init_consDemo() {
    console.log("OnPageLoad: CONS-Demo Mode Started"), watchdogClear(), initVDDemoData(), 
    GLB.IMGROOT = "imgs/demo/dash/", GLB.IMGAPPEND = ".jpg", GLB.vehicle = new CONSvehicle(), 
    setInterval(consDemo_updateData, 1e3), setInterval(consDemo_modifyMaps, 1e3), setInterval(consDemo_modifyImgs, 1e4), 
    setInterval(watchdogClear, 1e4), consDemo_updateData(), consDemo_modifyMaps(), consDemo_modifyImgs();
}

function consDemo_updateData() {
    var a = GLB.vdDemoData[GLB.vdDemoIdx];
    GLB.vehicle.calcAccelProf(a[10]), GLB.vehicle.updateData(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10]), 
    GLB.vehicle.updateDriverImg(a[11]), GLB.vehicle.modifyHtmlText(), GLB.vdDemoIdx == GLB.vdDemoData.length - 1 ? GLB.vdDemoIdx = 0 : GLB.vdDemoIdx++;
}

function consDemo_modifyMaps() {
    GLB.vehicle.modifyMap();
}

function consDemo_modifyImgs() {
    GLB.vehicle.modifyDriverImg();
}