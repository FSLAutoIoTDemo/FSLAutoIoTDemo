// Page loader
jQuery(document).ready(function($){

	// Setup the onclick events for the nav menu
	navSetup();
	watchdogInit();

/////###### NEED TO LOAD NAV LINKS DEPENDING ON WHICH PAGE IS OPEN - link always go to VD page if in HTML

	if($("#debug-page").length){init_debug_page()};
	if($("#vd-page").length){init_vd_page()};
	if($("#cons-page").length){init_cons_page()};
	if($("#bigd-page").length){init_bigd_page()};
	if($("#stress-page-page").length){init_stress_page()};
	

	// One time event to quickly determine online status
	setTimeout(watchdogCount,500);	// Call after 500ms

});