function init_debug_page() {
    GLB.vehicle = new VDvehicle(), alert(GLB.vehicle.getData()), GLB.vehicle.updateData("some_id", 2, 3, 4, 5, 6, 7, 8, 9, 10, 11), 
    GLB.vehicle.updateRoadImg("blank.jpg"), alert(GLB.vehicle.getData()), GLB.vehicle.modifyVdHtmlText(), 
    GLB.vehicle.modifyVdRoadImg(), init_websocket(), pageID = "", $("#useCaseBut").click(function() {
        alert("buttonClick");
    });
}

function init_vd_page() {
    console.log("OnPageLoad: VD-page"), init_websocket(), pageID = "vd";
    var a = 55.748223, b = -4.16867;
    initalizeMaps("#vd-Map-obj", "Vehicle Here!", a, b), alert("Look at map - it will change after this"), 
    google.load("visualization", "1", {
        packages: [ "corechart" ],
        callback: initGraphs
    });
}

jQuery(document).ready(function(a) {
    a("#debug-page").length && init_debug_page(), a("#vd-page").length && init_vd_page();
});