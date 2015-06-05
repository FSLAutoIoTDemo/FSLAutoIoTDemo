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
