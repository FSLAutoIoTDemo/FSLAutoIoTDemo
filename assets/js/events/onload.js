// Page loader
jQuery(document).ready(function($){

	if($("#debug-page").length){init_debug_page()};

	if($("#vd-page").length){init_vd_page()};

// --> For debug purposes
//	alert("pageload event fired!");


});


function init_debug_page(){
	//alert("debug-page");

//	GLB.vehicle=new Vehicle();
	GLB.vehicle=new VDvehicle();

	alert(GLB.vehicle.getData());

	GLB.vehicle.updateData("some_id",2,3,4,5,6,7,8,9,10,11);
	GLB.vehicle.updateRoadImg("blank.jpg");

	alert(GLB.vehicle.getData());

	GLB.vehicle.modifyVdHtmlText();
	GLB.vehicle.modifyVdRoadImg();


	// Initialise websocket
	init_websocket();
	pageID = "";

	$("#useCaseBut").click(function(){
		
		// TRIGGER PACKET SENT TO SERVER HERE
		alert("buttonClick");
	});
}

function init_vd_page(){
	console.log("OnPageLoad: VD-page");

/*	GLB.vehicle=new VDvehicle();
	alert(GLB.vehicle.getData());

	GLB.vehicle.updateData("some_id",2,3,4,5,6,7,8,30.264524,-97.743435,11);
//	GLB.vehicle.updateRoadImg("blank.jpg");

	alert(GLB.vehicle.getData());

	GLB.vehicle.modifyVdHtmlText();
	GLB.vehicle.modifyVdRoadImg();
*/
	// Initialise websocket
	init_websocket();
	pageID = "vd";

	var initLat = 55.748223;
	var initLng = -4.168670;

	// Load Map
	initalizeMaps('#vd-Map-obj',"Vehicle Here!", initLat,initLng);

	alert("Look at map - it will change after this");
	//GLB.vehicle.modifyVdRoadImg();

	// Load the Speed Pie Chart & Accel Graph
	google.load("visualization", "1", {packages:["corechart"],"callback":initGraphs});
}