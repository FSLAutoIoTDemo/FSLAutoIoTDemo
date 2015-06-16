jQuery(document).ready(function(a) {
    navSetup(), watchdogInit(), a("#debug-page").length && init_debug_page(), a("#vd-page").length && init_vd_page(), 
    a("#cons-page").length && init_cons_page(), a("#bigd-page").length && init_bigd_page(), 
    a("#stress-page").length && init_stress_page(), a("#fleet-page").length && init_fleet_page(), 
    setTimeout(watchdogCount, 2e3);
});