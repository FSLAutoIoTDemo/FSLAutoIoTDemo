jQuery(document).ready(function(a) {
    navSetup(), watchdogInit(), a("#debug-page").length && init_debug_page(), a("#vd-page").length && init_vd_page(), 
    console.log("Here"), setTimeout(watchdogCount, 500);
});