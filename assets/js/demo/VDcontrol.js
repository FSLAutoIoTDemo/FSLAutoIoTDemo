// Page loader
jQuery(document).ready(function($){
	if($("#vd-page").length){init_vdDemo()};
});

function init_vdDemo(){
	console.log("VD-Demo Mode Started");

	GLB.vehicle=new VDvehicle();
	alert(GLB.vehicle.getData());

	GLB.vehicle.updateData("some_id",2,3,4,5,6,7,8,30.264524,-97.743435,11);
//	GLB.vehicle.updateRoadImg("blank.jpg");

	alert(GLB.vehicle.getData());

	GLB.vehicle.modifyVdHtmlText();
	GLB.vehicle.modifyVdRoadImg();

//	GLB.vehicle.modifyVdRoadImg();


}