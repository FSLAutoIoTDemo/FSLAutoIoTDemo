// Page loader
jQuery(document).ready(function($){

	// Setup the onclick events for the nav menu
	navSetup();
	watchdogInit();

	if($("#debug-page").length){init_debug_page()};
	if($("#vd-page").length){init_vd_page()};

	console.log('Here');

	// One time event to quickly determine online status
	setTimeout(watchdogCount,500);	// Call after 500ms


// --> For debug purposes
//	alert("pageload event fired!");
});