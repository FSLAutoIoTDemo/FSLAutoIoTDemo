function init_debug_page() {
    alert("debug-page"), init_websocket(), pageID = "", $("#useCaseBut").click(function() {
        alert("buttonClick");
    });
}

function init_vd_page() {
    alert("vd-page"), init_websocket(), pageID = "vd";
    var a = 55.748223, b = -4.16867;
    initalizeMaps(a, b), google.load("visualization", "1", {
        packages: [ "corechart" ],
        callback: initGraphs
    });
}

jQuery(document).ready(function(a) {
    a("#debug-page").length && init_debug_page(), a("#vd-page").length && init_vd_page();
});