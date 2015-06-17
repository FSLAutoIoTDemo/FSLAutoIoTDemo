function init_stressDemo() {
    console.log("OnPageLoad: Stress-Demo Mode Started"), watchdogClear(), initStressDemoData(), 
    GLB.IMGROOT = "imgs/demo/stress/", GLB.IMGAPPEND = ".jpg", setInterval(ssDemo_modifyStressData, 6e4), 
    setInterval(watchdogClear, 1e4), ssDemo_modifyStressData();
}

function ssDemo_modifyStressData() {
    var a = GLB.stressDemoIdx;
    GLB.fleet.updateStessData(GLB.stressDemoData[a].locations, GLB.stressDemoData[a].mostStressful), 
    console.log("Updated Stressful Street Demo Data"), GLB.fleet.modifyStressMap(), 
    GLB.fleet.modifyStressCams(), a == GLB.stressDemoData.length - 1 ? GLB.stressDemoIdx = 0 : GLB.stressDemoIdx++;
}