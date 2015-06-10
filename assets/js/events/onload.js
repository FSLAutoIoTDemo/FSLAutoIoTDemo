// Page loader
jQuery(document).ready(function($){

	// Setup the onclick events for the nav menu
	navSetup();
	watchdogInit();

	if($("#debug-page").length){init_debug_page()};

	if($("#vd-page").length){init_vd_page()};

// --> For debug purposes
//	alert("pageload event fired!");
});