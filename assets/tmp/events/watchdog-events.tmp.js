function watchdogInit() {
    setInterval(watchdogCount, GLB.watchdogInterval);
}

function watchdogCount() {
    GLB.watchdogCount > GLB.watchdogLimitAmber && GLB.watchdogCount < GLB.watchdogLimitRed ? $("#navMenuStatusText").css("color", "#ffc20f") : GLB.watchdogCount > GLB.watchdogLimitRed ? $("#navMenuStatusText").css("color", "red") : $("#navMenuStatusText").css("color", "rgb(9, 255, 9)"), 
    GLB.watchdogCount += 1;
}

function watchdogClear() {
    GLB.watchdogCount = 0;
}