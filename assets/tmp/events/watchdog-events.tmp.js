function watchdogInit() {
    setInterval(watchdogCount, GLB.watchdogInterval);
}

function watchdogCount() {
    GLB.watchdogCount > GLB.watchdogLimitAmber ? $("#navMenuStatusId").css("background-color", "#e66a08") : GLB.watchdogCount > GLB.watchdogLimitRed ? $("#navMenuStatusId").css("background-color", "red") : $("#navMenuStatusId").css("background-color", "green"), 
    GLB.watchdogCount += 1;
}

function watchdogClear() {
    GLB.watchdogCount = 0;
}