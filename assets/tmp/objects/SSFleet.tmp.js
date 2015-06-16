function SSFleet() {}

inherit(SSFleet, Fleet), SSFleet.prototype.modifyStressMap = function() {
    updateHeatMapData(this.locations), findMapBounds(this.locations);
}, SSFleet.prototype.modifyStressCams = function() {
    for (var a = 0; 3 > a; a++) {
        if (null === this.mostStressful[a].camPic) $("#stress-RoadCam-img" + a).attr("src", "imgs/fill.svg"); else {
            var b = GLB.IMGROOT + this.mostStressful[a].camPic + GLB.IMGAPPEND;
            $("#stress-RoadCam-img" + a).attr("src", b);
        }
        $("#stressStreet" + a).text(null === this.mostStressful[a].streetName ? "--" : this.mostStressful[a].streetName), 
        $("#stressHeart" + a).text(null === this.mostStressful[a].heartDelta ? "-- %" : this.mostStressful[a].heartDelta);
    }
}, SSFleet.prototype.processSocketStress = function(a) {
    this.updateStessData(a.locations, a.mostStressful), console.log("Updated Stressful Street Data"), 
    this.modifyStressMap(), this.modifyStressCams();
};