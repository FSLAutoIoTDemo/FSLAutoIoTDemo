// Page loader
jQuery(document).ready(function($){

// --> For debug purposes
//	alert("pageload event fired!");

	// Initialise websocket
	init_websocket();
	pageID = "";

	$("#useCaseBut").click(function(){
		
		// TRIGGER PACKET SENT TO SERVER HERE
		alert("buttonClick");
	});

});

